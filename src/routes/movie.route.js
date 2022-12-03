import { Router } from "express";
import * as movieControllers from "../controllers/movie.controller";
import AccessControlMiddleware from "../middlewares/accessControl";
import AuthMiddleware from "../middlewares/auth.middleware";
import schema from "../validations/schema.js";

const { isBiUser, isUser, isSuper } = AccessControlMiddleware;
const { validate, authenticate } = AuthMiddleware;

const router = Router();

router.get("/reviews", movieControllers.fetchAllReviews); // move to admin
router.get("/reviews/:movieId", movieControllers.fetchReviewsById); // move this to the get one movie service
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
router.post( // merge review and rating
  "/rating",
  validate(schema.ratingSchema),
  isUser,
  movieControllers.movieRating
);
//biuser not needed
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
router.delete("/:movieId", movieControllers.deleteMovie); // make this a soft-delete

export default router;

/**
 * have global responses
 * 1. success => should take in res, message, data, status code(optional) but initialized to 200
 * 2. error => should take in res, message, status code(optional) but initialized to 400
*/
