import { body } from "express-validator";

const score_validator = [
  body("user_id", "User id must be present").trim().exists(),
  body("quiz_id", "Quiz id must be present").trim().exists(),
  body("score", "Score must be present and a positive number").isInt({
    min: 0,
  }),
];

export { score_validator };
