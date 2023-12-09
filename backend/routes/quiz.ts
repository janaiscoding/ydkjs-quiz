import express, { Request, Response } from "express";
const router = express.Router();
import { get_quizzes, create_quiz } from "../controllers/quizControllers";

router.get("/", get_quizzes);
router.post("/", create_quiz);
export default router;
