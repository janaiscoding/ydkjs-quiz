import { body } from "express-validator";

const quiz_validator = [
  body("title", "Quiz title must be present")
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage("Quiz title must be between 5 and 50 characters"),
];

export { quiz_validator };
