import { Router } from 'express';
import validate from '../../middlewares/validate';
import { isLoggedIn } from '../../middlewares/verify';
import { pdfUpload } from '../../utils/multer';
import {
  createDisclosureLetter,
  deleteDisclosureLetter,
  duplicateDisclosureLetter,
  getDisclosureLetterById,
  getDisclosureLetterCount,
  getDefaultDisclosureLetter,
  listDisclosureLetters,
  setDefaultDisclosureLetter,
  updateDisclosureLetter,
  uploadPdfDisclosureLetter,
} from './disclosure-letter.controller';
import {
  createDisclosureLetterSchema,
  deleteDisclosureLetterSchema,
  duplicateDisclosureLetterSchema,
  getDisclosureLetterByIdSchema,
  listDisclosureLettersQuerySchema,
  setDefaultDisclosureLetterSchema,
  updateDisclosureLetterSchema,
} from './disclosure-letter.validation';

const disclosureLetterRouter = Router();

// All disclosure letter routes require authentication
disclosureLetterRouter.use(isLoggedIn);

// List all disclosure letters for the authenticated user
disclosureLetterRouter.get(
  '/',
  validate(listDisclosureLettersQuerySchema),
  listDisclosureLetters,
);

// Get disclosure letter count
disclosureLetterRouter.get('/count', getDisclosureLetterCount);

// Get user's default disclosure letter
disclosureLetterRouter.get('/default', getDefaultDisclosureLetter);

// Create a new disclosure letter
disclosureLetterRouter.post(
  '/',
  validate(createDisclosureLetterSchema),
  createDisclosureLetter,
);

// Upload PDF and extract disclosure letter data using AI
disclosureLetterRouter.post('/upload-pdf', pdfUpload, uploadPdfDisclosureLetter);

// Get a single disclosure letter by ID
disclosureLetterRouter.get(
  '/:id',
  validate(getDisclosureLetterByIdSchema),
  getDisclosureLetterById,
);

// Update a disclosure letter
disclosureLetterRouter.put(
  '/:id',
  validate(updateDisclosureLetterSchema),
  updateDisclosureLetter,
);

// Delete a disclosure letter
disclosureLetterRouter.delete(
  '/:id',
  validate(deleteDisclosureLetterSchema),
  deleteDisclosureLetter,
);

// Duplicate a disclosure letter
disclosureLetterRouter.post(
  '/:id/duplicate',
  validate(duplicateDisclosureLetterSchema),
  duplicateDisclosureLetter,
);

// Set a disclosure letter as default
disclosureLetterRouter.patch(
  '/:id/default',
  validate(setDefaultDisclosureLetterSchema),
  setDefaultDisclosureLetter,
);

export default disclosureLetterRouter;
