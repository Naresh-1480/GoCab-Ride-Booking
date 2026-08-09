const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");

const authUser = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized User",
      });
    }

    const isTokenBlacklisted = await blacklistTokenModel.findOne({ token });

    if (isTokenBlacklisted) {
      return res.status(401).json({
        message: "Unauthorized User",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized User",
      });
    }

    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

const captainAuth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized Captain",
      });
    }

    const isTokenBlacklisted = await blacklistTokenModel.findOne({ token });

    if (isTokenBlacklisted) {
      return res.status(401).json({
        message: "Unauthorized Captain",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded.id);

    if (!captain) {
      return res.status(401).json({
        message: "Unauthorized Captain",
      });
    }

    req.captain = captain;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = { authUser, captainAuth };
