import { Router } from "express";

import query_validation_middleware from "../middleware/validation.middleware";
import { answer_validator } from "../validators/answer.validator";
import {
  get_answers,
  update_answer,
  delete_answer,
} from "../controllers/answers.controller";

const router = Router();

router.get("/", get_answers);

// updates one answer
router.put(
  "/:id",
  answer_validator,
  query_validation_middleware,
  update_answer
);

// deletes one answer
router.delete("/:id", delete_answer);

export default router;
