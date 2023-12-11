import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import validator from "validator";
import expressAsyncHandler from "express-async-handler";


const get_profile = expressAsyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).populate("history");
  if (!user) res.status(404).json({ message: "User not found." });

  res.status(200).json({ message: "User data.", user });
});

const add_history = expressAsyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (!user) res.status(404).json({ message: "User not found." });

  res.status(200).json({ message: "User data.", user });
});



export {get_profile, add_history}