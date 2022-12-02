import { Router } from "express";
import * as superControllers from "../controllers/super.controller.js";
import AccessControlMiddleware from "../middlewares/accessControl";
import SuperMiddleware from "../middlewares/super.middleware";
import AuthMiddleware from "../middlewares/auth.middleware";
import schema from "../validations/schema.js";

const router = Router();

const { isSuper } = AccessControlMiddleware;
const { loginSchema, createAdminSchema, changeStatusSchema } = schema;
const { checkDetails, checkAdminExists } = SuperMiddleware;
const { authenticate, validate } = AuthMiddleware;

router.post(
  "/login",
  validate(loginSchema),
  checkDetails,
  superControllers.superLogin
);
router.use(authenticate);
router.use(isSuper);
router.get("/users", superControllers.fetchUsers);
router.post(
  "/create-admin",
  validate(createAdminSchema),
  checkAdminExists,
  superControllers.createNewAdmin
);
router.put(
  "/setuserstate",
  validate(changeStatusSchema),
  superControllers.changeUserStatus
);
router.put(
  "/setadminstate",
  validate(changeStatusSchema),
  superControllers.changeAdminStatus
);

export default router;
