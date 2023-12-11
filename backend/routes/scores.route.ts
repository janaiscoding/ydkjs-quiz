import { Router } from "express";
import { get_quiz_scores, get_scores, get_user_scores } from "../controllers/scores.controller";

const router = Router();

// get all scores
router.get("/", get_scores);

// get all scores for a quiz
router.get("/quiz/:id", get_quiz_scores);

// get all scores for a user
router.get("/user/:id", get_user_scores);

export default router;
