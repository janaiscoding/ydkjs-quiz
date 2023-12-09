import { Router } from "express";
import query_validation_middleware from "../middleware/validation.middleware";
import { question_validator } from "../validators/question.validator";
import { quiz_validator } from "../validators/quiz.validator";

import {
  get_quizzes,
  create_quiz,
  get_quiz,
  create_question,
} from "../controllers/quiz.controller";


const router = Router();

// get all quizzes
router.get("/", get_quizzes);

// create a new, empty quiz
router.post("/", quiz_validator, query_validation_middleware, create_quiz);

// get a specific quiz
router.get("/:id", get_quiz);

// create a new, empty question
router.post(
  "/:id",
  question_validator,
  query_validation_middleware,
  create_question
);

export default router;
