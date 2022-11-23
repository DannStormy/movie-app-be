import { Router } from "express";
import { fetchMovies, fetchMoviesPagination } from "../controllers/public";

const router = Router();


router.get('/all', fetchMovies)
router.get('/all/:page', fetchMoviesPagination);

export default router;