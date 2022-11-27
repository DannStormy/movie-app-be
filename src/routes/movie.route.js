import { Router } from "express";
import {
  fetchMovies,
  fetchMovieByID,
  updateMovieRating,
} from "../controllers/movie.controller";
import { addNewMovie } from "../controllers/super.controller.js";

import AccessControlMiddleware from "../middlewares/accessControl";
import UserMiddleware from "../middlewares/user.js";
import schema from "../validations/schema.js";

const { isTriUser, isBiUser, isActive } = AccessControlMiddleware;
const { validate, authenticate } = UserMiddleware;
const { addMovieSchema } = schema;

const router = Router();

router.get("/", fetchMovies);
router.get("/:id", fetchMovieByID);
router.put("/rating", [authenticate, isTriUser, isActive], updateMovieRating);
router.post(
  "/add-movie",
  validate(addMovieSchema),
  [authenticate, isBiUser],
  addNewMovie
);

export default router;
