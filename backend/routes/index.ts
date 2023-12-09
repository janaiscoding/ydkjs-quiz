import express, { Request, Response } from "express";
const router = express.Router();

/* GET home page. */
router.get("/", function (req: Request, res: Response) {
  res.status(200).json({ message: "This works" });
});

export default router;
