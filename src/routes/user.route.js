import { Router } from "express";
import * as userControllers from "../controllers/user.controller.js";
import UserMiddleware from "../middlewares/user.middleware.js";
import AuthMiddleware from "../middlewares/auth.middleware";
import schema from "../validations/schema.js";

const router = Router();

const { validate } = AuthMiddleware;

router.post(
  "/register",
  validate(schema.registerSchema),
  UserMiddleware.emailExists,
  userControllers.register
);

router.put(
  "/verify-email/:emailToken",
  UserMiddleware.validateEmailVerificationToken,
  userControllers.verifyEmail
);

router.post(
  "/regenerate-email-token",
  validate(schema.checkEmailSchema),
  UserMiddleware.emailDoesNotExist,
  userControllers.regenerateEmailVerificationToken
);

router.post(
  "/login",
  validate(schema.loginSchema),
  [
    UserMiddleware.emailDoesNotExist,
    UserMiddleware.validateUserAccount,
    UserMiddleware.validateUserPassword,
  ],
  userControllers.login
);

router.post(
  "/forgotpassword",
  validate(schema.checkEmailSchema),
  UserMiddleware.emailDoesNotExist,
  userControllers.forgotPassword
);

router.put(
  "/resetpassword/:resetPasswordToken",
  validate(schema.passwordReset),
  UserMiddleware.validateResetPasswordToken,
  userControllers.resetPassword
);

export default router;
