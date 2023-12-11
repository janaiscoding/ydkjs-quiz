import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import expressAsyncHandler from "express-async-handler";
import History from "../models/history";
import Scores from "../models/scores";

// @route GET /users/:id
// @access Public
// @description Gets an user, populated with history.
const get_profile = expressAsyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).populate({
    path: "history",
    populate: {
      path: "quiz_id",
    },
  });
  if (!user) res.status(404).json({ message: "User not found." });

  res.status(200).json({ message: "Fetch user data.", user });
});

// @route POST /users/:id
// @access Public --> will be private
// @description Add a new history instance
const create_history = expressAsyncHandler(
  async (req: Request, res: Response) => {
    // For the entire quiz game, data storage will happen on the frontend
    // When a user submits a quiz at the end, we will push a new history or update an existing one
    // This will store a new history model instance with:
    // 1. The quiz ID 2. The score

    const user = await User.findById(req.params.id);
    const { quiz_id, score } = req.body;

    if (!user) res.status(404).json({ message: "User not found." });

    const newHistory = await History.create({ quiz_id, score });
    // Can be added: all the ID's of the correct questions; all the ID's of the incorrect questions
    await user?.updateOne({ $push: { history: newHistory } }); // push a new history
    res.status(201).json({ message: "Created a new history", newHistory });
  }
);

// @route PUT /users/:id
// @access Public --> will be private
// @description Updates an existing history instance
const update_history = expressAsyncHandler(
  async (req: Request, res: Response) => {
    // If a user already has a history instance of the quiz we will perform a PUT request
    // Can also use this to progressivelly update (in)correct questions in case i want to validate step by step
    const user = await User.findById(req.params.id);
    const { quiz_id, newScore } = req.body;

    if (!user) res.status(404).json({ message: "User not found." });

    await History.findOneAndUpdate({ quiz_id }, { score: newScore });

    res.status(201).json({ message: "Updated an existing history" });
  }
);

export { get_profile, create_history, update_history };
