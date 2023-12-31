import { Request, Response } from "express";

import asyncHandler from "express-async-handler";

import Answer from "../models/answer";
import Question from "../models/question";

// @route GET /answers
// @access Public
// @description Gets all the answers, needed for easier access when testing
const get_answers = asyncHandler(async (req: Request, res: Response) => {
  const answers = await Answer.find();

  if (!answers) res.status(404).json({ message: "Answer not found." });
  res.status(200).json({ answers });
});

// @route PUT /answers/:id
// @access Public --> will be private
// @description Updates an existing answer. Works
const update_answer = asyncHandler(async (req: Request, res: Response) => {
  const answer = await Answer.findByIdAndUpdate(req.params.id, {
    answer: req.body.answer,
    isCorrect: req.body.isCorrect,
  });

  if (!answer) res.status(404).json({ message: "Answer not found." });

  res.status(201).json({ message: "Answer was updated." });
});

// @route DELETE /answers:id
// @access Public --> will be private
// @description Deletes an answer. Works
const delete_answer = asyncHandler(async (req: Request, res: Response) => {
  const answer = await Answer.findById(req.params.id);

  if (!answer) res.status(404).json({ message: "Answer not found." });
  // By this point, both answer and question are not null
  // We can procede with delete answer and update question
  Promise.all([
    Question.findByIdAndUpdate(answer!.parent_question, {
      $pull: { answers: req.params.id },
    }),
    answer!.deleteOne(),
  ]);
  res.status(202).json({ message: "Answer was deleted" });
  // Can send 204 as well
});

export { get_answers, update_answer, delete_answer };
