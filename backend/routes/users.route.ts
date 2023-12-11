import express from "express";
import { get_profile } from "../controllers/user.controller";
const router = express.Router();

router.get("/:id", get_profile);

export default router;
