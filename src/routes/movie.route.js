import { Router } from "express";
import {
  fetchMovies,
  fetchMovieByID,
  updateMovieRating,
  addNewMovie,
  deleteMovie,
  movieReview,
  ratingEdit,
  titleEdit,
  reviewEdit,
} from "../controllers/movie.controller";
import AccessControlMiddleware from "../middlewares/accessControl";
import AuthMiddleware from "../middlewares/auth.middleware";
import schema from "../validations/schema.js";

const { isBiUser, isUser, isSuper, isActive } = AccessControlMiddleware;
const { validate, authenticate } = AuthMiddleware;
const {
  addMovieSchema,
  reviewMovieSchema,
  editTitleSchema,
  editRatingSchema,
  editReviewSchema,
} = schema;

const router = Router();

router.get("/", fetchMovies);
router.get("/:id", fetchMovieByID);
router.put("/rating", [authenticate, isActive], updateMovieRating);
router.post(
  "/add-movie",
  validate(addMovieSchema),
  [authenticate, isBiUser, isActive],
  addNewMovie
);
router.post(
  "/review-movie",
  validate(reviewMovieSchema),
  [authenticate, isUser],
  movieReview
);
router.patch(
  "/edit-title/:id",
  validate(editTitleSchema),
  [authenticate, isSuper],
  titleEdit
);
router.patch(
  "/edit-review/:id",
  validate(editReviewSchema),
  [authenticate, isBiUser],
  reviewEdit
);
router.patch(
  "/edit-rating/:id",
  validate(editRatingSchema),
  [authenticate, isBiUser],
  ratingEdit
);
router.delete("/delete/:id", [authenticate, isBiUser, isActive], deleteMovie);

export default router;
