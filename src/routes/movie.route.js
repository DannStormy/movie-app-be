import { Router } from "express";
import * as movieControllers from "../controllers/movie.controller";
import AccessControlMiddleware from "../middlewares/accessControl";
import AdminMiddleware from "../middlewares/admin.middleware";
import AuthMiddleware from "../middlewares/auth.middleware";
import UserMiddleware from "../middlewares/user.middleware";
import schema from "../validations/schema.js";

const { isAdmin, isUser, isSuper } = AccessControlMiddleware;
const { validate, authenticate } = AuthMiddleware;

const router = Router();

router.get("/", movieControllers.fetchMovies);
router.get("/:movieId", movieControllers.fetchMovieByID);

router.use(authenticate);

router.put(
  "/title/:movieId",
  validate(schema.editTitleSchema),
  isSuper,
  movieControllers.editTitle
);

router.get("/user/rating/", isUser, movieControllers.getUserMovieRatings);

router.post(
  "/rating/:movieId",
  validate(schema.ratingSchema),
  isUser,
  UserMiddleware.hasRated,
  movieControllers.rateMovie
);

router.put(
  "/rating/:movieId",
  validate(schema.editRatingSchema),
  isUser,
  movieControllers.editRating
);

router.use(isAdmin);

router.post("/", validate(schema.addMovieSchema), movieControllers.addNewMovie);

router.delete(
  "/:movieId",
  AdminMiddleware.checkIfMovieExists,
  movieControllers.deleteMovie
);

export default router;
