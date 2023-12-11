import { body } from "express-validator";

const signup_validator = [
  body("name", "Account name is required")
    .trim()
    .isLength({ min: 3, max: 25 })
    .withMessage("Account name must be between 3 and 25 characters"),
  body("email", "Email is required")
    .isEmail()
    .withMessage("Must be valid email"),
  body("password", "User password is required")
    .trim()
    .isLength({ min: 8, max: 24 })
    .withMessage("Password must be between 8 and 24 characters"),
];

const login_validator = [
  body("email", "Email is required")
    .isEmail()
    .withMessage("Must be valid email"),
  body("password", "User password is required")
    .trim()
    .isLength({ min: 8, max: 24 })
    .withMessage("Password must be between 8 and 24 characters"),
];
export { signup_validator, login_validator, };
