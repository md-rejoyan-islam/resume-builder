import { Router } from 'express';
import validate from '../../middlewares/validate';
import { isLoggedIn } from '../../middlewares/verify';
import { pdfUpload } from '../../utils/multer';
import {
  createCoverLetter,
  deleteCoverLetter,
  duplicateCoverLetter,
  getCoverLetterById,
  getCoverLetterCount,
  getDefaultCoverLetter,
  listCoverLetters,
  setDefaultCoverLetter,
  updateCoverLetter,
  uploadPdfCoverLetter,
} from './cover-letter.controller';
import {
  createCoverLetterSchema,
  deleteCoverLetterSchema,
  duplicateCoverLetterSchema,
  getCoverLetterByIdSchema,
  listCoverLettersQuerySchema,
  setDefaultCoverLetterSchema,
  updateCoverLetterSchema,
} from './cover-letter.validation';

const coverLetterRouter = Router();

// All cover letter routes require authentication
coverLetterRouter.use(isLoggedIn);

// List all cover letters for the authenticated user
coverLetterRouter.get(
  '/',
  validate(listCoverLettersQuerySchema),
  listCoverLetters,
);

// Get cover letter count
coverLetterRouter.get('/count', getCoverLetterCount);

// Get user's default cover letter
coverLetterRouter.get('/default', getDefaultCoverLetter);

// Create a new cover letter
coverLetterRouter.post(
  '/',
  validate(createCoverLetterSchema),
  createCoverLetter,
);

// Upload PDF and extract cover letter data using AI
coverLetterRouter.post('/upload-pdf', pdfUpload, uploadPdfCoverLetter);

// Get a single cover letter by ID
coverLetterRouter.get(
  '/:id',
  validate(getCoverLetterByIdSchema),
  getCoverLetterById,
);

// Update a cover letter
coverLetterRouter.put(
  '/:id',
  validate(updateCoverLetterSchema),
  updateCoverLetter,
);

// Delete a cover letter
coverLetterRouter.delete(
  '/:id',
  validate(deleteCoverLetterSchema),
  deleteCoverLetter,
);

// Duplicate a cover letter
coverLetterRouter.post(
  '/:id/duplicate',
  validate(duplicateCoverLetterSchema),
  duplicateCoverLetter,
);

// Set a cover letter as default
coverLetterRouter.patch(
  '/:id/default',
  validate(setDefaultCoverLetterSchema),
  setDefaultCoverLetter,
);

export default coverLetterRouter;
