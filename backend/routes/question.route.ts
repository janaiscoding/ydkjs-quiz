import { Router } from "express";

import {
  get_question,
  create_answer,
  get_questions,
  update_question,
  delete_question,
} from "../controllers/question.controller";

import query_validation_middleware from "../middleware/validation.middleware";
import { answer_validator } from "../validators/answer.validator";
import { question_validator } from "../validators/question.validator";

const router = Router();

router.get("/", get_questions);
// gets one question
router.get("/:id", get_question);

// adds a new answer to a question
router.post(
  "/:id",
  answer_validator,
  query_validation_middleware,
  create_answer
);

// updates one question's title
router.put(
  "/:id",
  question_validator,
  query_validation_middleware,
  update_question
);

// deletes one question
router.delete("/:id", delete_question);

export default router;
