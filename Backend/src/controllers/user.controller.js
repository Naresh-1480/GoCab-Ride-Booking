const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const { createUser } = require("../services/user.service");
const blacklistTokenModel = require("../models/blacklistToken.model");

const registerUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation Error",
      errors: errors.array(),
    });
  }

  const { fullname, email, password } = req.body;

  const userExists = await userModel.findOne({ email });

  if (userExists) {
    return res.status(409).json({
      message: "User with this email already exists",
    });
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = await createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  res.status(201).json({
    message: "User successfully created",
    user: {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    },
    token,
  });
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation Error",
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const token = user.generateAuthToken();

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return res.status(200).json({
    message: "User logged in successfully",
    user: {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    },
    token,
  });
};

const getUserProfile = async (req, res) => {
  return res.status(200).json({
    message: "User profile fetched successfully",
    user: req.user,
  });
};

const logoutUser = async (req, res) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(200).json({
      message: "User logged out successfully",
    });
  }

  res.clearCookie("token");

  await blacklistTokenModel.create({
    token,
  });

  return res.status(200).json({
    message: "User logged out successfully",
  });
};

module.exports = { registerUser, loginUser, getUserProfile, logoutUser };
