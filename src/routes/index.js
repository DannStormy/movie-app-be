import { Router } from "express";
import userRouter from "./user.route";
import movieRouter from "./movie.route";
import adminRouter from "./admin.route";

const router = Router();

router.use("/movies", movieRouter);
router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use((req, res) =>
  res.status(404).json({
    status: "error",
    code: 404,
    label: "NOT_FOUND",
    message: "Route not found",
  })
);
router.use((req, res) =>
  res.status(500).json({
    status: "error",
    code: 500,
    label: "INTERNAL_SERVER_ERROR",
    message: "Server error, please try again later",
  })
);
export default router;
