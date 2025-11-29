import z from 'zod';
import TenantModel from './tenant.model';

// Valid tenant fields that can be requested
const validTenantFields = Object.keys(TenantModel.schema.paths);

export const createTenantSchema = z.object({
  body: z.object({
    name: z
      .string({
        error: (iss) => {
          if (!iss?.input) {
            return 'Tenant name is required';
          } else if (iss?.code === 'invalid_type') {
            return 'Tenant name must be a string';
          }
        },
      })
      .min(1, 'Tenant name cannot be empty'),
  }),
});

export const updateTenantSchema = z.object({
  params: z.object({
    id: z
      .string({
        error: (iss) => {
          if (!iss?.input) {
            return 'Tenant ID is required';
          } else if (iss?.code === 'invalid_type') {
            return 'Tenant ID must be a string';
          }
        },
      })
      .min(1, 'Tenant ID cannot be empty'),
  }),
  body: z
    .object({
      name: z
        .string({
          error: (iss) => {
            if (iss?.input && iss?.code === 'invalid_type') {
              return 'Tenant name must be a string';
            }
          },
        })
        .min(1, 'Tenant name cannot be empty')
        .optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field must be provided',
    }),
});

export const getTenantsQuerySchema = z.object({
  query: z.object({
    search: z
      .string({
        error: (iss) => {
          if (iss?.input && iss?.code === 'invalid_type') {
            return 'Search must be a string';
          }
        },
      })
      .optional(),
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
    page: z.coerce
      .number({
        error: (iss) => {
          if (iss?.code === 'invalid_type') {
            return 'Page must be a number';
          }
        },
      })
      .int('Page must be an integer')
      .positive('Page must be a positive number')
      .default(1)
      .optional(),
    limit: z.coerce
      .number({
        error: (iss) => {
          if (iss?.code === 'invalid_type') {
            return 'Limit must be a number';
          }
        },
      })
      .int('Limit must be an integer')
      .positive('Limit must be a positive number')
      .max(100, 'Limit cannot exceed 100')
      .default(10)
      .optional(),
    sortBy: z
      .string({
        error: (iss) => {
          if (iss?.input && iss?.code === 'invalid_type') {
            return 'sortBy must be a string';
          }
        },
      })
      .optional(),
    sortOrder: z
      .enum(['asc', 'desc'], {
        error: (iss) => {
          if (iss?.input && iss?.code === 'invalid_value') {
            return 'sortOrder must be either "asc" or "desc"';
          }
        },
      })
      .optional(),
  }),
});

export const getTenantByIdSchema = z.object({
  params: z.object({
    id: z
      .string({
        error: (iss) => {
          if (!iss?.input) {
            return 'Tenant ID is required';
          } else if (iss?.code === 'invalid_type') {
            return 'Tenant ID must be a string';
          }
        },
      })
      .min(1, 'Tenant ID cannot be empty'),
  }),
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
