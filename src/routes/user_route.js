import { Router } from "express";
import { register, login } from "../controllers/user.js";
import UserMiddleware from "../middlewares/user.js";

const router = Router();

const { checkRegister, checkUserExists, checkLogin, checkUserDetails } = UserMiddleware

router.post('/register', checkRegister, checkUserExists, register);
router.post('/login', checkLogin, checkUserDetails, login);

export default router;