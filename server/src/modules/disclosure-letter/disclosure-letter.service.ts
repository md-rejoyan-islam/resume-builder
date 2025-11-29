import createError from 'http-errors';
import { Types } from 'mongoose';
import { IPagination } from '../../app/types';
import {
  deleteCacheByPattern,
  generateCacheKey,
  getCache,
  setCache,
} from '../../utils/cache';
import { isValidMongoId } from '../../utils/is-valid-mongo-id';
import DisclosureLetterModel from './disclosure-letter.model';
import {
  CreateDisclosureLetterInput,
  ListDisclosureLettersQuery,
  UpdateDisclosureLetterInput,
} from './disclosure-letter.validation';

export const DISCLOSURE_LETTER_RESOURCE = 'disclosure-letters';

export class DisclosureLetterService {
  /**
   * List all disclosure letters for a user with pagination
   */
  static async list(userId: string, query: ListDisclosureLettersQuery) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search,
      status,
      disclosureType,
    } = query || {};

    const filter: {
      userId: Types.ObjectId;
      title?: { $regex: string; $options: string };
      status?: string;
      disclosureType?: string;
    } = { userId: new Types.ObjectId(userId) };

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    if (status) {
      filter.status = status;
    }

    if (disclosureType) {
      filter.disclosureType = disclosureType;
    }

    const sort: Record<string, 1 | -1> = {
      [sortBy]: sortOrder === 'asc' ? 1 : -1,
    };

    const cacheKey = generateCacheKey({
      resource: `${DISCLOSURE_LETTER_RESOURCE}:user:${userId}`,
      query: { ...filter, page, limit, sort },
    });

    const cached = await getCache<{
      data: unknown[];
      pagination: IPagination;
    }>(cacheKey);
    if (cached) return cached;

    const skip = (Number(page) - 1) * Number(limit);

    const [data, total] = await Promise.all([
      DisclosureLetterModel.find(filter)
        .skip(skip)
        .limit(Number(limit))
        .sort(sort)
        .select(
          '_id title isDefault status disclosureType personalInfo.fullName disclosureContent.recipient createdAt updatedAt',
        )
        .lean(),
      DisclosureLetterModel.countDocuments(filter),
    ]);

    const pagination: IPagination = {
      items: total,
      limit: Number(limit),
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    };

    const payload = { data, pagination };
    await setCache(cacheKey, payload, 300); // 5 minutes cache
    return payload;
  }

  /**
   * Get a single disclosure letter by ID (must belong to user)
   */
  static async getById(userId: string, disclosureLetterId: string) {
    if (!isValidMongoId(disclosureLetterId)) {
      throw createError.BadRequest('Invalid disclosure letter ID');
    }

    const cacheKey = generateCacheKey({
      resource: `${DISCLOSURE_LETTER_RESOURCE}:${disclosureLetterId}`,
    });

    const cached = await getCache<Record<string, unknown>>(cacheKey);
    if (cached) {
      // Verify ownership from cached data
      if (cached.userId?.toString() !== userId) {
        throw createError.Forbidden(
          'You do not have access to this disclosure letter',
        );
      }
      return cached;
    }

    const disclosureLetter =
      await DisclosureLetterModel.findById(disclosureLetterId).lean();

    if (!disclosureLetter) {
      throw createError.NotFound('Disclosure letter not found');
    }

    if (disclosureLetter.userId.toString() !== userId) {
      throw createError.Forbidden(
        'You do not have access to this disclosure letter',
      );
    }

    await setCache(cacheKey, disclosureLetter, 300);
    return disclosureLetter;
  }

  /**
   * Get user's default disclosure letter
   */
  static async getDefault(userId: string) {
    const cacheKey = generateCacheKey({
      resource: `${DISCLOSURE_LETTER_RESOURCE}:user:${userId}:default`,
    });

    const cached = await getCache<Record<string, unknown>>(cacheKey);
    if (cached) return cached;

    const disclosureLetter = await DisclosureLetterModel.findOne({
      userId: new Types.ObjectId(userId),
      isDefault: true,
    }).lean();

    if (disclosureLetter) {
      await setCache(cacheKey, disclosureLetter, 300);
    }

    return disclosureLetter;
  }

  /**
   * Create a new disclosure letter
   */
  static async create(userId: string, data: CreateDisclosureLetterInput) {
    // If this is set as default, unset other defaults
    if (data.isDefault) {
      await DisclosureLetterModel.updateMany(
        { userId: new Types.ObjectId(userId) },
        { isDefault: false },
      );
    }

    const disclosureLetter = await DisclosureLetterModel.create({
      ...data,
      userId: new Types.ObjectId(userId),
    });

    // Invalidate list cache
    await this.invalidateUserCache(userId);

    return { _id: disclosureLetter._id };
  }

  /**
   * Update a disclosure letter
   */
  static async update(
    userId: string,
    disclosureLetterId: string,
    data: UpdateDisclosureLetterInput,
  ) {
    if (!isValidMongoId(disclosureLetterId)) {
      throw createError.BadRequest('Invalid disclosure letter ID');
    }

    // Verify ownership
    const existing = await DisclosureLetterModel.findById(disclosureLetterId)
      .select('userId')
      .lean();
    if (!existing) {
      throw createError.NotFound('Disclosure letter not found');
    }
    if (existing.userId.toString() !== userId) {
      throw createError.Forbidden(
        'You do not have access to this disclosure letter',
      );
    }

    // If setting as default, unset other defaults
    if (data.isDefault) {
      await DisclosureLetterModel.updateMany(
        { userId: new Types.ObjectId(userId), _id: { $ne: disclosureLetterId } },
        { isDefault: false },
      );
    }

    const disclosureLetter = await DisclosureLetterModel.findByIdAndUpdate(
      disclosureLetterId,
      { $set: data },
      { new: true, runValidators: true },
    ).lean();

    if (!disclosureLetter) {
      throw createError.NotFound('Disclosure letter not found');
    }

    // Invalidate caches
    await this.invalidateDisclosureLetterCache(userId, disclosureLetterId);

    return disclosureLetter;
  }

  /**
   * Delete a disclosure letter
   */
  static async remove(userId: string, disclosureLetterId: string) {
    if (!isValidMongoId(disclosureLetterId)) {
      throw createError.BadRequest('Invalid disclosure letter ID');
    }

    // Verify ownership
    const disclosureLetter = await DisclosureLetterModel.findById(
      disclosureLetterId,
    )
      .select('userId isDefault')
      .lean();
    if (!disclosureLetter) {
      throw createError.NotFound('Disclosure letter not found');
    }
    if (disclosureLetter.userId.toString() !== userId) {
      throw createError.Forbidden(
        'You do not have access to this disclosure letter',
      );
    }

    await DisclosureLetterModel.findByIdAndDelete(disclosureLetterId);

    // If this was the default, set another disclosure letter as default
    if (disclosureLetter.isDefault) {
      const nextDisclosureLetter = await DisclosureLetterModel.findOne({
        userId: new Types.ObjectId(userId),
      })
        .sort({ createdAt: -1 })
        .select('_id')
        .lean();

      if (nextDisclosureLetter) {
        await DisclosureLetterModel.findByIdAndUpdate(nextDisclosureLetter._id, {
          isDefault: true,
        });
      }
    }

    // Invalidate caches
    await this.invalidateDisclosureLetterCache(userId, disclosureLetterId);

    return { _id: disclosureLetterId };
  }

  /**
   * Duplicate a disclosure letter
   */
  static async duplicate(
    userId: string,
    disclosureLetterId: string,
    newTitle?: string,
  ) {
    if (!isValidMongoId(disclosureLetterId)) {
      throw createError.BadRequest('Invalid disclosure letter ID');
    }

    const original =
      await DisclosureLetterModel.findById(disclosureLetterId).lean();
    if (!original) {
      throw createError.NotFound('Disclosure letter not found');
    }
    if (original.userId.toString() !== userId) {
      throw createError.Forbidden(
        'You do not have access to this disclosure letter',
      );
    }

    // Create duplicate with new title
    const duplicateData = {
      ...original,
      _id: undefined,
      title: newTitle || `${original.title} (Copy)`,
      isDefault: false,
      createdAt: undefined,
      updatedAt: undefined,
    };

    const duplicate = await DisclosureLetterModel.create(duplicateData);

    // Invalidate list cache
    await this.invalidateUserCache(userId);

    return { _id: duplicate._id };
  }

  /**
   * Set a disclosure letter as default
   */
  static async setDefault(userId: string, disclosureLetterId: string) {
    if (!isValidMongoId(disclosureLetterId)) {
      throw createError.BadRequest('Invalid disclosure letter ID');
    }

    // Verify ownership
    const disclosureLetter = await DisclosureLetterModel.findById(
      disclosureLetterId,
    )
      .select('userId')
      .lean();
    if (!disclosureLetter) {
      throw createError.NotFound('Disclosure letter not found');
    }
    if (disclosureLetter.userId.toString() !== userId) {
      throw createError.Forbidden(
        'You do not have access to this disclosure letter',
      );
    }

    // Unset all other defaults for this user
    await DisclosureLetterModel.updateMany(
      { userId: new Types.ObjectId(userId), _id: { $ne: disclosureLetterId } },
      { isDefault: false },
    );

    // Set this one as default
    await DisclosureLetterModel.findByIdAndUpdate(disclosureLetterId, {
      isDefault: true,
    });

    // Invalidate caches
    await this.invalidateDisclosureLetterCache(userId, disclosureLetterId);

    return { _id: disclosureLetterId };
  }

  /**
   * Get disclosure letter count for a user
   */
  static async count(userId: string) {
    return DisclosureLetterModel.countDocuments({
      userId: new Types.ObjectId(userId),
    });
  }

  /**
   * Helper: Invalidate user's disclosure letter list cache
   */
  private static async invalidateUserCache(userId: string) {
    await deleteCacheByPattern(`${DISCLOSURE_LETTER_RESOURCE}:user:${userId}:*`);
  }

  /**
   * Helper: Invalidate specific disclosure letter cache
   */
  private static async invalidateDisclosureLetterCache(
    userId: string,
    disclosureLetterId: string,
  ) {
    await deleteCacheByPattern(
      `${DISCLOSURE_LETTER_RESOURCE}:${disclosureLetterId}:*`,
    );
    await this.invalidateUserCache(userId);
  }
}
