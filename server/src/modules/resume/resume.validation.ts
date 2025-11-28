import z from 'zod';

// =============================================================================
// Sub-Schemas
// =============================================================================

const sectionTitleSchema = z.object({
  id: z.string().min(1),
  title: z.string().optional(),
  defaultTitle: z.string().min(1),
});

const contactSchema = z.object({
  firstName: z.string().default(''),
  lastName: z.string().default(''),
  jobTitle: z.string().optional().default(''),
  email: z.string().email('Invalid email address').or(z.literal('')).default(''),
  phone: z.string().optional().default(''),
  country: z.string().optional().default(''),
  city: z.string().optional().default(''),
  state: z.string().optional().default(''),
  postalCode: z.string().optional().default(''),
  summary: z.string().optional().default(''),
  photoUrl: z.string().url().optional().or(z.literal('')),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  websiteUrl: z.string().url().optional().or(z.literal('')),
  twitterUrl: z.string().url().optional().or(z.literal('')),
  nationality: z.string().optional(),
  dateOfBirth: z.string().optional(),
  drivingLicense: z.string().optional(),
});

const skillSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, 'Skill name is required'),
  level: z.number().min(1).max(5).optional(),
  index: z.number().optional(),
});

const experienceSchema = z.object({
  id: z.string().min(1),
  jobTitle: z.string().min(1, 'Job title is required'),
  employer: z.string().min(1, 'Employer is required'),
  city: z.string().optional(),
  country: z.string().optional(),
  jobType: z
    .enum(['full-time', 'part-time', 'contract', 'freelance', 'internship', 'remote'])
    .optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  currentlyWorking: z.boolean().optional(),
  description: z.string().optional(),
  index: z.number().optional(),
});

const educationSchema = z.object({
  id: z.string().min(1),
  school: z.string().min(1, 'School is required'),
  degree: z.string().min(1, 'Degree is required'),
  fieldOfStudy: z.string().optional(),
  location: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  currentlyStudying: z.boolean().optional(),
  index: z.number().optional(),
});

const certificationSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, 'Certification name is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  issueDate: z.string().min(1, 'Issue date is required'),
  expirationDate: z.string().optional(),
  noExpiration: z.boolean().optional(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url().optional().or(z.literal('')),
  description: z.string().optional(),
  index: z.number().optional(),
});

const projectSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, 'Project name is required'),
  description: z.string().optional(),
  githubUrl: z.string().url().optional().or(z.literal('')),
  liveUrl: z.string().url().optional().or(z.literal('')),
  otherUrl: z.string().url().optional().or(z.literal('')),
  index: z.number().optional(),
});

const referenceSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, 'Reference name is required'),
  company: z.string().optional(),
  position: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  relationship: z.string().optional(),
  index: z.number().optional(),
});

const languageSchema = z.object({
  id: z.string().min(1),
  language: z.string().min(1, 'Language is required'),
  proficiency: z.enum(['native', 'fluent', 'advanced', 'intermediate', 'basic']).optional(),
  index: z.number().optional(),
});

const volunteerSchema = z.object({
  id: z.string().min(1),
  organization: z.string().min(1, 'Organization is required'),
  role: z.string().min(1, 'Role is required'),
  location: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  currentlyVolunteering: z.boolean().optional(),
  description: z.string().optional(),
  index: z.number().optional(),
});

const publicationSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1, 'Publication title is required'),
  publisher: z.string().optional(),
  authors: z.string().optional(),
  publicationDate: z.string().optional(),
  url: z.string().url().optional().or(z.literal('')),
  description: z.string().optional(),
  index: z.number().optional(),
});

const templateSettingsSchema = z.object({
  templateId: z.string().min(1).default('classic'),
  fontFamily: z.string().optional(),
  fontSize: z
    .object({
      name: z.string().optional(),
      sectionTitle: z.string().optional(),
      itemTitle: z.string().optional(),
      body: z.string().optional(),
      small: z.string().optional(),
    })
    .optional(),
  sectionGap: z.number().optional(),
  paragraphGap: z.number().optional(),
  lineHeight: z.number().optional(),
  accentColor: z.string().optional(),
});

// =============================================================================
// Create Resume Schema
// =============================================================================

export const createResumeSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title cannot exceed 100 characters'),
    isDefault: z.boolean().optional(),
    templateSettings: templateSettingsSchema.optional(),
    sectionTitles: z.array(sectionTitleSchema).optional(),
    contact: contactSchema,
    skills: z.array(skillSchema).optional(),
    experiences: z.array(experienceSchema).optional(),
    educations: z.array(educationSchema).optional(),
    certifications: z.array(certificationSchema).optional(),
    projects: z.array(projectSchema).optional(),
    references: z.array(referenceSchema).optional(),
    languages: z.array(languageSchema).optional(),
    volunteers: z.array(volunteerSchema).optional(),
    publications: z.array(publicationSchema).optional(),
  }),
});

// =============================================================================
// Update Resume Schema
// =============================================================================

export const updateResumeSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Resume ID is required'),
  }),
  body: z
    .object({
      title: z.string().min(1).max(100).optional(),
      isDefault: z.boolean().optional(),
      templateSettings: templateSettingsSchema.optional(),
      sectionTitles: z.array(sectionTitleSchema).optional(),
      contact: contactSchema.partial().optional(),
      skills: z.array(skillSchema).optional(),
      experiences: z.array(experienceSchema).optional(),
      educations: z.array(educationSchema).optional(),
      certifications: z.array(certificationSchema).optional(),
      projects: z.array(projectSchema).optional(),
      references: z.array(referenceSchema).optional(),
      languages: z.array(languageSchema).optional(),
      volunteers: z.array(volunteerSchema).optional(),
      publications: z.array(publicationSchema).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'At least one field must be provided',
    }),
});

// =============================================================================
// Get Resume by ID Schema
// =============================================================================

export const getResumeByIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Resume ID is required'),
  }),
});

// =============================================================================
// Delete Resume Schema
// =============================================================================

export const deleteResumeSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Resume ID is required'),
  }),
});

// =============================================================================
// List Resumes Query Schema
// =============================================================================

export const listResumesQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1).optional(),
    limit: z.coerce.number().int().positive().max(100).default(10).optional(),
    sortBy: z.enum(['createdAt', 'updatedAt', 'title']).default('createdAt').optional(),
    sortOrder: z.enum(['asc', 'desc']).default('desc').optional(),
    search: z.string().optional(),
  }),
});

// =============================================================================
// Duplicate Resume Schema
// =============================================================================

export const duplicateResumeSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Resume ID is required'),
  }),
  body: z.object({
    title: z.string().min(1).max(100).optional(),
  }),
});

// =============================================================================
// Set Default Resume Schema
// =============================================================================

export const setDefaultResumeSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Resume ID is required'),
  }),
});

// =============================================================================
// Type Exports
// =============================================================================

export type CreateResumeInput = z.infer<typeof createResumeSchema>['body'];
export type UpdateResumeInput = z.infer<typeof updateResumeSchema>['body'];
export type ListResumesQuery = z.infer<typeof listResumesQuerySchema>['query'];
