import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Scores from "../models/scores";

const get_scores = expressAsyncHandler(async (req: Request, res: Response) => {
  const scores = await Scores.find()
    .populate({
      path: "user_id",
      select: "name",
    })
    .populate({
      path: "quiz_id",
      select: "title",
    });
  if (!scores) res.status(404).json({ message: "Scores not found" });
  res.status(200).json({ scores });
});

const create_score = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { user_id, quiz_id, score } = req.body;
    const newScore = await Scores.create({
      user_id,
      quiz_id,
      score,
    });

    if (!newScore) res.status(404).json({ message: "Scores not found" });
    res.status(201).json({ newScore });
  }
);

const get_quiz_scores = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const scores = await Scores.find({ quiz_id: req.params.id })
      .populate({
        path: "user_id",
        select: "name",
      })
      .populate({
        path: "quiz_id",
        select: "title",
      });
    if (!scores) res.status(404).json({ message: "Scores not found" });
    res.status(200).json({ scores });
  }
);

const get_user_scores = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const scores = await Scores.find({ user_id: req.params.id })
      .populate({
        path: "user_id",
        select: "name",
      })
      .populate({
        path: "quiz_id",
        select: "title",
      });
    if (!scores) res.status(404).json({ message: "Scores not found" });
    res.status(200).json({ scores });
  }
);

export { get_scores, create_score, get_quiz_scores, get_user_scores };
