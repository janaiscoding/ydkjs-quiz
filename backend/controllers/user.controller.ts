import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import expressAsyncHandler from "express-async-handler";
import History from "../models/history";
import Scores from "../models/scores";

const get_profile = expressAsyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).populate("history");
  if (!user) res.status(404).json({ message: "User not found." });

  res.status(200).json({ message: "User data.", user });
});

// For the entire quiz game, data storage will happen on the frontend
// When a user submits a quiz at the end, we will push a new history or update an existing one
// This will store a new history model instance with:
// 1. The quiz ID; 2. All the ID's of the correct questions; 3. All the ID's of the incorrect questions
const create_history = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    const { quiz_id, correctQuestions, incorrectQuestions, bestScore } =
      req.body;

    if (!user) res.status(404).json({ message: "User not found." });

    const newHistory = await History.create({
      quiz_id,
      correctQuestions,
      incorrectQuestions,
      bestScore,
    });

    await user?.updateOne({ $push: { history: newHistory } });
    res.status(201).json({ message: "User data.", user, newHistory });
  }
);

// If a user already has a history instance of the quiz we will perform a PUT request
// Can also use this to progressivelly update (in)correct questions in case i want to validate step by step
const update_history = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    const { quiz_id, correctQuestions, incorrectQuestions, bestScore } =
      req.body;

    if (!user) res.status(404).json({ message: "User not found." });

    const updatedHistory = await History.findOneAndUpdate(
      { quiz_id },
      {
        quiz_id,
        correctQuestions,
        incorrectQuestions,
        bestScore,
      }
    );

    res.status(201).json({ message: "User data.", user, updatedHistory });
  }
);

export { get_profile, create_history, update_history };
