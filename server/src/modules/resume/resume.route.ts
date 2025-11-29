import { Router } from 'express';
import validate from '../../middlewares/validate';
import { isLoggedIn } from '../../middlewares/verify';
import { pdfUpload } from '../../utils/multer';
import {
  createResume,
  deleteResume,
  duplicateResume,
  getDefaultResume,
  getResumeById,
  getResumeCount,
  listResumes,
  setDefaultResume,
  updateResume,
  uploadPdfResume,
} from './resume.controller';
import {
  createResumeSchema,
  deleteResumeSchema,
  duplicateResumeSchema,
  getResumeByIdSchema,
  listResumesQuerySchema,
  setDefaultResumeSchema,
  updateResumeSchema,
} from './resume.validation';

const resumeRouter = Router();

// Authentication
resumeRouter.use(isLoggedIn);

// List all resumes for the authenticated user
resumeRouter.get('/', validate(listResumesQuerySchema), listResumes);

// Get resume count
resumeRouter.get('/count', getResumeCount);

// Get user's default resume
resumeRouter.get('/default', getDefaultResume);

// Create a new resume
resumeRouter.post('/', validate(createResumeSchema), createResume);

// Upload PDF and extract resume data using AI
resumeRouter.post('/upload-pdf', pdfUpload, uploadPdfResume);

// Get a single resume by ID
resumeRouter.get('/:id', validate(getResumeByIdSchema), getResumeById);

// Update a resume
resumeRouter.put('/:id', validate(updateResumeSchema), updateResume);

// Delete a resume
resumeRouter.delete('/:id', validate(deleteResumeSchema), deleteResume);

// Duplicate a resume
resumeRouter.post(
  '/:id/duplicate',
  validate(duplicateResumeSchema),
  duplicateResume,
);

// Set a resume as default
resumeRouter.patch(
  '/:id/default',
  validate(setDefaultResumeSchema),
  setDefaultResume,
);

export default resumeRouter;
