import { Router } from "express";
import passport from "passport";
import query_validation_middleware from "../middleware/validation.middleware";
import { question_validator } from "../validators/question.validator";
import { quiz_validator } from "../validators/quiz.validator";

import {
  get_quizzes,
  create_quiz,
  get_quiz,
  create_question,
  delete_quiz,
  update_quiz,
} from "../controllers/quiz.controller";

const router = Router();

const protect_route = passport.authenticate("jwt", { session: false });

// get all quizzes
router.get("/", get_quizzes);

// create a new, empty quiz
router.post(
  "/",
  protect_route,
  quiz_validator,
  query_validation_middleware,
  create_quiz
);

// get a specific quiz
router.get("/:id", get_quiz);

// create a new, empty question
router.post(
  "/:id",
  protect_route,
  question_validator,
  query_validation_middleware,
  create_question
);

// update an existing quiz
router.put(
  "/:id",
  protect_route,
  quiz_validator,
  query_validation_middleware,
  update_quiz
);

// delete an existing quiz
router.delete("/:id", protect_route, delete_quiz);

export default router;
