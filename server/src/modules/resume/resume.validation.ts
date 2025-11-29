import z from 'zod';

const sectionTitleSchema = z.object({
  id: z
    .string({
      error: (iss) => {
        if (!iss?.input) {
          return 'Section ID is required';
        } else if (iss?.code === 'invalid_type') {
          return 'Section ID must be a string';
        }
      },
    })
    .min(1, 'Section ID cannot be empty'),
  title: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Title must be a string';
        }
      },
    })
    .optional(),
  defaultTitle: z
    .string({
      error: (iss) => {
        if (!iss?.input) {
          return 'Default title is required';
        } else if (iss?.code === 'invalid_type') {
          return 'Default title must be a string';
        }
      },
    })
    .min(1, 'Default title cannot be empty'),
});

const contactSchema = z.object({
  firstName: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'First name must be a string';
        }
      },
    })
    .default(''),
  lastName: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Last name must be a string';
        }
      },
    })
    .default(''),
  jobTitle: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Job title must be a string';
        }
      },
    })
    .optional()
    .default(''),
  email: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Email must be a string';
        }
      },
    })
    .email('Invalid email address')
    .or(z.literal(''))
    .default(''),
  phone: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Phone must be a string';
        }
      },
    })
    .optional()
    .default(''),
  country: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Country must be a string';
        }
      },
    })
    .optional()
    .default(''),
  city: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'City must be a string';
        }
      },
    })
    .optional()
    .default(''),
  state: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'State must be a string';
        }
      },
    })
    .optional()
    .default(''),
  postalCode: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Postal code must be a string';
        }
      },
    })
    .optional()
    .default(''),
  summary: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Summary must be a string';
        }
      },
    })
    .optional()
    .default(''),
  photoUrl: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Photo URL must be a string';
        }
      },
    })
    .url('Invalid photo URL')
    .optional()
    .or(z.literal('')),
  linkedinUrl: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'LinkedIn URL must be a string';
        }
      },
    })
    .url('Invalid LinkedIn URL')
    .optional()
    .or(z.literal('')),
  githubUrl: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'GitHub URL must be a string';
        }
      },
    })
    .url('Invalid GitHub URL')
    .optional()
    .or(z.literal('')),
  websiteUrl: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Website URL must be a string';
        }
      },
    })
    .url('Invalid website URL')
    .optional()
    .or(z.literal('')),
  twitterUrl: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Twitter URL must be a string';
        }
      },
    })
    .url('Invalid Twitter URL')
    .optional()
    .or(z.literal('')),
  nationality: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Nationality must be a string';
        }
      },
    })
    .optional(),
  dateOfBirth: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Date of birth must be a string';
        }
      },
    })
    .optional(),
  drivingLicense: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Driving license must be a string';
        }
      },
    })
    .optional(),
});

const skillSchema = z.object({
  id: z
    .string({
      error: (iss) => {
        if (!iss?.input) {
          return 'Skill ID is required';
        } else if (iss?.code === 'invalid_type') {
          return 'Skill ID must be a string';
        }
      },
    })
    .min(1, 'Skill ID cannot be empty'),
  name: z
    .string({
      error: (iss) => {
        if (!iss?.input) {
          return 'Skill name is required';
        } else if (iss?.code === 'invalid_type') {
          return 'Skill name must be a string';
        }
      },
    })
    .min(1, 'Skill name cannot be empty'),
  level: z
    .number({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Skill level must be a number';
        }
      },
    })
    .min(1, 'Skill level must be at least 1')
    .max(5, 'Skill level cannot exceed 5')
    .optional(),
  index: z
    .number({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Index must be a number';
        }
      },
    })
    .optional(),
});

const experienceSchema = z.object({
  id: z
    .string({
      error: (iss) => {
        if (!iss?.input) {
          return 'Experience ID is required';
        } else if (iss?.code === 'invalid_type') {
          return 'Experience ID must be a string';
        }
      },
    })
    .min(1, 'Experience ID cannot be empty'),
  jobTitle: z
    .string({
      error: (iss) => {
        if (!iss?.input) {
          return 'Job title is required';
        } else if (iss?.code === 'invalid_type') {
          return 'Job title must be a string';
        }
      },
    })
    .min(1, 'Job title cannot be empty'),
  employer: z
    .string({
      error: (iss) => {
        if (!iss?.input) {
          return 'Employer is required';
        } else if (iss?.code === 'invalid_type') {
          return 'Employer must be a string';
        }
      },
    })
    .min(1, 'Employer cannot be empty'),
  city: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'City must be a string';
        }
      },
    })
    .optional(),
  country: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Country must be a string';
        }
      },
    })
    .optional(),
  jobType: z
    .enum(
      [
        'full-time',
        'part-time',
        'contract',
        'freelance',
        'internship',
        'remote',
      ],
      {
        error: (iss) => {
          if (iss?.input && iss?.code === 'invalid_value') {
            return 'Job type must be one of: full-time, part-time, contract, freelance, internship, remote';
          }
        },
      },
    )
    .optional(),
  startDate: z
    .string({
      error: (iss) => {
        if (!iss?.input) {
          return 'Start date is required';
        } else if (iss?.code === 'invalid_type') {
          return 'Start date must be a string';
        }
      },
    })
    .min(1, 'Start date cannot be empty'),
  endDate: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'End date must be a string';
        }
      },
    })
    .optional(),
  currentlyWorking: z
    .boolean({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Currently working must be a boolean';
        }
      },
    })
    .optional(),
  description: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Description must be a string';
        }
      },
    })
    .optional(),
  index: z
    .number({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Index must be a number';
        }
      },
    })
    .optional(),
});

const educationSchema = z.object({
  id: z
    .string({
      error: (iss) => {
        if (!iss?.input) {
          return 'Education ID is required';
        } else if (iss?.code === 'invalid_type') {
          return 'Education ID must be a string';
        }
      },
    })
    .min(1, 'Education ID cannot be empty'),
  school: z
    .string({
      error: (iss) => {
        if (!iss?.input) {
          return 'School is required';
        } else if (iss?.code === 'invalid_type') {
          return 'School must be a string';
        }
      },
    })
    .min(1, 'School cannot be empty'),
  degree: z
    .string({
      error: (iss) => {
        if (!iss?.input) {
          return 'Degree is required';
        } else if (iss?.code === 'invalid_type') {
          return 'Degree must be a string';
        }
      },
    })
    .min(1, 'Degree cannot be empty'),
  fieldOfStudy: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Field of study must be a string';
        }
      },
    })
    .optional(),
  location: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Location must be a string';
        }
      },
    })
    .optional(),
  startDate: z
    .string({
      error: (iss) => {
        if (!iss?.input) {
          return 'Start date is required';
        } else if (iss?.code === 'invalid_type') {
          return 'Start date must be a string';
        }
      },
    })
    .min(1, 'Start date cannot be empty'),
  endDate: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'End date must be a string';
        }
      },
    })
    .optional(),
  currentlyStudying: z
    .boolean({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Currently studying must be a boolean';
        }
      },
    })
    .optional(),
  index: z
    .number({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Index must be a number';
        }
      },
    })
    .optional(),
});

const certificationSchema = z.object({
  id: z
    .string({
      error: (iss) => {
        if (!iss?.input) {
          return 'Certification ID is required';
        } else if (iss?.code === 'invalid_type') {
          return 'Certification ID must be a string';
        }
      },
    })
    .min(1, 'Certification ID cannot be empty'),
  name: z
    .string({
      error: (iss) => {
        if (!iss?.input) {
          return 'Certification name is required';
        } else if (iss?.code === 'invalid_type') {
          return 'Certification name must be a string';
        }
      },
    })
    .min(1, 'Certification name cannot be empty'),
  issuer: z
    .string({
      error: (iss) => {
        if (!iss?.input) {
          return 'Issuer is required';
        } else if (iss?.code === 'invalid_type') {
          return 'Issuer must be a string';
        }
      },
    })
    .min(1, 'Issuer cannot be empty'),
  issueDate: z
    .string({
      error: (iss) => {
        if (!iss?.input) {
          return 'Issue date is required';
        } else if (iss?.code === 'invalid_type') {
          return 'Issue date must be a string';
        }
      },
    })
    .min(1, 'Issue date cannot be empty'),
  expirationDate: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Expiration date must be a string';
        }
      },
    })
    .optional(),
  noExpiration: z
    .boolean({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'No expiration must be a boolean';
        }
      },
    })
    .optional(),
  credentialId: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Credential ID must be a string';
        }
      },
    })
    .optional(),
  credentialUrl: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Credential URL must be a string';
        }
      },
    })
    .url('Invalid credential URL')
    .optional()
    .or(z.literal('')),
  description: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Description must be a string';
        }
      },
    })
    .optional(),
  index: z
    .number({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Index must be a number';
        }
      },
    })
    .optional(),
});

const projectSchema = z.object({
  id: z
    .string({
      error: (iss) => {
        if (!iss?.input) {
          return 'Project ID is required';
        } else if (iss?.code === 'invalid_type') {
          return 'Project ID must be a string';
        }
      },
    })
    .min(1, 'Project ID cannot be empty'),
  name: z
    .string({
      error: (iss) => {
        if (!iss?.input) {
          return 'Project name is required';
        } else if (iss?.code === 'invalid_type') {
          return 'Project name must be a string';
        }
      },
    })
    .min(1, 'Project name cannot be empty'),
  description: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Description must be a string';
        }
      },
    })
    .optional(),
  githubUrl: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'GitHub URL must be a string';
        }
      },
    })
    .url('Invalid GitHub URL')
    .optional()
    .or(z.literal('')),
  liveUrl: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Live URL must be a string';
        }
      },
    })
    .url('Invalid live URL')
    .optional()
    .or(z.literal('')),
  otherUrl: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Other URL must be a string';
        }
      },
    })
    .url('Invalid URL')
    .optional()
    .or(z.literal('')),
  index: z
    .number({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Index must be a number';
        }
      },
    })
    .optional(),
});

const referenceSchema = z.object({
  id: z
    .string({
      error: (iss) => {
        if (!iss?.input) {
          return 'Reference ID is required';
        } else if (iss?.code === 'invalid_type') {
          return 'Reference ID must be a string';
        }
      },
    })
    .min(1, 'Reference ID cannot be empty'),
  name: z
    .string({
      error: (iss) => {
        if (!iss?.input) {
          return 'Reference name is required';
        } else if (iss?.code === 'invalid_type') {
          return 'Reference name must be a string';
        }
      },
    })
    .min(1, 'Reference name cannot be empty'),
  company: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Company must be a string';
        }
      },
    })
    .optional(),
  position: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Position must be a string';
        }
      },
    })
    .optional(),
  email: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Email must be a string';
        }
      },
    })
    .email('Invalid email address')
    .optional()
    .or(z.literal('')),
  phone: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Phone must be a string';
        }
      },
    })
    .optional(),
  relationship: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Relationship must be a string';
        }
      },
    })
    .optional(),
  index: z
    .number({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Index must be a number';
        }
      },
    })
    .optional(),
});

const languageSchema = z.object({
  id: z
    .string({
      error: (iss) => {
        if (!iss?.input) {
          return 'Language ID is required';
        } else if (iss?.code === 'invalid_type') {
          return 'Language ID must be a string';
        }
      },
    })
    .min(1, 'Language ID cannot be empty'),
  language: z
    .string({
      error: (iss) => {
        if (!iss?.input) {
          return 'Language is required';
        } else if (iss?.code === 'invalid_type') {
          return 'Language must be a string';
        }
      },
    })
    .min(1, 'Language cannot be empty'),
  proficiency: z
    .enum(['native', 'fluent', 'advanced', 'intermediate', 'basic'], {
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_value') {
          return 'Proficiency must be one of: native, fluent, advanced, intermediate, basic';
        }
      },
    })
    .optional(),
  index: z
    .number({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Index must be a number';
        }
      },
    })
    .optional(),
});

const volunteerSchema = z.object({
  id: z
    .string({
      error: (iss) => {
        if (!iss?.input) {
          return 'Volunteer ID is required';
        } else if (iss?.code === 'invalid_type') {
          return 'Volunteer ID must be a string';
        }
      },
    })
    .min(1, 'Volunteer ID cannot be empty'),
  organization: z
    .string({
      error: (iss) => {
        if (!iss?.input) {
          return 'Organization is required';
        } else if (iss?.code === 'invalid_type') {
          return 'Organization must be a string';
        }
      },
    })
    .min(1, 'Organization cannot be empty'),
  role: z
    .string({
      error: (iss) => {
        if (!iss?.input) {
          return 'Role is required';
        } else if (iss?.code === 'invalid_type') {
          return 'Role must be a string';
        }
      },
    })
    .min(1, 'Role cannot be empty'),
  location: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Location must be a string';
        }
      },
    })
    .optional(),
  startDate: z
    .string({
      error: (iss) => {
        if (!iss?.input) {
          return 'Start date is required';
        } else if (iss?.code === 'invalid_type') {
          return 'Start date must be a string';
        }
      },
    })
    .min(1, 'Start date cannot be empty'),
  endDate: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'End date must be a string';
        }
      },
    })
    .optional(),
  currentlyVolunteering: z
    .boolean({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Currently volunteering must be a boolean';
        }
      },
    })
    .optional(),
  description: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Description must be a string';
        }
      },
    })
    .optional(),
  index: z
    .number({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Index must be a number';
        }
      },
    })
    .optional(),
});

const publicationSchema = z.object({
  id: z
    .string({
      error: (iss) => {
        if (!iss?.input) {
          return 'Publication ID is required';
        } else if (iss?.code === 'invalid_type') {
          return 'Publication ID must be a string';
        }
      },
    })
    .min(1, 'Publication ID cannot be empty'),
  title: z
    .string({
      error: (iss) => {
        if (!iss?.input) {
          return 'Publication title is required';
        } else if (iss?.code === 'invalid_type') {
          return 'Publication title must be a string';
        }
      },
    })
    .min(1, 'Publication title cannot be empty'),
  publisher: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Publisher must be a string';
        }
      },
    })
    .optional(),
  authors: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Authors must be a string';
        }
      },
    })
    .optional(),
  publicationDate: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Publication date must be a string';
        }
      },
    })
    .optional(),
  url: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'URL must be a string';
        }
      },
    })
    .url('Invalid URL')
    .optional()
    .or(z.literal('')),
  description: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Description must be a string';
        }
      },
    })
    .optional(),
  index: z
    .number({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Index must be a number';
        }
      },
    })
    .optional(),
});

const templateSettingsSchema = z.object({
  templateId: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Template ID must be a string';
        }
      },
    })
    .min(1, 'Template ID cannot be empty')
    .default('classic'),
  fontFamily: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Font family must be a string';
        }
      },
    })
    .optional(),
  fontSize: z
    .object({
      name: z.string().optional(),
      sectionTitle: z.string().optional(),
      itemTitle: z.string().optional(),
      body: z.string().optional(),
      small: z.string().optional(),
    })
    .optional(),
  sectionGap: z
    .number({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Section gap must be a number';
        }
      },
    })
    .optional(),
  paragraphGap: z
    .number({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Paragraph gap must be a number';
        }
      },
    })
    .optional(),
  lineHeight: z
    .number({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Line height must be a number';
        }
      },
    })
    .optional(),
  accentColor: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Accent color must be a string';
        }
      },
    })
    .optional(),
});

export const createResumeSchema = z.object({
  body: z.object({
    title: z
      .string({
        error: (iss) => {
          if (!iss?.input) {
            return 'Title is required';
          } else if (iss?.code === 'invalid_type') {
            return 'Title must be a string';
          }
        },
      })
      .min(1, 'Title cannot be empty')
      .max(100, 'Title cannot exceed 100 characters'),
    isDefault: z
      .boolean({
        error: (iss) => {
          if (iss?.input && iss?.code === 'invalid_type') {
            return 'isDefault must be a boolean';
          }
        },
      })
      .optional(),
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

export const updateResumeSchema = z.object({
  params: z.object({
    id: z
      .string({
        error: (iss) => {
          if (!iss?.input) {
            return 'Resume ID is required';
          } else if (iss?.code === 'invalid_type') {
            return 'Resume ID must be a string';
          }
        },
      })
      .min(1, 'Resume ID cannot be empty'),
  }),
  body: z
    .object({
      title: z
        .string({
          error: (iss) => {
            if (iss?.input && iss?.code === 'invalid_type') {
              return 'Title must be a string';
            }
          },
        })
        .min(1, 'Title cannot be empty')
        .max(100, 'Title cannot exceed 100 characters')
        .optional(),
      isDefault: z
        .boolean({
          error: (iss) => {
            if (iss?.input && iss?.code === 'invalid_type') {
              return 'isDefault must be a boolean';
            }
          },
        })
        .optional(),
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

export const getResumeByIdSchema = z.object({
  params: z.object({
    id: z
      .string({
        error: (iss) => {
          if (!iss?.input) {
            return 'Resume ID is required';
          } else if (iss?.code === 'invalid_type') {
            return 'Resume ID must be a string';
          }
        },
      })
      .min(1, 'Resume ID cannot be empty'),
  }),
});

export const deleteResumeSchema = z.object({
  params: z.object({
    id: z
      .string({
        error: (iss) => {
          if (!iss?.input) {
            return 'Resume ID is required';
          } else if (iss?.code === 'invalid_type') {
            return 'Resume ID must be a string';
          }
        },
      })
      .min(1, 'Resume ID cannot be empty'),
  }),
});

export const listResumesQuerySchema = z.object({
  query: z.object({
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
      .enum(['createdAt', 'updatedAt', 'title'], {
        error: (iss) => {
          if (iss?.input && iss?.code === 'invalid_value') {
            return 'sortBy must be one of: createdAt, updatedAt, title';
          }
        },
      })
      .default('createdAt')
      .optional(),
    sortOrder: z
      .enum(['asc', 'desc'], {
        error: (iss) => {
          if (iss?.input && iss?.code === 'invalid_value') {
            return 'sortOrder must be either "asc" or "desc"';
          }
        },
      })
      .default('desc')
      .optional(),
    search: z
      .string({
        error: (iss) => {
          if (iss?.input && iss?.code === 'invalid_type') {
            return 'Search must be a string';
          }
        },
      })
      .optional(),
  }),
});

export const duplicateResumeSchema = z.object({
  params: z.object({
    id: z
      .string({
        error: (iss) => {
          if (!iss?.input) {
            return 'Resume ID is required';
          } else if (iss?.code === 'invalid_type') {
            return 'Resume ID must be a string';
          }
        },
      })
      .min(1, 'Resume ID cannot be empty'),
  }),
  body: z.object({
    title: z
      .string({
        error: (iss) => {
          if (iss?.input && iss?.code === 'invalid_type') {
            return 'Title must be a string';
          }
        },
      })
      .min(1, 'Title cannot be empty')
      .max(100, 'Title cannot exceed 100 characters')
      .optional(),
  }),
});

export const setDefaultResumeSchema = z.object({
  params: z.object({
    id: z
      .string({
        error: (iss) => {
          if (!iss?.input) {
            return 'Resume ID is required';
          } else if (iss?.code === 'invalid_type') {
            return 'Resume ID must be a string';
          }
        },
      })
      .min(1, 'Resume ID cannot be empty'),
  }),
});

export type CreateResumeInput = z.infer<typeof createResumeSchema>['body'];
export type UpdateResumeInput = z.infer<typeof updateResumeSchema>['body'];
export type ListResumesQuery = z.infer<typeof listResumesQuerySchema>['query'];
