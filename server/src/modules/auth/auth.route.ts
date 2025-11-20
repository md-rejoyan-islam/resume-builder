import { Router } from 'express';
import validate from '../../middlewares/validate';
import { isLoggedIn, isLoggedOut } from '../../middlewares/verify';
import { avatarUpload } from '../../utils/multer';
import {
  activate,
  changeMyPassword,
  login,
  logout,
  me,
  refresh,
  register,
  resendActivationLink,
  updateMe,
} from './auth.controller';
import {
  activateAccountSchema,
  changeMyPasswordSchema,
  getMeSchema,
  loginSchema,
  refreshTokenSchema,
  registerSchema,
  resendActivationLinkSchema,
  updateMeSchema,
} from './auth.validation';

const router = Router();

router.post('/register', isLoggedOut, validate(registerSchema), register);
router.post('/login', isLoggedOut, validate(loginSchema), login);
router.post('/refresh', validate(refreshTokenSchema), refresh);
router.post('/logout', isLoggedIn, logout);
router.post(
  '/activate',
  isLoggedOut,
  validate(activateAccountSchema),
  activate,
);
router.post(
  '/resend-activation-link',
  isLoggedOut,
  validate(resendActivationLinkSchema),
  resendActivationLink,
);
router.get('/me', isLoggedIn, validate(getMeSchema), me);
router.put('/me', isLoggedIn, avatarUpload, validate(updateMeSchema), updateMe);
router.patch(
  '/me/password',
  isLoggedIn,
  validate(changeMyPasswordSchema),
  changeMyPassword,
);

export default router;
