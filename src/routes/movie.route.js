import { Router } from "express";
import {
  fetchMovies,
  searchMovies,
} from "../controllers/movie";

const router = Router();

router.get("/", fetchMovies);
router.get("/search", searchMovies);  // get search by title, genre, year etc

// router.get("/", fetchMovies);  // get all
// router.get("/search", fetchMovies);  // get search by title, genre, year etc


export default router;
