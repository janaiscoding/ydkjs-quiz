import express from "express";
const router = express.Router();
import { create_user, login_user, verify_token } from "../controllers/auth.controller";
import { login_validator, signup_validator } from "../validators/auth.validator";
import query_validation_middleware from "../middleware/validation.middleware";

router.post(
  "/signup",
  signup_validator,
  query_validation_middleware,
  create_user
);

router.post("/login", login_validator, query_validation_middleware, login_user);

router.post("/verify", verify_token)
export default router;
