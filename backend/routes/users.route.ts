import express from "express";
import passport from "passport";
import {
  get_profile,
  create_history,
  update_history,
} from "../controllers/user.controller";

import {
  history_validator,
  update_history_validator,
} from "../validators/history.validator";
import query_validation_middleware from "../middleware/validation.middleware";

const protect_route = passport.authenticate("jwt", { session: false });

const router = express.Router();

// Get a profile, will retrieve user history
router.get("/:id", get_profile);

// Adds a new history for a new quiz solved.
router.post(
  "/:id",
  protect_route,
  history_validator,
  query_validation_middleware,
  create_history
);

// Updates an existing history with a new score
router.put(
  "/:id",
  protect_route,
  update_history_validator,
  query_validation_middleware,
  update_history
);

export default router;
