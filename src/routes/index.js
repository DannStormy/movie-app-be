import { Router } from "express";
import userRouter from "./user_route";
import publicRouter from "./public_route";

const router = Router();

router.use('/titles', publicRouter);
router.use('/user', userRouter);
router.use((req, res) => res.status(404).json({
    status: 'error',
    code: 404,
    label: 'NOT_FOUND',
    message: 'Route not found',
}));

router.use((req, res) => res.status(500).json({
    status: 'error',
    code: 500,
    label: 'INTERNAL_SERVER_ERROR',
    message: 'Server error, please try again later',
}));
export default router;

