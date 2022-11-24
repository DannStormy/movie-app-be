import { Router } from "express";
import {
  fetchMovies,
  fetchMoviesPagination,
  fetchMovieTitle,
  fetchMovieRating,
  fetchMovieGenre,
  fetchMovieYear
} from "../controllers/movie";

const router = Router();

router.get("/", fetchMovies);
// router.get("/", fetchMoviesPagination);
// router.get("/title/", fetchMovieTitle);
// router.get("/rating/:rating", fetchMovieRating);
// router.get("/genre/", fetchMovieGenre);
// router.get("/year/:year", fetchMovieYear);

// router.get("/", fetchMovies);  // get all
// router.get("/:movieId", fetchMovies);  // get one
// router.get("/search", fetchMovies);  // get search by title, genre, year etc


export default router;
