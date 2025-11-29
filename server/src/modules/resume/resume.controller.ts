import { Response } from 'express';
import createError from 'http-errors';
import { IRequestWithUser } from '../../app/types';
import { asyncHandler } from '../../utils/async-handler';
import { successResponse } from '../../utils/response-handler';
import { ResumePdfService } from './resume-pdf.service';
import { ResumeService } from './resume.service';
import { ListResumesQuery } from './resume.validation';

/**
 * List all resumes for the authenticated user
 */
export const listResumes = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    const data = await ResumeService.list(
      userId,
      req.query as ListResumesQuery,
    );

    successResponse(res, {
      statusCode: 200,
      message: 'Resumes fetched successfully',
      payload: data,
    });
  },
);

/**
 * Get a single resume by ID
 */
export const getResumeById = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    const data = await ResumeService.getById(userId, req.params.id);

    successResponse(res, {
      statusCode: 200,
      message: 'Resume fetched successfully',
      payload: { data },
    });
  },
);

/**
 * Get the user's default resume
 */
export const getDefaultResume = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    const data = await ResumeService.getDefault(userId);

    successResponse(res, {
      statusCode: 200,
      message: data
        ? 'Default resume fetched successfully'
        : 'No default resume found',
      payload: { data },
    });
  },
);

/**
 * Create a new resume
 */
export const createResume = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    const data = await ResumeService.create(userId, req.body);

    successResponse(res, {
      statusCode: 201,
      message: 'Resume created successfully',
      payload: { data },
    });
  },
);

/**
 * Update a resume
 */
export const updateResume = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    const data = await ResumeService.update(userId, req.params.id, req.body);

    successResponse(res, {
      statusCode: 200,
      message: 'Resume updated successfully',
      payload: { data },
    });
  },
);

/**
 * Delete a resume
 */
export const deleteResume = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    const data = await ResumeService.remove(userId, req.params.id);

    successResponse(res, {
      statusCode: 200,
      message: 'Resume deleted successfully',
      payload: { data },
    });
  },
);

/**
 * Duplicate a resume
 */
export const duplicateResume = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    const data = await ResumeService.duplicate(
      userId,
      req.params.id,
      req.body?.title,
    );

    successResponse(res, {
      statusCode: 201,
      message: 'Resume duplicated successfully',
      payload: { data },
    });
  },
);

/**
 * Set a resume as default
 */
export const setDefaultResume = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    const data = await ResumeService.setDefault(userId, req.params.id);

    successResponse(res, {
      statusCode: 200,
      message: 'Resume set as default successfully',
      payload: { data },
    });
  },
);

/**
 * Get resume count for the user
 */
export const getResumeCount = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    const count = await ResumeService.count(userId);

    successResponse(res, {
      statusCode: 200,
      message: 'Resume count fetched successfully',
      payload: { count },
    });
  },
);

/**
 * Upload PDF and extract resume data using AI
 */
export const uploadPdfResume = asyncHandler(
  async (req: IRequestWithUser, res: Response) => {
    const userId = req.user?._id?.toString() as string;

    if (!req.file) {
      throw createError.BadRequest('No PDF file uploaded');
    }

    const data = await ResumePdfService.processAndCreateResume(
      userId,
      req.file.buffer,
      req.file.originalname,
    );

    successResponse(res, {
      statusCode: 201,
      message: 'Resume extracted and created successfully',
      payload: { data },
    });
  },
);
