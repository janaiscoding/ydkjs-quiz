import { Router } from "express";
import { createQuizValidator } from "../validators/quiz.validator";

import {
  get_quizzes,
  create_quiz,
  get_quiz,
} from "../controllers/quiz.controller";
import queryValidationMiddleware from "../middleware/validation.middleware";

const router = Router();

router.get("/", get_quizzes);
router.post("/", createQuizValidator, queryValidationMiddleware, create_quiz);

router.get("/:id", get_quiz);

export default router;
