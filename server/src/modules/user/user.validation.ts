import z from 'zod';
import UserModel from './user.model';

// Valid user fields that can be requested
const validUserFields = Object.keys(UserModel.schema.paths);

export const createUserSchema = z.object({
  body: z.object({
    first_name: z
      .string({
        error: (iss) => {
          if (iss?.input && iss?.code === 'invalid_type') {
            return 'First name must be a string';
          }
        },
      })
      .min(1, 'First name cannot be empty')
      .optional(),
    last_name: z
      .string({
        error: (iss) => {
          if (iss?.input && iss?.code === 'invalid_type') {
            return 'Last name must be a string';
          }
        },
      })
      .min(1, 'Last name cannot be empty')
      .optional(),
    email: z.email({
      error: (iss) => {
        if (!iss?.input) {
          return 'Email is required';
        } else if (iss?.code === 'invalid_type') {
          return 'Email must be a string';
        } else if (iss?.code === 'invalid_format') {
          return 'Please provide a valid email address';
        }
      },
    }),
    password: z
      .string({
        error: (iss) => {
          if (!iss?.input) {
            return 'Password is required';
          } else if (iss?.code === 'invalid_type') {
            return 'Password must be a string';
          }
        },
      })
      .min(6, 'Password must be at least 6 characters long'),
    phone: z
      .string({
        error: (iss) => {
          if (iss?.input && iss?.code === 'invalid_type') {
            return 'Phone must be a string';
          }
        },
      })
      .min(6, 'Phone number must be at least 6 characters long')
      .optional(),
    role: z
      .enum(['superadmin', 'admin', 'user'], {
        error: (iss) => {
          if (iss?.input && iss?.code === 'invalid_value') {
            return 'Role must be one of: superadmin, admin, user';
          }
        },
      })
      .optional(),
    is_active: z
      .boolean({
        error: (iss) => {
          if (iss?.input && iss?.code === 'invalid_type') {
            return 'is_active must be a boolean';
          }
        },
      })
      .optional(),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z
      .string({
        error: (iss) => {
          if (!iss?.input) {
            return 'User ID is required';
          } else if (iss?.code === 'invalid_type') {
            return 'User ID must be a string';
          }
        },
      })
      .min(1, 'User ID cannot be empty'),
  }),
  body: z
    .object({
      first_name: z
        .string({
          error: (iss) => {
            if (iss?.input && iss?.code === 'invalid_type') {
              return 'First name must be a string';
            }
          },
        })
        .min(1, 'First name cannot be empty')
        .optional(),
      last_name: z
        .string({
          error: (iss) => {
            if (iss?.input && iss?.code === 'invalid_type') {
              return 'Last name must be a string';
            }
          },
        })
        .min(1, 'Last name cannot be empty')
        .optional(),
      phone: z
        .string({
          error: (iss) => {
            if (iss?.input && iss?.code === 'invalid_type') {
              return 'Phone must be a string';
            }
          },
        })
        .min(6, 'Phone number must be at least 6 characters long')
        .optional(),
      role: z
        .enum(['superadmin', 'admin', 'user'], {
          error: (iss) => {
            if (iss?.input && iss?.code === 'invalid_value') {
              return 'Role must be one of: superadmin, admin, user';
            }
          },
        })
        .optional(),
      is_active: z
        .boolean({
          error: (iss) => {
            if (iss?.input && iss?.code === 'invalid_type') {
              return 'is_active must be a boolean';
            }
          },
        })
        .optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field must be provided',
    }),
});

export const changeStatusSchema = z.object({
  params: z.object({
    id: z
      .string({
        error: (iss) => {
          if (!iss?.input) {
            return 'User ID is required';
          } else if (iss?.code === 'invalid_type') {
            return 'User ID must be a string';
          }
        },
      })
      .min(1, 'User ID cannot be empty'),
  }),
  body: z.object({
    is_active: z.boolean({
      error: (iss) => {
        if (iss?.input === undefined || iss?.input === null) {
          return 'is_active is required';
        } else if (iss?.code === 'invalid_type') {
          return 'is_active must be a boolean';
        }
      },
    }),
  }),
});

export const changePasswordSchema = z.object({
  params: z.object({
    id: z
      .string({
        error: (iss) => {
          if (!iss?.input) {
            return 'User ID is required';
          } else if (iss?.code === 'invalid_type') {
            return 'User ID must be a string';
          }
        },
      })
      .min(1, 'User ID cannot be empty'),
  }),
  body: z.object({
    password: z
      .string({
        error: (iss) => {
          if (!iss?.input) {
            return 'Password is required';
          } else if (iss?.code === 'invalid_type') {
            return 'Password must be a string';
          }
        },
      })
      .min(6, 'Password must be at least 6 characters long'),
  }),
});

export const getUsersQuerySchema = z.object({
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
    role: z
      .enum(['superadmin', 'admin', 'user'], {
        error: (iss) => {
          if (iss?.input && iss?.code === 'invalid_value') {
            return 'Role must be one of: superadmin, admin, user';
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
            (field: string) => !validUserFields.includes(field),
          );
          return invalidFields.length === 0;
        },
        {
          message: `Invalid field(s) requested. Valid fields are: ${validUserFields.join(
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

export const getUserByIdSchema = z.object({
  params: z.object({
    id: z
      .string({
        error: (iss) => {
          if (!iss?.input) {
            return 'User ID is required';
          } else if (iss?.code === 'invalid_type') {
            return 'User ID must be a string';
          }
        },
      })
      .min(1, 'User ID cannot be empty'),
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
            (field: string) => !validUserFields.includes(field),
          );
          return invalidFields.length === 0;
        },
        {
          message: `Invalid field(s) requested. Valid fields are: ${validUserFields.join(
            ', ',
          )}`,
        },
      ),
  }),
});

export type GetUsersQuery = z.infer<typeof getUsersQuerySchema>['query'];
