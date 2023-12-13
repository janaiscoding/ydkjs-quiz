import { body } from "express-validator";

const question_validator = [
  body("title", "Quiz question title must be present")
    // .isLength({ min: 5, max: 5000 })
    // .withMessage("Quiz question title must be between 5 and 5000 characters"),
];

const question_parent_validator = [
  body("parent_quiz", "Parent quiz id must be present").trim().exists(),
];

export { question_validator, question_parent_validator };
