import { Router } from "express";
import {
  fetchMovies,
  fetchMovieByID,
  updateMovieRating,
  addNewMovie,
  deleteMovie,
} from "../controllers/movie.controller";
import AccessControlMiddleware from "../middlewares/accessControl";
import UserMiddleware from "../middlewares/user.js";
import schema from "../validations/schema.js";

const { isBiUser, isActive } = AccessControlMiddleware;
const { validate, authenticate } = UserMiddleware;
const { addMovieSchema } = schema;

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
router.delete("/delete/:id", [authenticate, isBiUser], deleteMovie);

export default router;
