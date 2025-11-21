import createError from 'http-errors';
import secret from '../../app/secret';
import { IJwtPayload } from '../../app/types';
import accountActivationMail from '../../mails/account-activation-mail';
import {
  deleteCache,
  generateCacheKey,
  getCache,
  setCache,
} from '../../utils/cache';
import { generateTenantName } from '../../utils/generate-tenant-name';
import generateToken, { verifyToken } from '../../utils/generate-token';
import { removeImage } from '../../utils/image-utils';
import { logger } from '../../utils/logger';
import { comparePassword, hashPassword } from '../../utils/password';
import { TenantService } from '../tenant/tenant.service';
import UserModel from '../user/user.model';
import { RegisterInput } from './auth.validation';

export class AuthService {
  static async register(payload: RegisterInput) {
    const exists = await UserModel.findOne({ email: payload.email }).lean();
    if (exists) throw createError.Conflict('Email already exists');
    const user = await UserModel.create({ ...payload });

    // Generate unique tenant name and create tenant
    const tenantName = await generateTenantName(
      payload.first_name,
      payload.last_name,
    );
    await TenantService.create({ name: tenantName, userId: user._id });

    // send account activation mail
    const activationToken = generateToken(
      {
        _id: user._id.toString(),
        role: user.role,
        email: user.email,
      },
      {
        secret: secret.jwt.accountActivationTokenSecret,
        expiresIn: secret.jwt.accountActivationTokenExpiresIn,
      },
    );

    try {
      await accountActivationMail({
        to: payload.email,
        name: payload.first_name,
        activationToken,
      });
    } catch (error) {
      logger.error('Error sending account activation email:', error);
    }

    return { _id: user._id };
  }

  static async login(email: string, password: string) {
    const cacheKey = generateCacheKey({ resource: `auth:login:${email}` });

    const user = await UserModel.findOne({ email })
      .select(
        'password refresh_token role email first_name last_name avatar email_verified is_active',
      )
      .lean();
    if (!user) throw createError.Unauthorized('User not found');
    const match = await comparePassword(password, user.password || '');
    if (!match) throw createError.Unauthorized('Invalid email or password');
    if (!user.email_verified)
      throw createError.Forbidden('Please verify your email to login');
    if (!user.is_active)
      throw createError.Forbidden('User account is deactivated.');

    const accessPayload: IJwtPayload = {
      _id: user._id.toString(),
      role: user.role,
    };
    const refreshPayload: IJwtPayload = {
      _id: user._id.toString(),
      role: user.role,
    };

    const access_token = generateToken(accessPayload, {
      secret: secret.jwt.accessTokenSecret,
      expiresIn: secret.jwt.accessTokenExpiresIn,
    });
    const refresh_token = generateToken(refreshPayload, {
      secret: secret.jwt.refreshTokenSecret,
      expiresIn: secret.jwt.refreshTokenExpiresIn,
    });

    await UserModel.findByIdAndUpdate(user._id, {
      refresh_token,
      last_login: new Date(),
    });

    const tanent = await TenantService.getByUserId(user._id.toString());

    await setCache(cacheKey, { last_login: Date.now() }, 60); // small ttl cache for rate limiting support

    return {
      access_token,
      refresh_token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar: user.avatar,
      },
      tenant: { _id: tanent._id, name: tanent.name },
    };
  }

  static async refresh(token: string) {
    const decoded = verifyToken(token, secret.jwt.refreshTokenSecret);
    const user = await UserModel.findById(decoded._id)
      .select('role email refresh_token')
      .lean();

    if (!user)
      throw createError.Unauthorized('User associated with token not found');

    const access_token = generateToken(
      {
        _id: decoded._id,
        role: user.role,
        loginCode: decoded.loginCode,
      },
      {
        secret: secret.jwt.accessTokenSecret,
        expiresIn: secret.jwt.accessTokenExpiresIn,
      },
    );
    return { access_token };
  }

  static async logout(userId: string) {
    // Invalidate possible auth caches
    await deleteCache(generateCacheKey({ resource: 'me', query: { userId } }));
    return { success: true };
  }

  static async me(userId: string, fields?: string) {
    const cacheKey = generateCacheKey({
      resource: 'me',
      query: { userId, fields },
    });
    const cached = await getCache<Record<string, unknown>>(cacheKey);

    if (cached) return cached;

    // Build selection string
    let selectFields = '-password -refresh_token';
    if (fields) {
      // Parse comma-separated fields and add them to selection
      const requestedFields = fields
        .split(',')
        .map((f) => f.trim())
        .filter((f) => f);
      // Filter out sensitive fields that should never be returned
      const allowedFields = requestedFields.filter(
        (f) => f !== 'password' && f !== 'refresh_token',
      );

      if (allowedFields.length > 0) {
        selectFields = allowedFields.join(' ');
      }
    }

    const user = await UserModel.findById(userId).select(selectFields).lean();
    if (!user) throw createError.NotFound('User not found');

    const tenant = await TenantService.getByUserId(userId);

    await setCache(cacheKey, user);
    return { ...user, tenant: { _id: tenant._id, name: tenant.name } };
  }

  static async updateMe(
    userId: string,
    data: Record<string, string | number | boolean>,
  ) {
    const user = await UserModel.findById(userId).select('avatar').lean();
    if (!user) throw createError.NotFound('User not found');

    const updatedUser = await UserModel.findByIdAndUpdate(userId, data, {
      new: true,
    })
      .select('-password -refresh_token -createdAt -updatedAt')
      .lean();

    if (data.avatar && user.avatar) {
      removeImage(user.avatar);
    }

    await deleteCache(generateCacheKey({ resource: 'me', query: { userId } }));
    return updatedUser;
  }

  static async changeMyPassword(
    userId: string,
    old_password: string,
    new_password: string,
  ) {
    const user = await UserModel.findById(userId).select('+password');
    if (!user || !user.password) throw createError.NotFound('User not found');
    const match = await comparePassword(old_password, user.password);
    if (!match) throw createError.Unauthorized('Old password incorrect');
    user.password = await hashPassword(new_password);
    await user.save();
    await deleteCache(generateCacheKey({ resource: 'me', query: { userId } }));
    return { _id: user._id };
  }

  static async activateAccount(token: string) {
    try {
      const decoded = verifyToken(
        token,
        secret.jwt.accountActivationTokenSecret,
      );

      const user = await UserModel.findById(decoded._id);
      if (!user) throw createError.NotFound('User not found');

      if (user.email_verified)
        throw createError.Conflict('Account already activated');

      user.email_verified = true;
      await user.save();

      await deleteCache(
        generateCacheKey({ resource: 'me', query: { userId: decoded._id } }),
      );

      return { _id: user._id, message: 'Account activated successfully' };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('jwt')) {
          throw createError.Unauthorized('Invalid or expired activation token');
        }
      }
      throw error;
    }
  }

  static async resendActivationLink(email: string) {
    const user = await UserModel.findOne({ email }).lean();
    if (!user) throw createError.NotFound('User not found');

    if (user.email_verified)
      throw createError.Conflict('Account is already activated');

    const activationToken = generateToken(
      {
        _id: user._id.toString(),
        role: user.role,
        email: user.email,
      },
      {
        secret: secret.jwt.accountActivationTokenSecret,
        expiresIn: secret.jwt.accountActivationTokenExpiresIn,
      },
    );

    try {
      await accountActivationMail({
        to: email,
        name: `${user.first_name} ${user.last_name}`,
        activationToken,
      });
    } catch (error) {
      logger.error('Error sending activation email:', error);
      throw createError.InternalServerError('Failed to send activation email');
    }

    return { message: 'Activation link sent to your email' };
  }
}
