import { Router } from "express";
import * as adminControllers from "../controllers/admin.controller.js";
import AccessControlMiddleware from "../middlewares/accessControl";
import AdminMiddleware from "../middlewares/admin.middleware";
import AuthMiddleware from "../middlewares/auth.middleware";
import schema from "../utils/validations/schema.js";

const router = Router();
const { isSuper } = AccessControlMiddleware;
const { authenticate, validate } = AuthMiddleware;

router.post(
  "/login",
  validate(schema.loginSchema),
  [
    AdminMiddleware.emailDoesNotExist,
    AdminMiddleware.validateAdminActive,
    AdminMiddleware.validateAdminPassword,
  ],
  adminControllers.adminLogin
);

router.post(
  "/resetpassword/:resetPasswordToken",
  validate(schema.passwordReset),
  AdminMiddleware.validateResetPasswordToken,
  adminControllers.adminResetPassword
);

router.post(
  "/forgotpassword",
  validate(schema.checkEmailSchema),
  AdminMiddleware.emailDoesNotExist,
  adminControllers.forgotPassword
);

router.use([authenticate, isSuper]);
router.get("/users", adminControllers.fetchUsers);

router.post(
  "/create-admin",
  validate(schema.createAdminSchema),
  AdminMiddleware.checkAdminExists,
  adminControllers.createNewAdmin
);

router.put(
  "/accounts/user/:userId/toggle-status",
  validate(schema.changeStatusSchema),
  AdminMiddleware.checkUserAccount,
  adminControllers.changeUserStatus
);

router.put(
  "/accounts/:adminId/toggle-status",
  validate(schema.changeStatusSchema),
  AdminMiddleware.checkAdminAccount,
  adminControllers.changeAdminStatus
);

export default router;
