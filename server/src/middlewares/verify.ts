import { NextFunction, Response } from 'express';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import secret from '../app/secret';
import { IJwtPayload, IRequestWithUser } from '../app/types';

import TenantModel from '../modules/tenant/tenant.model';
import UserModel from '../modules/user/user.model';
import { asyncHandler } from '../utils/async-handler';

export const isLoggedIn = asyncHandler(
  async (req: IRequestWithUser, _res: Response, next: NextFunction) => {
    const token =
      req.headers?.authorization?.split('Bearer ')[1] || req.cookies?.token;

    if (!token || token === 'null') {
      throw createError.Unauthorized('Please login to access this resource.');
    }

    const decoded = jwt.verify(
      token,
      secret.jwt.accessTokenSecret,
    ) as IJwtPayload;
    const user = await UserModel.findById(decoded._id)
      .select('refresh_token role email')
      .lean();

    if (!user) {
      throw createError.Unauthorized(
        'Login User not found or no longer exists!',
      );
    }

    // Check subdomain matches user's tenant if subdomain header is present
    const subdomain = req.headers['x-subdomain'] as string | undefined;

    if (subdomain) {
      // Get the tenant for this user
      const userTenant = await TenantModel.findOne({ userId: user._id })
        .select('name')
        .lean();

      if (!userTenant) {
        throw createError.Unauthorized(
          'No tenant associated with this user account.',
        );
      }

      // Verify subdomain matches user's tenant name
      if (userTenant.name !== subdomain) {
        throw createError.Unauthorized(
          'You do not have access to this subdomain.',
        );
      }
    }

    req.user = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };
    next();
  },
);

export const isLoggedOut = asyncHandler(
  async (req: IRequestWithUser, _res: Response, next: NextFunction) => {
    const authHeader = req.headers?.authorization;
    const token = authHeader?.split(' ')[1];
    // check token
    const isValid = jwt.decode(token as string);

    if (isValid) {
      throw createError.Forbidden('You are already logged in');
    }

    next();
  },
);
