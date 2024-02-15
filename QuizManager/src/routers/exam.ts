import express from "express";
import { startExam, submitExam } from "../controllers/exam";
import { isAuthenticated } from "../middlewares/isAuth";

const router = express.Router();

router.get("/:quizId", isAuthenticated, startExam);

router.post("/", isAuthenticated, submitExam);

export default router;
