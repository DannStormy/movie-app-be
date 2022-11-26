import { Router } from "express";
import { register, login } from "../controllers/user.js";
import UserMiddleware from "../middlewares/user.js";
import schema from "../validations/schema.js";

const router = Router();

const {registerSchema, loginSchema} = schema;
const { validate, checkUserExists, checkUserDetails } = UserMiddleware;

router.post('/register', validate(registerSchema), checkUserExists, register); 
router.post('/login', validate(loginSchema), checkUserDetails, login);

export default router;