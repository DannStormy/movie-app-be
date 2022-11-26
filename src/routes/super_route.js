import { Router } from "express";
import { superLogin, fetchUsers } from "../controllers/super.controller.js";
import AccessControlMiddleware from "../middlewares/accessControl";
import SuperMiddleware from "../middlewares/super.middleware";
import UserMiddleware from "../middlewares/user.js";

import schema from "../validations/schema.js";

const router = Router();

const { isSuper } = AccessControlMiddleware;
const { loginSchema } = schema;
const { checkDetails } = SuperMiddleware;
const { authenticate, validate } = UserMiddleware;

router.get("/users", [authenticate, isSuper], fetchUsers);
router.post("/login", validate(loginSchema), checkDetails, superLogin);

export default router;
