import { Router } from "express";
import * as adminControllers from "../controllers/admin.controller.js";
import AccessControlMiddleware from "../middlewares/accessControl";
import AdminMiddleware from "../middlewares/admin.middleware";
import AuthMiddleware from "../middlewares/auth.middleware";
import schema from "../validations/schema.js";

const router = Router();

const { isSuper } = AccessControlMiddleware;
const { loginSchema, createAdminSchema, changeStatusSchema, passwordReset } =
  schema;
const { authenticate, validate } = AuthMiddleware;

router.post(
  "/login",
  validate(loginSchema),
  AdminMiddleware.checkDetails,
  adminControllers.adminLogin
);
router.post(
  "/resetpassword/:email/:resetString",
  validate(passwordReset),
  AdminMiddleware.checkResetPasswordString,
  adminControllers.adminResetPassword
);
router.use([authenticate, isSuper]);
router.get("/users", adminControllers.fetchUsers);
router.post(
  "/create-admin",
  validate(createAdminSchema),
  AdminMiddleware.checkAdminExists,
  adminControllers.createNewAdmin
);
router.put(
  "/accounts/user/:userId/toggle-status",
  validate(changeStatusSchema),
  AdminMiddleware.checkUserAccount,
  adminControllers.changeUserStatus
);
router.put(
  "/accounts/:adminId/toggle-status",
  validate(changeStatusSchema),
  AdminMiddleware.checkAdminAccount,
  adminControllers.changeAdminStatus
);

export default router;
