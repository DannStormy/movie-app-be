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

const { registerSchema, loginSchema, resetPasswordSchema, passwordReset } =
  schema;
const { validate } = AuthMiddleware;
const { checkUserDetails, checkUserExists, checkResetPasswordString } =
  UserMiddleware;

router.post("/register", validate(registerSchema), checkUserExists, register);
router.post("/login", validate(loginSchema), checkUserDetails, login);
router.post("/forgotpassword", validate(resetPasswordSchema), forgotPassword);
router.post(
  "/resetpassword/:email/:resetString",
  validate(passwordReset),
  checkResetPasswordString,
  resetPassword
);

export default router;
