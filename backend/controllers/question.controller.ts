import { Request, Response } from "express";

import asyncHandler from "express-async-handler";

import Question from "../models/question";
import Answer from "../models/answer";

const get_questions = asyncHandler(async (req: Request, res: Response) => {
  const questions = await Question.find().populate("answers");

  if (!questions) res.status(404).json({ message: "Question not found." });

  res.status(200).json({ questions });
});

const get_question = asyncHandler(async (req: Request, res: Response) => {
  const question = await Question.findById(req.params.id).populate("answers");

  if (!question) res.status(404).json({ message: "Question not found." });

  res.status(200).json({ question });
});

const create_answer = asyncHandler(async (req: Request, res: Response) => {
  const question = await Question.findById(req.params.id);
  if (!question) res.status(404).json({ message: "Question not found." });

  // Question exists, we're allowed to create an answer and update the question
  const newAnswer = await Answer.create({
    answer: req.body.answer,
    isCorrect: req.body.isCorrect,
    parent_question: req.params.id,
  });

  await question!.updateOne({ $push: { answers: newAnswer } });
  res.status(200).json({ message: "New answer was created", newAnswer });
});

// To do: delete_question, update_question(title)
export { get_questions, get_question, create_answer };
