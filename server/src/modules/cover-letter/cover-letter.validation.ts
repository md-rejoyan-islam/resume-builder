import { z } from 'zod';

const fieldStyleSchema = z
  .object({
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
      .number({
        error: (iss) => {
          if (iss?.input && iss?.code === 'invalid_type') {
            return 'Font size must be a number';
          }
        },
      })
      .min(8, 'Font size must be at least 8')
      .max(24, 'Font size cannot exceed 24')
      .optional(),
    color: z
      .string({
        error: (iss) => {
          if (iss?.input && iss?.code === 'invalid_type') {
            return 'Color must be a string';
          }
        },
      })
      .optional(),
    align: z
      .enum(['left', 'center', 'right'], {
        error: (iss) => {
          if (iss?.input && iss?.code === 'invalid_value') {
            return 'Align must be one of: left, center, right';
          }
        },
      })
      .optional(),
  })
  .optional();

const themeSchema = z
  .object({
    colors: z
      .object({
        primary: z
          .string({
            error: (iss) => {
              if (iss?.input && iss?.code === 'invalid_type') {
                return 'Primary color must be a string';
              }
            },
          })
          .optional(),
        secondary: z
          .string({
            error: (iss) => {
              if (iss?.input && iss?.code === 'invalid_type') {
                return 'Secondary color must be a string';
              }
            },
          })
          .optional(),
        accent: z
          .string({
            error: (iss) => {
              if (iss?.input && iss?.code === 'invalid_type') {
                return 'Accent color must be a string';
              }
            },
          })
          .optional(),
        text: z
          .string({
            error: (iss) => {
              if (iss?.input && iss?.code === 'invalid_type') {
                return 'Text color must be a string';
              }
            },
          })
          .optional(),
        textLight: z
          .string({
            error: (iss) => {
              if (iss?.input && iss?.code === 'invalid_type') {
                return 'Text light color must be a string';
              }
            },
          })
          .optional(),
        background: z
          .string({
            error: (iss) => {
              if (iss?.input && iss?.code === 'invalid_type') {
                return 'Background color must be a string';
              }
            },
          })
          .optional(),
        border: z
          .string({
            error: (iss) => {
              if (iss?.input && iss?.code === 'invalid_type') {
                return 'Border color must be a string';
              }
            },
          })
          .optional(),
      })
      .optional(),
    spacing: z
      .object({
        pageMargin: z
          .number({
            error: (iss) => {
              if (iss?.input && iss?.code === 'invalid_type') {
                return 'Page margin must be a number';
              }
            },
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
        lineHeight: z
          .number({
            error: (iss) => {
              if (iss?.input && iss?.code === 'invalid_type') {
                return 'Line height must be a number';
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
      })
      .optional(),
    fontFamily: z
      .string({
        error: (iss) => {
          if (iss?.input && iss?.code === 'invalid_type') {
            return 'Font family must be a string';
          }
        },
      })
      .optional(),
  })
  .optional();

const personalInfoSchema = z.object({
  fullName: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Full name must be a string';
        }
      },
    })
    .trim()
    .default(''),
  jobTitle: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Job title must be a string';
        }
      },
    })
    .trim()
    .optional(),
  email: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Email must be a string';
        }
      },
    })
    .trim()
    .refine((val) => val === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: 'Invalid email address',
    })
    .default(''),
  phone: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Phone must be a string';
        }
      },
    })
    .trim()
    .optional(),
  location: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Location must be a string';
        }
      },
    })
    .trim()
    .optional(),
  profileImage: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Profile image must be a string';
        }
      },
    })
    .optional()
    .refine((val) => !val || val === '' || /^https?:\/\//.test(val), {
      message: 'Invalid URL',
    }),
  nameStyle: fieldStyleSchema,
  contactStyle: fieldStyleSchema,
});

const letterContentSchema = z.object({
  date: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Date must be a string';
        }
      },
    })
    .default(''),
  recipientName: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Recipient name must be a string';
        }
      },
    })
    .trim()
    .optional(),
  recipientTitle: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Recipient title must be a string';
        }
      },
    })
    .trim()
    .optional(),
  company: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Company must be a string';
        }
      },
    })
    .trim()
    .optional(),
  address: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Address must be a string';
        }
      },
    })
    .trim()
    .optional(),
  salutation: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Salutation must be a string';
        }
      },
    })
    .trim()
    .optional(),
  greeting: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Greeting must be a string';
        }
      },
    })
    .optional(),
  bodyParagraph1: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Body paragraph 1 must be a string';
        }
      },
    })
    .optional(),
  bodyParagraph2: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Body paragraph 2 must be a string';
        }
      },
    })
    .optional(),
  bodyParagraph3: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Body paragraph 3 must be a string';
        }
      },
    })
    .optional(),
  closingParagraph: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Closing paragraph must be a string';
        }
      },
    })
    .optional(),
  closing: z
    .string({
      error: (iss) => {
        if (iss?.input && iss?.code === 'invalid_type') {
          return 'Closing must be a string';
        }
      },
    })
    .trim()
    .optional(),
  headerStyle: fieldStyleSchema,
  bodyStyle: fieldStyleSchema,
  closingStyle: fieldStyleSchema,
});

export const createCoverLetterSchema = z.object({
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
      .trim()
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
    status: z
      .enum(['draft', 'completed'], {
        error: (iss) => {
          if (iss?.input && iss?.code === 'invalid_value') {
            return 'Status must be either "draft" or "completed"';
          }
        },
      })
      .optional(),
    theme: themeSchema,
    personalInfo: personalInfoSchema,
    letterContent: letterContentSchema,
  }),
});

export type CreateCoverLetterInput = z.infer<
  typeof createCoverLetterSchema
>['body'];

export const updateCoverLetterSchema = z.object({
  params: z.object({
    id: z
      .string({
        error: (iss) => {
          if (!iss?.input) {
            return 'Cover letter ID is required';
          } else if (iss?.code === 'invalid_type') {
            return 'Cover letter ID must be a string';
          }
        },
      })
      .min(1, 'Cover letter ID cannot be empty'),
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
      .trim()
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
    status: z
      .enum(['draft', 'completed'], {
        error: (iss) => {
          if (iss?.input && iss?.code === 'invalid_value') {
            return 'Status must be either "draft" or "completed"';
          }
        },
      })
      .optional(),
    theme: themeSchema,
    personalInfo: personalInfoSchema.partial().optional(),
    letterContent: letterContentSchema.partial().optional(),
  }),
});

export type UpdateCoverLetterInput = z.infer<
  typeof updateCoverLetterSchema
>['body'];

export const getCoverLetterByIdSchema = z.object({
  params: z.object({
    id: z
      .string({
        error: (iss) => {
          if (!iss?.input) {
            return 'Cover letter ID is required';
          } else if (iss?.code === 'invalid_type') {
            return 'Cover letter ID must be a string';
          }
        },
      })
      .min(1, 'Cover letter ID cannot be empty'),
  }),
});

export const deleteCoverLetterSchema = z.object({
  params: z.object({
    id: z
      .string({
        error: (iss) => {
          if (!iss?.input) {
            return 'Cover letter ID is required';
          } else if (iss?.code === 'invalid_type') {
            return 'Cover letter ID must be a string';
          }
        },
      })
      .min(1, 'Cover letter ID cannot be empty'),
  }),
});

export const duplicateCoverLetterSchema = z.object({
  params: z.object({
    id: z
      .string({
        error: (iss) => {
          if (!iss?.input) {
            return 'Cover letter ID is required';
          } else if (iss?.code === 'invalid_type') {
            return 'Cover letter ID must be a string';
          }
        },
      })
      .min(1, 'Cover letter ID cannot be empty'),
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
        .trim()
        .max(100, 'Title cannot exceed 100 characters')
        .optional(),
    })
    .optional(),
});

export const setDefaultCoverLetterSchema = z.object({
  params: z.object({
    id: z
      .string({
        error: (iss) => {
          if (!iss?.input) {
            return 'Cover letter ID is required';
          } else if (iss?.code === 'invalid_type') {
            return 'Cover letter ID must be a string';
          }
        },
      })
      .min(1, 'Cover letter ID cannot be empty'),
  }),
});

export const listCoverLettersQuerySchema = z.object({
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
      .optional()
      .default(1),
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
      .optional()
      .default(10),
    sortBy: z
      .enum(['createdAt', 'updatedAt', 'title'], {
        error: (iss) => {
          if (iss?.input && iss?.code === 'invalid_value') {
            return 'sortBy must be one of: createdAt, updatedAt, title';
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
    search: z
      .string({
        error: (iss) => {
          if (iss?.input && iss?.code === 'invalid_type') {
            return 'Search must be a string';
          }
        },
      })
      .optional(),
    status: z
      .enum(['draft', 'completed'], {
        error: (iss) => {
          if (iss?.input && iss?.code === 'invalid_value') {
            return 'Status must be either "draft" or "completed"';
          }
        },
      })
      .optional(),
  }),
});

export type ListCoverLettersQuery = z.infer<
  typeof listCoverLettersQuerySchema
>['query'];
