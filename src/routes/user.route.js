import { Router } from "express";
import {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  regenerateEmailVerificationToken,
  regeneratePasswordResetToken,
} from "../controllers/user.controller.js";
import UserMiddleware from "../middlewares/user.middleware.js";
import AuthMiddleware from "../middlewares/auth.middleware";
import schema from "../validations/schema.js";

const router = Router();

const { validate } = AuthMiddleware;
const { emailExists, validateResetPasswordToken, emailDoesNotExist } =
  UserMiddleware;

router.post(
  "/register",
  validate(schema.registerSchema),
  emailExists,
  register
);

router.put(
  "/verify-email",
  UserMiddleware.validateEmailVerificationToken,
  verifyEmail
);

router.put(
  "/regenerate-email-token",
  validate(schema.checkEmailSchema),
  UserMiddleware.emailDoesNotExist,
  regenerateEmailVerificationToken
);

router.put(
  "/regenerate-password-token",
  validate(schema.checkEmailSchema),
  UserMiddleware.emailDoesNotExist,
  regeneratePasswordResetToken
);

router.post(
  "/login",
  validate(schema.loginSchema),
  [
    UserMiddleware.emailDoesNotExist,
    UserMiddleware.validateUserActive,
    UserMiddleware.validateUserEmail,
    UserMiddleware.validateUserPassword,
  ],
  login
);

router.post(
  "/forgotpassword",
  validate(schema.checkEmailSchema),
  emailDoesNotExist,
  forgotPassword
);

router.post(
  "/resetpassword",
  validate(schema.passwordReset),
  validateResetPasswordToken,
  resetPassword,
  login
);

export default router;
