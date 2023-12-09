import express, { Request, Response } from "express";
const router = express.Router();
import {
  get_quizzes,
  create_quiz,
  get_quiz,
} from "../controllers/quizControllers";

router.get("/", get_quizzes);
router.post("/", create_quiz);

router.get("/:id", get_quiz);

export default router;
