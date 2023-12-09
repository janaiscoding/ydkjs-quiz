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

const get_quiz = asyncHandler(async (req: Request, res: Response) => {
  const [quiz, questions] = await Promise.all([
    Quiz.findById(req.params.id),
    Question.find({ parentQuiz: req.params.id }).populate("answers"),
  ]);

  if (!quiz) {
    res.status(404).json({ message: "Quiz was not found" });
  }

  res.status(200).json({ quiz, questions });
});

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
