import { body } from "express-validator";

const question_validator = [
  body("title", "Quiz question title must be present")
    .trim()
    .isLength({ min: 5, max: 5000 })
    .withMessage("Quiz question title must be between 5 and 5000 characters"),
];

export { question_validator };
