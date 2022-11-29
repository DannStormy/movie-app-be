import { Router } from "express";
import {
  fetchMovies,
  fetchMovieByID,
  updateMovieRating,
  addNewMovie,
  deleteMovie,
  movieReview,
} from "../controllers/movie.controller";
import AccessControlMiddleware from "../middlewares/accessControl";
import AuthMiddleware from "../middlewares/auth.middleware";
import schema from "../validations/schema.js";

const { isBiUser, isUser, isActive } = AccessControlMiddleware;
const { validate, authenticate } = AuthMiddleware;
const { addMovieSchema, reviewMovieSchema } = schema;

const router = Router();

router.get("/", fetchMovies);
router.get("/:id", fetchMovieByID);
router.put("/rating", [authenticate, isActive], updateMovieRating);
router.post(
  "/add-movie",
  validate(addMovieSchema),
  [authenticate, isBiUser],
  addNewMovie
);
router.post(
  "/review-movie",
  validate(reviewMovieSchema),
  [authenticate, isUser],
  movieReview
);
router.delete("/delete/:id", [authenticate, isBiUser], deleteMovie);

export default router;
