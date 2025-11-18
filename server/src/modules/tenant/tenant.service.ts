import createError from 'http-errors';
import { IPagination } from '../../app/types';
import {
  deleteCache,
  generateCacheKey,
  getCache,
  setCache,
} from '../../utils/cache';
import { isValidMongoId } from '../../utils/is-valid-mongo-id';
import TenantModel from './tenant.model';
import { GetTenantsQuery } from './tenant.validation';

export const TENANT_RESOURCE = 'tenants';

export class TenantService {
  static async list(query: GetTenantsQuery) {
    const {
      search,
      fields,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query || {};

    const filter: {
      $or?: { [key: string]: { $regex: string; $options: string } }[];
    } = {};
    if (search) {
      filter.$or = [{ name: { $regex: search, $options: 'i' } }];
    }

    const sort: Record<string, 1 | -1> = {
      [sortBy!]: sortOrder === 'asc' ? 1 : -1,
    };

    const cacheKey = generateCacheKey({
      resource: TENANT_RESOURCE,
      query: { ...filter, page, limit, sort, fields },
    });
    const cached = await getCache<{
      data: unknown[];
      pagination: IPagination;
    }>(cacheKey);
    if (cached) return cached;

    // Build selection string
    let selectFields = '';
    if (fields) {
      const requestedFields = fields
        .split(',')
        .map((f: string) => f.trim())
        .filter((f: string) => f);

      if (requestedFields.length > 0) {
        selectFields = requestedFields.join(' ');
      }
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [data, total] = await Promise.all([
      TenantModel.find(filter)
        .skip(skip)
        .limit(Number(limit))
        .sort(sort)
        .select(selectFields)
        .lean(),
      TenantModel.countDocuments(filter),
    ]);

    const pagination: IPagination = {
      items: total,
      limit: Number(limit),
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    };

    const payload = {
      data,
      pagination,
    };
    await setCache(cacheKey, payload);
    return payload;
  }

  static async getById(id: string, fields?: string) {
    if (!isValidMongoId(id)) throw createError.BadRequest('Invalid tenant id');
    const cacheKey = generateCacheKey({
      resource: `${TENANT_RESOURCE}:${id}`,
      query: { fields },
    });
    const cached = await getCache<Record<string, unknown>>(cacheKey);
    if (cached) return cached;

    // Build selection string
    let selectFields = '';
    if (fields) {
      const requestedFields = fields
        .split(',')
        .map((f: string) => f.trim())
        .filter((f: string) => f);

      if (requestedFields.length > 0) {
        selectFields = requestedFields.join(' ');
      }
    }

    const tenant = await TenantModel.findById(id).select(selectFields).lean();
    if (!tenant) throw createError.NotFound('Tenant not found');
    await setCache(cacheKey, tenant);
    return tenant;
  }

  static async create(data: Record<string, unknown>) {
    const exists = await TenantModel.findOne({ name: data.name }).lean();
    if (exists) throw createError.Conflict('Tenant name already in use');
    const tenant = await TenantModel.create(data);
    await deleteCache(generateCacheKey({ resource: TENANT_RESOURCE }));
    return { _id: tenant._id };
  }

  static async update(id: string, data: Record<string, unknown>) {
    if (!isValidMongoId(id)) throw createError.BadRequest('Invalid tenant id');
    const tenant = await TenantModel.findByIdAndUpdate(id, data, {
      new: true,
    }).lean();
    if (!tenant) throw createError.NotFound('Tenant not found');

    await deleteCache(
      generateCacheKey({ resource: `${TENANT_RESOURCE}:${id}` }),
    );
    await deleteCache(generateCacheKey({ resource: TENANT_RESOURCE }));
    return tenant;
  }

  static async remove(id: string) {
    if (!isValidMongoId(id)) throw createError.BadRequest('Invalid tenant id');
    const tenant = await TenantModel.findByIdAndDelete(id).select('_id').lean();
    if (!tenant) throw createError.NotFound('Tenant not found');
    await deleteCache(
      generateCacheKey({ resource: `${TENANT_RESOURCE}:${id}` }),
    );
    await deleteCache(generateCacheKey({ resource: TENANT_RESOURCE }));
    return { _id: tenant._id };
  }
}
