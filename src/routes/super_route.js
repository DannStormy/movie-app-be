import { Router } from "express";
import {
  superLogin,
  fetchUsers,
  createNewAdmin,
  addNewMovie,
} from "../controllers/super.controller.js";
import AccessControlMiddleware from "../middlewares/accessControl";
import SuperMiddleware from "../middlewares/super.middleware";
import UserMiddleware from "../middlewares/user.js";

import schema from "../validations/schema.js";

const router = Router();

const { isSuper } = AccessControlMiddleware;
const { loginSchema, createAdminSchema, addMovieSchema } = schema;
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
router.post(
  "/add-movie",
  validate(addMovieSchema),
  [authenticate, isSuper],
  addNewMovie
);

export default router;
