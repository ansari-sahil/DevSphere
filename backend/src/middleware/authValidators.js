import { body } from "express-validator";

export const registerValidator = [
  body("name").notEmpty().withMessage("Name is required"),

  body("email").isEmail().withMessage("Valid email required"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

export const loginValidator = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const forgotPasswordValidator = [
  body("email").isEmail().withMessage("Valid email required"),
];

export const resetPasswordValidator = [
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("token").notEmpty().withMessage("Token required"),
];
