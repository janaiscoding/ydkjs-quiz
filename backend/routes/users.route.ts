import express from "express";
import {
  get_profile,
  create_history,
  update_history,
} from "../controllers/user.controller";

import { history_validator } from "../validators/history.validator";
import query_validation_middleware from "../middleware/validation.middleware";

const router = express.Router();

router.get("/:id", get_profile);

router.post(
  "/:id",
  history_validator,
  query_validation_middleware,
  create_history
);

router.put(
  "/:id",
  history_validator,
  query_validation_middleware,
  update_history
);

export default router;
