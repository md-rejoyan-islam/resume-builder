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
import ResumeModel from './resume.model';
import {
  CreateResumeInput,
  ListResumesQuery,
  UpdateResumeInput,
} from './resume.validation';

export const RESUME_RESOURCE = 'resumes';

export class ResumeService {
  /**
   * List all resumes for a user with pagination
   */
  static async list(userId: string, query: ListResumesQuery) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search,
    } = query || {};

    const filter: {
      userId: Types.ObjectId;
      title?: { $regex: string; $options: string };
    } = { userId: new Types.ObjectId(userId) };

    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const sort: Record<string, 1 | -1> = {
      [sortBy]: sortOrder === 'asc' ? 1 : -1,
    };

    const cacheKey = generateCacheKey({
      resource: `${RESUME_RESOURCE}:user:${userId}`,
      query: { ...filter, page, limit, sort },
    });

    const cached = await getCache<{
      data: unknown[];
      pagination: IPagination;
    }>(cacheKey);
    if (cached) return cached;

    const skip = (Number(page) - 1) * Number(limit);

    const [data, total] = await Promise.all([
      ResumeModel.find(filter)
        .skip(skip)
        .limit(Number(limit))
        .sort(sort)
        .select(
          '_id title isDefault templateSettings.templateId createdAt updatedAt',
        )
        .lean(),
      ResumeModel.countDocuments(filter),
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
   * Get a single resume by ID (must belong to user)
   */
  static async getById(userId: string, resumeId: string) {
    if (!isValidMongoId(resumeId)) {
      throw createError.BadRequest('Invalid resume ID');
    }

    const cacheKey = generateCacheKey({
      resource: `${RESUME_RESOURCE}:${resumeId}`,
    });

    const cached = await getCache<Record<string, unknown>>(cacheKey);
    if (cached) {
      // Verify ownership from cached data
      if (cached.userId?.toString() !== userId) {
        throw createError.Forbidden('You do not have access to this resume');
      }
      return cached;
    }

    const resume = await ResumeModel.findById(resumeId).lean();

    if (!resume) {
      throw createError.NotFound('Resume not found');
    }

    if (resume.userId.toString() !== userId) {
      throw createError.Forbidden('You do not have access to this resume');
    }

    await setCache(cacheKey, resume, 300);
    return resume;
  }

  /**
   * Get user's default resume
   */
  static async getDefault(userId: string) {
    const cacheKey = generateCacheKey({
      resource: `${RESUME_RESOURCE}:user:${userId}:default`,
    });

    const cached = await getCache<Record<string, unknown>>(cacheKey);
    if (cached) return cached;

    const resume = await ResumeModel.findOne({
      userId: new Types.ObjectId(userId),
      isDefault: true,
    }).lean();

    if (resume) {
      await setCache(cacheKey, resume, 300);
    }

    return resume;
  }

  /**
   * Create a new resume
   */
  static async create(userId: string, data: CreateResumeInput) {
    // If this is set as default, unset other defaults
    if (data.isDefault) {
      await ResumeModel.updateMany(
        { userId: new Types.ObjectId(userId) },
        { isDefault: false },
      );
    }

    const resume = await ResumeModel.create({
      ...data,
      userId: new Types.ObjectId(userId),
    });

    // Invalidate list cache
    await this.invalidateUserCache(userId);

    return { _id: resume._id };
  }

  /**
   * Update a resume
   */
  static async update(
    userId: string,
    resumeId: string,
    data: UpdateResumeInput,
  ) {
    if (!isValidMongoId(resumeId)) {
      throw createError.BadRequest('Invalid resume ID');
    }

    // Verify ownership
    const existing = await ResumeModel.findById(resumeId)
      .select('userId')
      .lean();
    if (!existing) {
      throw createError.NotFound('Resume not found');
    }
    if (existing.userId.toString() !== userId) {
      throw createError.Forbidden('You do not have access to this resume');
    }

    // If setting as default, unset other defaults
    if (data.isDefault) {
      await ResumeModel.updateMany(
        { userId: new Types.ObjectId(userId), _id: { $ne: resumeId } },
        { isDefault: false },
      );
    }

    const resume = await ResumeModel.findByIdAndUpdate(
      resumeId,
      { $set: data },
      { new: true, runValidators: true },
    ).lean();

    if (!resume) {
      throw createError.NotFound('Resume not found');
    }

    // Invalidate caches
    await this.invalidateResumeCache(userId, resumeId);

    return resume;
  }

  /**
   * Delete a resume
   */
  static async remove(userId: string, resumeId: string) {
    if (!isValidMongoId(resumeId)) {
      throw createError.BadRequest('Invalid resume ID');
    }

    // Verify ownership
    const resume = await ResumeModel.findById(resumeId)
      .select('userId isDefault')
      .lean();
    if (!resume) {
      throw createError.NotFound('Resume not found');
    }
    if (resume.userId.toString() !== userId) {
      throw createError.Forbidden('You do not have access to this resume');
    }

    await ResumeModel.findByIdAndDelete(resumeId);

    // If this was the default, set another resume as default
    if (resume.isDefault) {
      const nextResume = await ResumeModel.findOne({
        userId: new Types.ObjectId(userId),
      })
        .sort({ createdAt: -1 })
        .select('_id')
        .lean();

      if (nextResume) {
        await ResumeModel.findByIdAndUpdate(nextResume._id, {
          isDefault: true,
        });
      }
    }

    // Invalidate caches
    await this.invalidateResumeCache(userId, resumeId);

    return { _id: resumeId };
  }

  /**
   * Duplicate a resume
   */
  static async duplicate(userId: string, resumeId: string, newTitle?: string) {
    if (!isValidMongoId(resumeId)) {
      throw createError.BadRequest('Invalid resume ID');
    }

    const original = await ResumeModel.findById(resumeId).lean();
    if (!original) {
      throw createError.NotFound('Resume not found');
    }
    if (original.userId.toString() !== userId) {
      throw createError.Forbidden('You do not have access to this resume');
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

    const duplicate = await ResumeModel.create(duplicateData);

    // Invalidate list cache
    await this.invalidateUserCache(userId);

    return { _id: duplicate._id };
  }

  /**
   * Set a resume as default
   */
  static async setDefault(userId: string, resumeId: string) {
    if (!isValidMongoId(resumeId)) {
      throw createError.BadRequest('Invalid resume ID');
    }

    // Verify ownership
    const resume = await ResumeModel.findById(resumeId).select('userId').lean();
    if (!resume) {
      throw createError.NotFound('Resume not found');
    }
    if (resume.userId.toString() !== userId) {
      throw createError.Forbidden('You do not have access to this resume');
    }

    // Unset all other defaults for this user
    await ResumeModel.updateMany(
      { userId: new Types.ObjectId(userId), _id: { $ne: resumeId } },
      { isDefault: false },
    );

    // Set this one as default
    await ResumeModel.findByIdAndUpdate(resumeId, { isDefault: true });

    // Invalidate caches
    await this.invalidateResumeCache(userId, resumeId);

    return { _id: resumeId };
  }

  /**
   * Get resume count for a user
   */
  static async count(userId: string) {
    return ResumeModel.countDocuments({ userId: new Types.ObjectId(userId) });
  }

  /**
   * Helper: Invalidate user's resume list cache
   * Uses pattern-based deletion to clear all paginated list caches
   */
  private static async invalidateUserCache(userId: string) {
    // Delete all list caches for this user (any pagination/sort combo)
    await deleteCacheByPattern(`${RESUME_RESOURCE}:user:${userId}:*`);
    // Also delete default resume cache
    await deleteCacheByPattern(`${RESUME_RESOURCE}:user:${userId}:default:*`);
  }

  /**
   * Helper: Invalidate specific resume cache
   */
  private static async invalidateResumeCache(userId: string, resumeId: string) {
    // Delete specific resume cache
    await deleteCacheByPattern(`${RESUME_RESOURCE}:${resumeId}:*`);
    await this.invalidateUserCache(userId);
  }
}
