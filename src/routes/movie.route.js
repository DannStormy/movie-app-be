import { Router } from "express";
import {
  fetchMovies,
  fetchMovieByID,
  updateMovieRating,
} from "../controllers/movie.controller";

import AccessControlMiddleware from "../middlewares/accessControl";
import UserMiddleware from "../middlewares/user.js";

const { isTriUser } = AccessControlMiddleware;
const { authenticate } = UserMiddleware;
const router = Router();

router.get("/", fetchMovies);
router.get("/:id", fetchMovieByID);
router.put("/rating", [authenticate, isTriUser], updateMovieRating);

export default router;
