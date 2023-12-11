import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import expressAsyncHandler from "express-async-handler";

// @route POST /signup
// @access Public
// @description Create a new user signup

const create_user = expressAsyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10, async (err, hashed) => {
    // Handle a possible hashing error
    if (err) res.status(500).json({ message: err.message });

    await User.create({ name, email, password: hashed });
    res.status(201).json({ message: "New user successfully created!" });
  });
});

// @route POST /login
// @access Public
// @description Log in to user with credentials, receives auth token as valid response.
const login_user = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) res.status(404).json({ message: "Account not found." });

    bcrypt.compare(password, user!.password, (err, compare) => {
      if (err) return next(err);
      if (compare) {
        const token = jwt.sign({ userID: user!._id }, process.env.JWT_SECRET!, {
          expiresIn: "24hr",
        });

        res.status(200).json({ token });
      } else {
        res.status(400).json({ message: "Your password is incorrect." });
      }
    });
  }
);

// @route POST /verify
// @access Public
// @description Verifies existing auth JWT token, returns user data on success.
const verify_token = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      res.status(401).json({ message: "Unauthorized. Missing valid token." });

    // @ts-ignore
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verify.userID).select("-email -password");
    if (!user) res.status(404).json({ message: "User not found." });

    res.status(200).json({ user });
  }
);

export { create_user, login_user, verify_token };
