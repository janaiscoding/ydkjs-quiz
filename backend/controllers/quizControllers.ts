import { Request, Response } from "express";

import { body, validationResult } from "express-validator";
import validator from "validator";

import Quiz from "../models/quiz";

const get_quizzes = async (req: Request, res: Response) => {
  try {
    const quizzes = await Quiz.find({});
    if (quizzes) {
      return res.status(200).json({ quizzes });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const create_quiz = [
  body("title", "Quiz title must be present")
    .trim()
    .isLength({ min: 1 })
    .isLength({ max: 50 }),
  async (req: Request, res: Response) => {
    const { title } = req.body;

    const validationErrors = validationResult(req);
    if (validationErrors) {
      return res.status(400).json({
        message: "Validation errors",
        errors: validationErrors.array(),
      });
    }

    try {
      const newQuiz = new Quiz({
        title,
      });
      await newQuiz.save();

      return res.status(201).json({ message: "New quiz created" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
];

export { get_quizzes, create_quiz };
