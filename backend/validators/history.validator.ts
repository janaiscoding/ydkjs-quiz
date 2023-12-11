import { body } from "express-validator";

const history_validator = [
  body("quiz_id", "Quiz id must be present").trim().exists(),
  body("score", "Score must be present and a positive number").isInt({
    min: 0,
  }),
];
const update_history_validator = [
  body("quiz_id", "Quiz id must be present").trim().exists(),
  body("newScore", "Score must be present and a positive number").isInt({
    min: 0,
  }),
];
export { history_validator, update_history_validator };
