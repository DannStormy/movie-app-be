import { Router } from "express";
import {
  fetchMovies,
  fetchMoviesPagination,
  fetchMovieTitle,
  fetchMovieRating,
  fetchMovieGenre,
  fetchMovieYear
} from "../controllers/public";

const router = Router();

router.get("/all", fetchMovies);
router.get("/all/:page", fetchMoviesPagination);
router.get("/title/", fetchMovieTitle);
router.get("/rating/:rating", fetchMovieRating);
router.get("/genre/", fetchMovieGenre);
router.get("/year/:year", fetchMovieYear);

export default router;
