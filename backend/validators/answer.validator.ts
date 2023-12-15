import { body } from "express-validator";

const answer_validator = [
  body("answer", "Answer content must be present")
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage("Answer content must be between 1 and 500 characters"),
  body("isCorrect", "isCorrect boolean must be present").isBoolean(),
];

export { answer_validator };
