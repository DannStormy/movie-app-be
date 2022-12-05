import { Router } from "express";
import userRouter from "./user.route";
import movieRouter from "./movie.route";
import adminRouter from "./admin.route";
import { Response, apiMessage } from "../utils/helpers/constants";

const router = Router();

router.use("/movies", movieRouter);
router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use((req, res) =>
  Response.errorResponse(req, res, {
    status: 404,
    message: apiMessage.NOT_FOUND_API,
  })
);
router.use((req, res) =>
  Response.errorResponse(req, res, {
    status: 500,
    message: apiMessage.INTERNAL_SERVER_ERROR,
  })
);
export default router;
