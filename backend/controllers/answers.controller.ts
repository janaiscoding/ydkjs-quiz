import { Request, Response } from "express";

import asyncHandler from "express-async-handler";

import Answer from "../models/answer";

const get_answers = asyncHandler(async (req: Request, res: Response) => {
  const answers = await Answer.find();

  if (!answers) res.status(404).json({ message: "Answer not found." });
  res.status(200).json({ answers });
});

const update_answer = asyncHandler(async (req: Request, res: Response) => {
  const answer = await Answer.findByIdAndUpdate(req.params.id, {
    answer: req.body.answer,
    isCorrect: req.body.isCorrect,
  });

  if (!answer) res.status(404).json({ message: "Answer not found." });

  res.status(201).json({ message: "Answer was updated", answer });
});

const delete_answer = asyncHandler(async (req: Request, res: Response) => {
  const answer = await Answer.findByIdAndDelete(req.params.id);

  if (!answer) res.status(404).json({ message: "Answer not found." });
  // By this point, both answer and question are not null
  // We can procede with delete answer and update question

  res.status(202).json({ message: "Answer was deleted" });
  // Can send 204 as well
});

export { get_answers, update_answer, delete_answer };
