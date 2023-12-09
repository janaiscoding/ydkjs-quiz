import { Request, Response } from "express";

import asyncHandler from "express-async-handler";

import Question from "../models/question";
import Answer from "../models/answer";

const get_question = asyncHandler(async (req: Request, res: Response) => {
  const question = await Question.findById(req.params.id).populate("answers");

  if (!question) res.status(404).json({ message: "Question not found." });

  res.status(200).json({ question });
});

const create_answer = asyncHandler(async (req: Request, res: Response) => {
  const { answer, isCorrect } = req.body;

  const question = await Question.findById(req.params.id);
  const newAnswer = await Answer.create({
    answer,
    isCorrect,
    parent_question: question,
  });

  if (!question) res.status(404).json({ message: "Question not found." });
  else await question.updateOne({ $push: { answers: newAnswer } });

  res.status(200).json({ message: "New answer was created", newAnswer });
});

// delete question
// must be deleted from quiz as well, must delete all answers

// update question
export { get_question, create_answer };
