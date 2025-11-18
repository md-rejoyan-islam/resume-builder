import z from 'zod';
import TenantModel from './tenant.model';

// Valid tenant fields that can be requested
const validTenantFields = Object.keys(TenantModel.schema.paths);

export const createTenantSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Tenant name is required'),
  }),
});

export const updateTenantSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z
    .object({
      name: z.string().min(1).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field must be provided',
    }),
});

export const getTenantsQuerySchema = z.object({
  query: z.object({
    search: z.string().optional(),
    fields: z
      .string()
      .optional()
      .refine(
        (fields) => {
          if (!fields) return true;
          const requestedFields = fields
            .split(',')
            .map((f: string) => f.trim());
          const invalidFields = requestedFields.filter(
            (field: string) => !validTenantFields.includes(field),
          );
          return invalidFields.length === 0;
        },
        {
          message: `Invalid field(s) requested. Valid fields are: ${validTenantFields.join(
            ', ',
          )}`,
        },
      ),
    page: z.coerce.number().int().positive().default(1).optional(),
    limit: z.coerce.number().int().positive().max(100).default(10).optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
  }),
});

export const getTenantByIdSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  query: z.object({
    fields: z
      .string()
      .optional()
      .refine(
        (fields) => {
          if (!fields) return true;
          const requestedFields = fields
            .split(',')
            .map((f: string) => f.trim());
          const invalidFields = requestedFields.filter(
            (field: string) => !validTenantFields.includes(field),
          );
          return invalidFields.length === 0;
        },
        {
          message: `Invalid field(s) requested. Valid fields are: ${validTenantFields.join(
            ', ',
          )}`,
        },
      ),
  }),
});

export type GetTenantsQuery = z.infer<typeof getTenantsQuerySchema>['query'];
