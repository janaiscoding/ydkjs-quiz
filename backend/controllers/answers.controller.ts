import { Request, Response } from "express";

import asyncHandler from "express-async-handler";

import Question from "../models/question";
import Answer from "../models/answer";

const update_answer = asyncHandler(async (req: Request, res: Response) => {
// to be completed
});

const delete_answer = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.params.id);
  const answer = await Answer.findById(req.params.id);

  if (!answer) res.status(404).json({ message: "Answer not found." });

  const question = await Question.findById(answer!.parent_question);
  if (!question)
    res.status(404).json({ message: "Parent question not found." });

  question &&
    answer &&
    Promise.all([
      question.updateOne({ $pull: { answers: answer } }),
      answer.deleteOne(),
    ])
      .then(() => {
        res.status(202).json({ message: "Answer was deleted", question });
      })
      .catch((err) => {
        res.status(400).json({ message: "oops",err });
      });
});

export { update_answer, delete_answer };
