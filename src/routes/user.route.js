import { Router } from "express";
import {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  regenerateEmailVerificationToken,
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
  "/verify-email/:emailToken",
  UserMiddleware.validateEmailVerificationToken,
  verifyEmail
);

router.put(
  "/regenerate-email-token",
  validate(schema.checkEmailSchema),
  UserMiddleware.emailDoesNotExist,
  regenerateEmailVerificationToken
);

router.post(
  "/login",
  validate(schema.loginSchema),
  UserMiddleware.emailDoesNotExist,
  UserMiddleware.validateUserActive,
  UserMiddleware.validateUserEmail,
  UserMiddleware.validateUserPassword,
  login
);

router.post(
  "/forgotpassword",
  validate(schema.checkEmailSchema),
  emailDoesNotExist,
  forgotPassword
);

router.post(
  "/resetpassword/:resetPasswordToken",
  validate(schema.passwordReset),
  validateResetPasswordToken,
  resetPassword
);

export default router;
