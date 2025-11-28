import { z } from 'zod';

// =============================================================================
// Field Style Schema
// =============================================================================

const fieldStyleSchema = z
  .object({
    fontFamily: z.string().optional(),
    fontSize: z.number().min(8).max(24).optional(),
    color: z.string().optional(),
    align: z.enum(['left', 'center', 'right']).optional(),
  })
  .optional();

// =============================================================================
// Theme Schema
// =============================================================================

const themeSchema = z
  .object({
    colors: z
      .object({
        primary: z.string().optional(),
        secondary: z.string().optional(),
        accent: z.string().optional(),
        text: z.string().optional(),
        textLight: z.string().optional(),
        background: z.string().optional(),
        border: z.string().optional(),
      })
      .optional(),
    spacing: z
      .object({
        pageMargin: z.number().optional(),
        sectionGap: z.number().optional(),
        lineHeight: z.number().optional(),
        paragraphGap: z.number().optional(),
      })
      .optional(),
    fontFamily: z.string().optional(),
  })
  .optional();

// =============================================================================
// Personal Info Schema
// =============================================================================

const personalInfoSchema = z.object({
  fullName: z.string().trim().default(''),
  jobTitle: z.string().trim().optional(),
  email: z
    .string()
    .trim()
    .refine((val) => val === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: 'Invalid email address',
    })
    .default(''),
  phone: z.string().trim().optional(),
  location: z.string().trim().optional(),
  profileImage: z
    .string()
    .optional()
    .refine((val) => !val || val === '' || /^https?:\/\//.test(val), {
      message: 'Invalid URL',
    }),
  nameStyle: fieldStyleSchema,
  contactStyle: fieldStyleSchema,
});

// =============================================================================
// Letter Content Schema
// =============================================================================

const letterContentSchema = z.object({
  date: z.string().default(''),
  recipientName: z.string().trim().optional(),
  recipientTitle: z.string().trim().optional(),
  company: z.string().trim().optional(),
  address: z.string().trim().optional(),
  salutation: z.string().trim().optional(),
  greeting: z.string().optional(),
  bodyParagraph1: z.string().optional(),
  bodyParagraph2: z.string().optional(),
  bodyParagraph3: z.string().optional(),
  closingParagraph: z.string().optional(),
  closing: z.string().trim().optional(),
  headerStyle: fieldStyleSchema,
  bodyStyle: fieldStyleSchema,
  closingStyle: fieldStyleSchema,
});

// =============================================================================
// Create Cover Letter Schema
// =============================================================================

export const createCoverLetterSchema = z.object({
  body: z.object({
    title: z
      .string()
      .trim()
      .min(1, 'Title is required')
      .max(100, 'Title cannot exceed 100 characters'),
    isDefault: z.boolean().optional(),
    status: z.enum(['draft', 'completed']).optional(),
    theme: themeSchema,
    personalInfo: personalInfoSchema,
    letterContent: letterContentSchema,
  }),
});

export type CreateCoverLetterInput = z.infer<
  typeof createCoverLetterSchema
>['body'];

// =============================================================================
// Update Cover Letter Schema
// =============================================================================

export const updateCoverLetterSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Cover letter ID is required'),
  }),
  body: z.object({
    title: z.string().trim().max(100).optional(),
    isDefault: z.boolean().optional(),
    status: z.enum(['draft', 'completed']).optional(),
    theme: themeSchema,
    personalInfo: personalInfoSchema.partial().optional(),
    letterContent: letterContentSchema.partial().optional(),
  }),
});

export type UpdateCoverLetterInput = z.infer<
  typeof updateCoverLetterSchema
>['body'];

// =============================================================================
// Get Cover Letter By ID Schema
// =============================================================================

export const getCoverLetterByIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Cover letter ID is required'),
  }),
});

// =============================================================================
// Delete Cover Letter Schema
// =============================================================================

export const deleteCoverLetterSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Cover letter ID is required'),
  }),
});

// =============================================================================
// Duplicate Cover Letter Schema
// =============================================================================

export const duplicateCoverLetterSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Cover letter ID is required'),
  }),
  body: z
    .object({
      title: z.string().trim().max(100).optional(),
    })
    .optional(),
});

// =============================================================================
// Set Default Cover Letter Schema
// =============================================================================

export const setDefaultCoverLetterSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Cover letter ID is required'),
  }),
});

// =============================================================================
// List Cover Letters Query Schema
// =============================================================================

export const listCoverLettersQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(100).optional().default(10),
    sortBy: z.enum(['createdAt', 'updatedAt', 'title']).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
    search: z.string().optional(),
    status: z.enum(['draft', 'completed']).optional(),
  }),
});

export type ListCoverLettersQuery = z.infer<
  typeof listCoverLettersQuerySchema
>['query'];
