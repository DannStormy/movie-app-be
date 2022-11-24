import { Router } from "express";
import { register, login } from "../controllers/user.js";
import UserMiddleware from "../middlewares/user.js";
import userSchema from "../validations/userSchema.js";

const router = Router();

const {registerSchema, loginSchema} = userSchema;
const { validate, checkUserExists, checkUserDetails } = UserMiddleware;

router.post('/register', validate(registerSchema), checkUserExists, register); 
router.post('/login', validate(loginSchema), checkUserDetails, login);

export default router;