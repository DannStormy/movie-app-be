import { Router } from "express";
import { fetchMovies } from "../controllers/movie";

const router = Router();

router.get("/", fetchMovies);

export default router;
