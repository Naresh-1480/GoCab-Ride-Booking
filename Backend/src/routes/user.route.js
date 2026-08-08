const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");

/**
 * Registers the user creation endpoint with request validation rules.
 *
 * POST /users/register
 */
router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid Email")
      .notEmpty()
      .withMessage("Email is required"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name Must be atleast 3 character long"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password Must be atleast 6 character long"),
  ],
  userController.registerUser,
);

/**
 * Login endpoint for user authentication.
 *
 * POST /users/login
 */
router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid Email"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password Must be atleast 6 character long"),
  ],
  userController.loginUser,
);

module.exports = router;
