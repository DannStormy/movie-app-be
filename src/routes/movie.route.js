import { Router } from "express";
import * as movieControllers from "../controllers/movie.controller";
import AccessControlMiddleware from "../middlewares/accessControl";
import AuthMiddleware from "../middlewares/auth.middleware";
import schema from "../validations/schema.js";

const { isBiUser, isUser, isSuper } = AccessControlMiddleware;
const { validate, authenticate } = AuthMiddleware;

const router = Router();

router.get("/reviews", movieControllers.fetchAllReviews);
router.get("/reviews/:movieId", movieControllers.fetchReviewsById);
router.get("/", movieControllers.fetchMovies);
router.get("/:movieId", movieControllers.fetchMovieByID);

router.use(authenticate);
router.put(
  "/title/:movieId",
  validate(schema.editTitleSchema),
  isSuper,
  movieControllers.titleEdit
);
router.post(
  "/reviews",
  validate(schema.reviewMovieSchema),
  isUser,
  movieControllers.movieReview
);
router.post(
  "/rating",
  validate(schema.ratingSchema),
  isUser,
  movieControllers.movieRating
);
router.use(isBiUser);
router.post("/", validate(schema.addMovieSchema), movieControllers.addNewMovie);
router.put(
  "/rating/:movieId",
  validate(schema.editRatingSchema),
  movieControllers.ratingEdit
);
router.put(
  "/reviews/:movieId",
  validate(schema.editReviewSchema),
  movieControllers.reviewEdit
);
router.delete("/:movieId", movieControllers.deleteMovie);

export default router;
