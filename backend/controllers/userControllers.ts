import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import validator from "validator";

const get_users = async (req: Request, res: Response) => {
  try {
    // Always omit email and password when sending users' info to the client
    const users = await User.find().select("-password");
    if (users) {
      // Unescape all users' input data which is always santized.
      users.map((user) => {
        user.name = validator.unescape(user.name);
        return user;
      });
      res.json({ message: "List of all users.", users });
    } else {
      res.status(404).json({ message: "There are no users yet!" });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
