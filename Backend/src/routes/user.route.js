const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

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

router.get("/profile", authMiddleware.authUser, userController.getUserProfile);

router.get("/logout", authMiddleware.authUser, userController.logoutUser);

module.exports = router;
