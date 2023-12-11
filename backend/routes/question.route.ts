import { Router } from "express";
import passport from "passport";
import {
  get_question,
  create_answer,
  get_questions,
  update_question,
  delete_question,
  update_parent_quiz,
} from "../controllers/question.controller";

import query_validation_middleware from "../middleware/validation.middleware";
import { answer_validator } from "../validators/answer.validator";
import {
  question_validator,
  question_parent_validator,
} from "../validators/question.validator";

const protect_route = passport.authenticate("jwt", { session: false });
const router = Router();

router.get("/", get_questions);
// gets one question
router.get("/:id", get_question);

// adds a new answer to a question
router.post(
  "/:id",
  protect_route,
  answer_validator,
  query_validation_middleware,
  create_answer
);

// updates one question's title
router.put(
  "/:id",
  protect_route,
  question_validator,
  query_validation_middleware,
  update_question
);

// updates one question's parent quiz
router.put(
  "/:id/quiz",
  protect_route,
  question_parent_validator,
  query_validation_middleware,
  update_parent_quiz
);

// deletes one question
router.delete("/:id", protect_route, delete_question);

export default router;
