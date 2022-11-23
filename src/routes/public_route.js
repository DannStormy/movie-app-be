import { Router } from "express";
import { fetchMovies, fetchMoviesPagination, fetchMovieTitle } from "../controllers/public";

const router = Router();


router.get('/all', fetchMovies)
router.get('/all/:page', fetchMoviesPagination);
router.get('/', fetchMovieTitle);
// GET /notes?offset=100&limit=50

export default router;