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
import CoverLetterModel from './cover-letter.model';
import {
  CreateCoverLetterInput,
  ListCoverLettersQuery,
  UpdateCoverLetterInput,
} from './cover-letter.validation';

export const COVER_LETTER_RESOURCE = 'cover-letters';

export class CoverLetterService {
  /**
   * List all cover letters for a user with pagination
   */
  static async list(userId: string, query: ListCoverLettersQuery) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search,
      status,
    } = query || {};

    const filter: {
      userId: Types.ObjectId;
      title?: { $regex: string; $options: string };
      status?: string;
    } = { userId: new Types.ObjectId(userId) };

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    if (status) {
      filter.status = status;
    }

    const sort: Record<string, 1 | -1> = {
      [sortBy]: sortOrder === 'asc' ? 1 : -1,
    };

    const cacheKey = generateCacheKey({
      resource: `${COVER_LETTER_RESOURCE}:user:${userId}`,
      query: { ...filter, page, limit, sort },
    });

    const cached = await getCache<{
      data: unknown[];
      pagination: IPagination;
    }>(cacheKey);
    if (cached) return cached;

    const skip = (Number(page) - 1) * Number(limit);

    const [data, total] = await Promise.all([
      CoverLetterModel.find(filter)
        .skip(skip)
        .limit(Number(limit))
        .sort(sort)
        .select(
          '_id title isDefault status personalInfo.fullName letterContent.company createdAt updatedAt',
        )
        .lean(),
      CoverLetterModel.countDocuments(filter),
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
   * Get a single cover letter by ID (must belong to user)
   */
  static async getById(userId: string, coverLetterId: string) {
    if (!isValidMongoId(coverLetterId)) {
      throw createError.BadRequest('Invalid cover letter ID');
    }

    const cacheKey = generateCacheKey({
      resource: `${COVER_LETTER_RESOURCE}:${coverLetterId}`,
    });

    const cached = await getCache<Record<string, unknown>>(cacheKey);
    if (cached) {
      // Verify ownership from cached data
      if (cached.userId?.toString() !== userId) {
        throw createError.Forbidden(
          'You do not have access to this cover letter',
        );
      }
      return cached;
    }

    const coverLetter = await CoverLetterModel.findById(coverLetterId).lean();

    if (!coverLetter) {
      throw createError.NotFound('Cover letter not found');
    }

    if (coverLetter.userId.toString() !== userId) {
      throw createError.Forbidden(
        'You do not have access to this cover letter',
      );
    }

    await setCache(cacheKey, coverLetter, 300);
    return coverLetter;
  }

  /**
   * Get user's default cover letter
   */
  static async getDefault(userId: string) {
    const cacheKey = generateCacheKey({
      resource: `${COVER_LETTER_RESOURCE}:user:${userId}:default`,
    });

    const cached = await getCache<Record<string, unknown>>(cacheKey);
    if (cached) return cached;

    const coverLetter = await CoverLetterModel.findOne({
      userId: new Types.ObjectId(userId),
      isDefault: true,
    }).lean();

    if (coverLetter) {
      await setCache(cacheKey, coverLetter, 300);
    }

    return coverLetter;
  }

  /**
   * Create a new cover letter
   */
  static async create(userId: string, data: CreateCoverLetterInput) {
    // If this is set as default, unset other defaults
    if (data.isDefault) {
      await CoverLetterModel.updateMany(
        { userId: new Types.ObjectId(userId) },
        { isDefault: false },
      );
    }

    const coverLetter = await CoverLetterModel.create({
      ...data,
      userId: new Types.ObjectId(userId),
    });

    // Invalidate list cache
    await this.invalidateUserCache(userId);

    return { _id: coverLetter._id };
  }

  /**
   * Update a cover letter
   */
  static async update(
    userId: string,
    coverLetterId: string,
    data: UpdateCoverLetterInput,
  ) {
    if (!isValidMongoId(coverLetterId)) {
      throw createError.BadRequest('Invalid cover letter ID');
    }

    // Verify ownership
    const existing = await CoverLetterModel.findById(coverLetterId)
      .select('userId')
      .lean();
    if (!existing) {
      throw createError.NotFound('Cover letter not found');
    }
    if (existing.userId.toString() !== userId) {
      throw createError.Forbidden(
        'You do not have access to this cover letter',
      );
    }

    // If setting as default, unset other defaults
    if (data.isDefault) {
      await CoverLetterModel.updateMany(
        { userId: new Types.ObjectId(userId), _id: { $ne: coverLetterId } },
        { isDefault: false },
      );
    }

    const coverLetter = await CoverLetterModel.findByIdAndUpdate(
      coverLetterId,
      { $set: data },
      { new: true, runValidators: true },
    ).lean();

    if (!coverLetter) {
      throw createError.NotFound('Cover letter not found');
    }

    // Invalidate caches
    await this.invalidateCoverLetterCache(userId, coverLetterId);

    return coverLetter;
  }

  /**
   * Delete a cover letter
   */
  static async remove(userId: string, coverLetterId: string) {
    if (!isValidMongoId(coverLetterId)) {
      throw createError.BadRequest('Invalid cover letter ID');
    }

    // Verify ownership
    const coverLetter = await CoverLetterModel.findById(coverLetterId)
      .select('userId isDefault')
      .lean();
    if (!coverLetter) {
      throw createError.NotFound('Cover letter not found');
    }
    if (coverLetter.userId.toString() !== userId) {
      throw createError.Forbidden(
        'You do not have access to this cover letter',
      );
    }

    await CoverLetterModel.findByIdAndDelete(coverLetterId);

    // If this was the default, set another cover letter as default
    if (coverLetter.isDefault) {
      const nextCoverLetter = await CoverLetterModel.findOne({
        userId: new Types.ObjectId(userId),
      })
        .sort({ createdAt: -1 })
        .select('_id')
        .lean();

      if (nextCoverLetter) {
        await CoverLetterModel.findByIdAndUpdate(nextCoverLetter._id, {
          isDefault: true,
        });
      }
    }

    // Invalidate caches
    await this.invalidateCoverLetterCache(userId, coverLetterId);

    return { _id: coverLetterId };
  }

  /**
   * Duplicate a cover letter
   */
  static async duplicate(
    userId: string,
    coverLetterId: string,
    newTitle?: string,
  ) {
    if (!isValidMongoId(coverLetterId)) {
      throw createError.BadRequest('Invalid cover letter ID');
    }

    const original = await CoverLetterModel.findById(coverLetterId).lean();
    if (!original) {
      throw createError.NotFound('Cover letter not found');
    }
    if (original.userId.toString() !== userId) {
      throw createError.Forbidden(
        'You do not have access to this cover letter',
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

    const duplicate = await CoverLetterModel.create(duplicateData);

    // Invalidate list cache
    await this.invalidateUserCache(userId);

    return { _id: duplicate._id };
  }

  /**
   * Set a cover letter as default
   */
  static async setDefault(userId: string, coverLetterId: string) {
    if (!isValidMongoId(coverLetterId)) {
      throw createError.BadRequest('Invalid cover letter ID');
    }

    // Verify ownership
    const coverLetter = await CoverLetterModel.findById(coverLetterId)
      .select('userId')
      .lean();
    if (!coverLetter) {
      throw createError.NotFound('Cover letter not found');
    }
    if (coverLetter.userId.toString() !== userId) {
      throw createError.Forbidden(
        'You do not have access to this cover letter',
      );
    }

    // Unset all other defaults for this user
    await CoverLetterModel.updateMany(
      { userId: new Types.ObjectId(userId), _id: { $ne: coverLetterId } },
      { isDefault: false },
    );

    // Set this one as default
    await CoverLetterModel.findByIdAndUpdate(coverLetterId, {
      isDefault: true,
    });

    // Invalidate caches
    await this.invalidateCoverLetterCache(userId, coverLetterId);

    return { _id: coverLetterId };
  }

  /**
   * Get cover letter count for a user
   */
  static async count(userId: string) {
    return CoverLetterModel.countDocuments({
      userId: new Types.ObjectId(userId),
    });
  }

  /**
   * Helper: Invalidate user's cover letter list cache
   */
  private static async invalidateUserCache(userId: string) {
    await deleteCacheByPattern(`${COVER_LETTER_RESOURCE}:user:${userId}:*`);
  }

  /**
   * Helper: Invalidate specific cover letter cache
   */
  private static async invalidateCoverLetterCache(
    userId: string,
    coverLetterId: string,
  ) {
    await deleteCacheByPattern(`${COVER_LETTER_RESOURCE}:${coverLetterId}:*`);
    await this.invalidateUserCache(userId);
  }
}
