import { Request, Response, Router } from 'express';
import createError from 'http-errors';

import errorHandler from '../middlewares/error-handler';
import { register } from '../middlewares/matrics-middleware';
import authRouter from '../modules/auth/auth.route';
import coverLetterRouter from '../modules/cover-letter/cover-letter.route';
import disclosureLetterRouter from '../modules/disclosure-letter/disclosure-letter.route';
import resumeRouter from '../modules/resume/resume.route';
import userRouter from '../modules/user/user.route';
import { asyncHandler } from '../utils/async-handler';
import { successResponse } from '../utils/response-handler';

const router = Router();

// home route
router.get('/', (_: Request, res: Response) => {
  successResponse(res, {
    message: 'Welcome to Resume Builder API',
    statusCode: 200,
  });
});

// health check route
router.get('/health', (_: Request, res: Response) => {
  successResponse(res, {
    message: 'Service is running smoothly!',
    statusCode: 200,
  });
});

// metrics route
router.get(
  '/metrics',
  asyncHandler(async (_: Request, res: Response) => {
    res.setHeader('Content-Type', register.contentType);
    res.end(await register.metrics());
  }),
);

// API documentation routes - Swagger UI
router.get('/api-docs', (_: Request, res: Response) => {
  res.redirect('/docs/index.html');
});

// auth routes
router.use('/api/v1/auth', authRouter);
// users routes
router.use('/api/v1/users', userRouter);
// resume routes
router.use('/api/v1/resumes', resumeRouter);
// cover letter routes
router.use('/api/v1/cover-letters', coverLetterRouter);
// disclosure letter routes
router.use('/api/v1/disclosure-letters', disclosureLetterRouter);

// 404 route
router.use('', (req: Request, _res: Response) => {
  throw createError.NotFound(
    `Did not find the requested resource- ${req.originalUrl}`,
  );
});

// error handler
router.use(errorHandler);

export default router;
