import { Request, Response } from "express";

import asyncHandler from "express-async-handler";

import Question from "../models/question";
import Answer from "../models/answer";
import Quiz from "../models/quiz";

// @route GET /questions
// @access Public
// @description Gets all the questions for easier access when testing.
const get_questions = asyncHandler(async (req: Request, res: Response) => {
  const questions = await Question.find().populate("answers");

  if (!questions) res.status(404).json({ message: "Question not found." });

  res.status(200).json({ questions });
});

// @route GET /questions/:id
// @access Public --> will be private
// @description Creates a new empty quiz, needs a title for the quiz.
const get_question = asyncHandler(async (req: Request, res: Response) => {
  const question = await Question.findById(req.params.id).populate("answers");

  if (!question) res.status(404).json({ message: "Question not found." });

  res.status(200).json({ question });
});

// @route PUT /questions/:id
// @access Public --> will be private
// @description Updates an existing question. Works.
const update_question = asyncHandler(async (req: Request, res: Response) => {
  const question = await Question.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
  });

  if (!question) res.status(404).json({ message: "Question not found." });

  const updated_question = await Question.findById(req.params.id);
  res.status(200).json({ question: updated_question });
});

// @route POST /questions/:id
// @access Public --> will be private
// @description Deletes a question. Updates quiz. Deletes all linked answers. Works.
const delete_question = asyncHandler(async (req: Request, res: Response) => {
  const question = await Question.findById(req.params.id);
  if (!question) res.status(404).json({ message: "Question not found." });
  // clear parent quiz of current question
  const parent_quiz = await Quiz.findById(question!.parent_quiz);

  Promise.all([
    parent_quiz?.updateOne({ $pull: { questions: req.params.id } }),
    question?.deleteOne(),
    Answer.deleteMany({ parent_question: req.params.id }),
  ]);

  res.status(202).json({ message: "Question was deleted" });
});

// @route POST /questions/:id
// @access Public --> will be private
// @description Creates a new answer for a specific question. Works.
const create_answer = asyncHandler(async (req: Request, res: Response) => {
  const question = await Question.findById(req.params.id);
  if (!question) res.status(404).json({ message: "Question not found." });

  // Question exists, we're allowed to create an answer
  const newAnswer = await Answer.create({
    answer: req.body.answer,
    isCorrect: req.body.isCorrect,
    parent_question: req.params.id,
  });
  // update question to contain new answer!
  await question!.updateOne({ $push: { answers: newAnswer } });
  res.status(200).json({ message: "New answer was added" });
});

export {
  get_questions,
  get_question,
  create_answer,
  update_question,
  delete_question,
};
