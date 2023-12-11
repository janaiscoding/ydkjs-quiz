import { body } from "express-validator";

const history_validator = [
  body("quiz_id", "Quiz id must be present").trim(),
  body("correctQuestions").isArray(),
  body("incorrectQuestions").isArray(),
  body("bestScore", "Score must be present and a positive number").isInt({
    min: 0,
  }),
];

export { history_validator };
