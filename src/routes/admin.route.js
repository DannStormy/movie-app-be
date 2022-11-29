import { Router } from "express";
import adminLogin from "../controllers/admin.controller";
import AdminMiddleware from "../middlewares/admin.middleware";
import UserMiddleware from "../middlewares/user.js";
import schema from "../validations/schema.js";

const router = Router();
const { validate } = UserMiddleware;
const { checkDetails } = AdminMiddleware;
const { loginSchema } = schema;

router.post("/login", validate(loginSchema), checkDetails, adminLogin);

export default router;
