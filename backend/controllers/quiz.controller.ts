import { NextFunction, Request, Response } from "express";

import { body, validationResult } from "express-validator";
import validator from "validator";
import asyncHandler from "express-async-handler";

import Quiz from "../models/quiz";
import Question from "../models/question";

const get_quizzes = asyncHandler(async (req: Request, res: Response) => {
  const quizzes = await Quiz.find();
  res.status(200).json({ quizzes });
});

const create_quiz = asyncHandler(async (req: Request, res: Response) => {
  const { title } = req.body;

  const newQuiz = await Quiz.create({
    title,
  });

  res.status(201).json({ message: "New quiz created", newQuiz });
});

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
