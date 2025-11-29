import { Response } from 'express';
import createError from 'http-errors';
import { IRequestWithUser } from '../../app/types';
import { asyncHandler } from '../../utils/async-handler';
import { successResponse } from '../../utils/response-handler';
import { DisclosureLetterService } from './disclosure-letter.service';
import { ListDisclosureLettersQuery } from './disclosure-letter.validation';

/**
 * List all disclosure letters for the authenticated user
 */
export const listDisclosureLetters = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    const data = await DisclosureLetterService.list(
      userId,
      req.query as unknown as ListDisclosureLettersQuery,
    );

    successResponse(res, {
      statusCode: 200,
      message: 'Disclosure letters fetched successfully',
      payload: data,
    });
  },
);

/**
 * Get a single disclosure letter by ID
 */
export const getDisclosureLetterById = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    const data = await DisclosureLetterService.getById(userId, req.params.id);

    successResponse(res, {
      statusCode: 200,
      message: 'Disclosure letter fetched successfully',
      payload: { data },
    });
  },
);

/**
 * Get the user's default disclosure letter
 */
export const getDefaultDisclosureLetter = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    const data = await DisclosureLetterService.getDefault(userId);

    successResponse(res, {
      statusCode: 200,
      message: data
        ? 'Default disclosure letter fetched successfully'
        : 'No default disclosure letter found',
      payload: { data },
    });
  },
);

/**
 * Create a new disclosure letter
 */
export const createDisclosureLetter = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    const data = await DisclosureLetterService.create(userId, req.body);

    successResponse(res, {
      statusCode: 201,
      message: 'Disclosure letter created successfully',
      payload: { data },
    });
  },
);

/**
 * Update a disclosure letter
 */
export const updateDisclosureLetter = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    const data = await DisclosureLetterService.update(
      userId,
      req.params.id,
      req.body,
    );

    successResponse(res, {
      statusCode: 200,
      message: 'Disclosure letter updated successfully',
      payload: { data },
    });
  },
);

/**
 * Delete a disclosure letter
 */
export const deleteDisclosureLetter = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    const data = await DisclosureLetterService.remove(userId, req.params.id);

    successResponse(res, {
      statusCode: 200,
      message: 'Disclosure letter deleted successfully',
      payload: { data },
    });
  },
);

/**
 * Duplicate a disclosure letter
 */
export const duplicateDisclosureLetter = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    const data = await DisclosureLetterService.duplicate(
      userId,
      req.params.id,
      req.body?.title,
    );

    successResponse(res, {
      statusCode: 201,
      message: 'Disclosure letter duplicated successfully',
      payload: { data },
    });
  },
);

/**
 * Set a disclosure letter as default
 */
export const setDefaultDisclosureLetter = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    const data = await DisclosureLetterService.setDefault(
      userId,
      req.params.id,
    );

    successResponse(res, {
      statusCode: 200,
      message: 'Disclosure letter set as default successfully',
      payload: { data },
    });
  },
);

/**
 * Get disclosure letter count for the user
 */
export const getDisclosureLetterCount = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    const count = await DisclosureLetterService.count(userId);

    successResponse(res, {
      statusCode: 200,
      message: 'Disclosure letter count fetched successfully',
      payload: { count },
    });
  },
);

/**
 * Upload PDF and extract disclosure letter data using AI
 */
export const uploadPdfDisclosureLetter = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    if (!req.file) {
      throw createError.BadRequest('No PDF file uploaded');
    }

    // Import the PDF service dynamically to avoid circular imports
    const { DisclosureLetterPdfService } = await import(
      './disclosure-letter-pdf.service'
    );

    const data = await DisclosureLetterPdfService.processAndCreateDisclosureLetter(
      userId,
      req.file.buffer,
      req.file.originalname,
    );

    successResponse(res, {
      statusCode: 201,
      message: 'Disclosure letter extracted and created successfully',
      payload: { data },
    });
  },
);
