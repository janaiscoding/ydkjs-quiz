import { Router } from "express";

import query_validation_middleware from "../middleware/validation.middleware";
import { answer_validator } from "../validators/answer.validator";
import {
  delete_answer,
  update_answer,
} from "../controllers/answers.controller";

const router = Router();

// updates one answer
router.put("/:id", update_answer);

// deletes one answer
router.delete("/:id", delete_answer);

export default router;
