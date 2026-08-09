const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

const registerCaptain = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation Error",
      errors: errors.array(),
    });
  }

  const { fullname, email, password, vehicle } = req.body;

  const captainExists = await captainModel.findOne({ email });

  if (captainExists) {
    return res.status(409).json({
      message: "Captain with this email already exists",
    });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = captain.generateAuthToken();

  res.status(201).json({
    message: "Captain successfully created",
    captain: {
      _id: captain._id,
      fullname: captain.fullname,
      email: captain.email,
      vehicle: captain.vehicle,
    },
    token,
  });
};

const loginCaptain = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation Error",
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select("+password");

  if (!captain) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await captain.comparePassword(password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const token = captain.generateAuthToken();

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
  });

  res.status(200).json({
    message: "Login successful",
    captain: {
      _id: captain._id,
      fullname: captain.fullname,
      email: captain.email,
      vehicle: captain.vehicle,
    },
    token,
  });
};

const getCaptainProfile = async (req, res) => {
  res.status(200).json({
    message: "Captain profile retrieved successfully",
    captain: {
      _id: req.captain._id,
      fullname: req.captain.fullname,
      email: req.captain.email,
      vehicle: req.captain.vehicle,
      status: req.captain.status,
    },
  });
};

const logoutCaptain = async (req, res) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(200).json({
      message: "Captain logged out successfully",
    });
  }

  res.clearCookie("token");

  await blacklistTokenModel.create({ token });

  res.status(200).json({
    message: "Logout successful",
  });
};

module.exports = {
  registerCaptain,
  loginCaptain,
  getCaptainProfile,
  logoutCaptain,
};
