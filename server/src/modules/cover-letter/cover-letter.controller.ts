import { Response } from 'express';
import createError from 'http-errors';
import { IRequestWithUser } from '../../app/types';
import { asyncHandler } from '../../utils/async-handler';
import { successResponse } from '../../utils/response-handler';
import { CoverLetterService } from './cover-letter.service';
import { ListCoverLettersQuery } from './cover-letter.validation';

/**
 * List all cover letters for the authenticated user
 */
export const listCoverLetters = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    const data = await CoverLetterService.list(
      userId,
      req.query as unknown as ListCoverLettersQuery,
    );

    successResponse(res, {
      statusCode: 200,
      message: 'Cover letters fetched successfully',
      payload: data,
    });
  },
);

/**
 * Get a single cover letter by ID
 */
export const getCoverLetterById = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    const data = await CoverLetterService.getById(userId, req.params.id);

    successResponse(res, {
      statusCode: 200,
      message: 'Cover letter fetched successfully',
      payload: { data },
    });
  },
);

/**
 * Get the user's default cover letter
 */
export const getDefaultCoverLetter = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    const data = await CoverLetterService.getDefault(userId);

    successResponse(res, {
      statusCode: 200,
      message: data
        ? 'Default cover letter fetched successfully'
        : 'No default cover letter found',
      payload: { data },
    });
  },
);

/**
 * Create a new cover letter
 */
export const createCoverLetter = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    const data = await CoverLetterService.create(userId, req.body);

    successResponse(res, {
      statusCode: 201,
      message: 'Cover letter created successfully',
      payload: { data },
    });
  },
);

/**
 * Update a cover letter
 */
export const updateCoverLetter = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    const data = await CoverLetterService.update(
      userId,
      req.params.id,
      req.body,
    );

    successResponse(res, {
      statusCode: 200,
      message: 'Cover letter updated successfully',
      payload: { data },
    });
  },
);

/**
 * Delete a cover letter
 */
export const deleteCoverLetter = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    const data = await CoverLetterService.remove(userId, req.params.id);

    successResponse(res, {
      statusCode: 200,
      message: 'Cover letter deleted successfully',
      payload: { data },
    });
  },
);

/**
 * Duplicate a cover letter
 */
export const duplicateCoverLetter = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    const data = await CoverLetterService.duplicate(
      userId,
      req.params.id,
      req.body?.title,
    );

    successResponse(res, {
      statusCode: 201,
      message: 'Cover letter duplicated successfully',
      payload: { data },
    });
  },
);

/**
 * Set a cover letter as default
 */
export const setDefaultCoverLetter = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    const data = await CoverLetterService.setDefault(userId, req.params.id);

    successResponse(res, {
      statusCode: 200,
      message: 'Cover letter set as default successfully',
      payload: { data },
    });
  },
);

/**
 * Get cover letter count for the user
 */
export const getCoverLetterCount = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    const count = await CoverLetterService.count(userId);

    successResponse(res, {
      statusCode: 200,
      message: 'Cover letter count fetched successfully',
      payload: { count },
    });
  },
);

/**
 * Upload PDF and extract cover letter data using AI
 */
export const uploadPdfCoverLetter = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    if (!req.file) {
      throw createError.BadRequest('No PDF file uploaded');
    }

    // Import the PDF service dynamically to avoid circular imports
    const { CoverLetterPdfService } = await import(
      './cover-letter-pdf.service'
    );

    const data = await CoverLetterPdfService.processAndCreateCoverLetter(
      userId,
      req.file.buffer,
      req.file.originalname,
    );

    successResponse(res, {
      statusCode: 201,
      message: 'Cover letter extracted and created successfully',
      payload: { data },
    });
  },
);
