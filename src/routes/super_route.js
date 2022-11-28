import { Router } from "express";
import {
  superLogin,
  fetchUsers,
  createNewAdmin,
  changeUserStatus,
} from "../controllers/super.controller.js";
import AccessControlMiddleware from "../middlewares/accessControl";
import SuperMiddleware from "../middlewares/super.middleware";
import UserMiddleware from "../middlewares/user.js";
import schema from "../validations/schema.js";

const router = Router();

const { isSuper } = AccessControlMiddleware;
const { loginSchema, createAdminSchema, changeStatusSchema } = schema;
const { checkDetails, checkAdminExists } = SuperMiddleware;
const { authenticate, validate } = UserMiddleware;

router.get("/users", [authenticate, isSuper], fetchUsers);
router.post("/login", validate(loginSchema), checkDetails, superLogin);
router.post(
  "/create-admin",
  validate(createAdminSchema),
  checkAdminExists,
  [authenticate, isSuper],
  createNewAdmin
);
router.put(
  "/setuserstate",
  validate(changeStatusSchema),
  [authenticate, isSuper],
  changeUserStatus
);

export default router;
