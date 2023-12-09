import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import Quiz from "../models/quiz";
import Question from "../models/question";

// @route GET /quizzes
// @access Public
// @description Gets all the quizzes, will show titles, ids, not populated quizzes.
const get_quizzes = asyncHandler(async (req: Request, res: Response) => {
  const quizzes = await Quiz.find();
  res.status(200).json({ quizzes });
});

// @route POST /quizzes
// @access Public --> will be private
// @description Creates a new empty quiz, needs a title for the quiz.
const create_quiz = asyncHandler(async (req: Request, res: Response) => {
  const newQuiz = await Quiz.create({ title: req.body.title });
  res.status(201).json({ message: "New quiz created", newQuiz });
});

// @route GET /quizzes/:id
// @access Public
// @description Gets a full quiz, it will populate both questions and answers.
const get_quiz = asyncHandler(async (req: Request, res: Response) => {
  // This will be the data consumed by the main game logic
  const quiz = await Quiz.findById(req.params.id).populate({
    path: "questions",
    populate: {
      path: "answers",
    },
  });

  if (!quiz) res.status(404).json({ message: "Quiz was not found" });
  else
    res
      .status(200)
      .json({ id: quiz.id, title: quiz.title, questions: quiz.questions });
});

// @route POST /quizzes/:id
// @access Public --> will be private
// @description Creates a new, empty question and links it to the parent_quiz
const create_question = asyncHandler(async (req: Request, res: Response) => {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) res.status(404).json({ message: "Quiz was not found" });

  // Quiz exists, we're allowed to create a question and update the quiz
  const newQuestion = await Question.create({
    title: req.body.title,
    parent_quiz: quiz,
  });
  await quiz!.updateOne({ $push: { questions: newQuestion } });
  res.status(201).json({ message: "New question was created." });
});

// To do: delete_quiz, update_quiz(title)
export { get_quizzes, create_quiz, get_quiz, create_question };
