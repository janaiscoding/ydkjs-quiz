import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

// @route POST /signup
// @access Public
// @description Create a new user signup
const create_user = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    bcrypt.hash(password, 10, async (err, hashed) => {
      if (err) {
        res.status(500).json({ message: err.message }); // A hashing error has occured.
      } else {
        await User.create({
          name,
          email,
          password: hashed,
        })
          .then(() => {
            res.status(201).json({
              message: "New user successfully created!",
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: "Unexpected database error occured.",
              error: err.message,
            });
          });
      }
    });
  } catch (err: any) {
    res.status(500).json({
      message: "Internal server error.",
      error: err.message,
    });
  }
};

// @route POST /login
// @access Public
// @description Log in to user with credentials, receives auth token as valid response.
const login_post = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        message: "Account not found.",
      });
    bcrypt.compare(password, user.password, (err, compare) => {
      if (err) return next(err);
      if (compare) {
        const token = jwt.sign(
          { userID: user._id },
          //@ts-ignore
          process.env.secret,
          {
            expiresIn: "24hr",
          }
        );
        user.password = ""; //Instead of performing a query again and using select("-email -password") - Preventing sending passwords to client.
        return res.status(200).json({ token });
      } else {
        return res.status(400).json({ message: "Your password is incorrect." });
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// @route POST /verify
// @access Public
// @description Verifies existing auth JWT token, returns user data on success.
const verify_token = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, please log in." });
  }
  try {
    // @ts-ignore
    const verify = jwt.verify(token, process.env.secret);
    const user = await User.findById(verify.userID).select("-email -password");
    if (!user) res.status(404).json({ message: "User doesn't exist." });
    else {
      res.status(200).json({ user });
    }
  } catch {
    res.status(401).json({ message: "Token is invalid." });
  }
};

export default {
  login_post,
  create_user,
  verify_token,
};
