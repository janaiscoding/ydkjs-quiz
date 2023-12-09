import { body } from "express-validator";

const answer_validator = [
  body("answer", "Answer content must be present")
    .trim()
    .isLength({ min: 5, max: 5000 })
    .withMessage("Answer content must be between 5 and 5000 characters"),
  body("isCorrect", "isCorrect boolean must be present").isBoolean(),
];

export { answer_validator };
