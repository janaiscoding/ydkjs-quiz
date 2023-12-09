import { Request, Response } from "express";

import { body, validationResult } from "express-validator";
import validator from "validator";
import asyncHandler from "express-async-handler";

import Quiz from "../models/quiz";
import Question from "../models/question";

const get_quizzes = async (req: Request, res: Response) => {
  const quizzes = await Quiz.find();
  return res.status(200).json({ quizzes });
};

const create_quiz = [
  body("title", "Quiz title must be present")
    .trim()
    .isLength({ min: 1 })
    .isLength({ max: 50 }),
  async (req: Request, res: Response) => {
    const { title } = req.body;

    const validationErrors = validationResult(req);
    console.log(validationErrors);
    if (!validationErrors.isEmpty()) {
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

const get_quiz = async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (quiz) {
      return res.status(200).json({ quiz });
    } else {
      return res.status(404).json({ message: "Quiz was not found" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const add_question = async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    const question = new Question({
      title,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
export { get_quizzes, create_quiz, get_quiz };
