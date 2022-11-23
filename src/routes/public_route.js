import { Router } from "express";
import { fetchMovies, fetchMoviesPagination, fetchMovieTitle, fetchMovieRating } from "../controllers/public";

const router = Router();


router.get('/all', fetchMovies)
router.get('/all/:page', fetchMoviesPagination);
router.get('/', fetchMovieTitle);
router.get('/:rating', fetchMovieRating);

export default router;