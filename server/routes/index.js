import { Router } from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import classRoutes from "./classRoutes.js";
import Feedback from "../controller/feedbackController.js";
const router = Router();

router.use("/feedback", Feedback);
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/classes", classRoutes);


export default router;
