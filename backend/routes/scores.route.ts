import { Router } from "express";
import passport from "passport";
import {
  get_quiz_scores,
  get_scores,
  create_score,
  get_user_scores,
} from "../controllers/scores.controller";

import query_validation_middleware from "../middleware/validation.middleware";
import { score_validator } from "../validators/score.validator";

const protect_route = passport.authenticate("jwt", { session: false });

const router = Router();

// get all scores
router.get("/", get_scores);
// create a new score

router.post(
  "/",
  protect_route,
  score_validator,
  query_validation_middleware,
  create_score
);

// get all scores for a quiz
router.get("/quiz/:id", get_quiz_scores);

// get all scores for a user
router.get("/user/:id", get_user_scores);

export default router;
