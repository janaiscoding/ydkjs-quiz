import { Router } from "express";

import {
  get_question,
  create_answer,
} from "../controllers/question.controller";

import query_validation_middleware from "../middleware/validation.middleware";
import { answer_validator } from "../validators/answer.validator";

const router = Router();

// gets one question
router.get("/:id", get_question);

router.post(
  "/:id",
  answer_validator,
  query_validation_middleware,
  create_answer
);

export default router;
