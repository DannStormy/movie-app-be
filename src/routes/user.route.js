import { Router } from "express";
import { register, login, resetPassword } from "../controllers/user.js";
import UserMiddleware from "../middlewares/user.middleware.js";
import AuthMiddleware from "../middlewares/auth.middleware";
import schema from "../validations/schema.js";

const router = Router();

const { registerSchema, loginSchema, resetPasswordSchema } = schema;
const { validate } = AuthMiddleware;
const { checkUserDetails, checkUserExists } = UserMiddleware;

router.post("/register", validate(registerSchema), checkUserExists, register);
router.post("/login", validate(loginSchema), checkUserDetails, login);
router.post("/forgotpassword", validate(resetPasswordSchema), resetPassword);

export default router;
