import { Router } from "express";
import userRouter from "./user_route";
import publicRouter from "./public_route";

const router = Router();

router.use('/titles', publicRouter);
router.use('/user', userRouter);

export default router;

