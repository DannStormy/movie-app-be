import { Router } from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
} from "../controllers/user.controller.js";
import UserMiddleware from "../middlewares/user.middleware.js";
import AuthMiddleware from "../middlewares/auth.middleware";
import schema from "../validations/schema.js";

const router = Router();

const { validate } = AuthMiddleware;
const { checkUserDetails, checkUserExists, checkResetPasswordString } =
  UserMiddleware;

router.post(
  "/register",
  validate(schema.registerSchema),
  checkUserExists,
  register
);

router.post("/login", validate(schema.loginSchema), checkUserDetails, login);

router.post(
  "/forgotpassword",
  validate(schema.resetPasswordSchema),
  checkUserExists,
  forgotPassword
);

router.post(
  "/resetpassword/:email/:resetString",
  validate(schema.passwordReset),
  checkResetPasswordString,
  resetPassword
);

export default router;
