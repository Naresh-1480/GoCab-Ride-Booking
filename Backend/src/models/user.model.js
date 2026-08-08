const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * User schema for storing profile, authentication, and socket metadata.
 *
 * @typedef {Object} UserDocument
 * @property {{ firstname: string, lastname?: string }} fullname - User name fields.
 * @property {string} email - Unique email address.
 * @property {string} password - Hashed password, excluded from normal queries.
 * @property {string} [socketID] - Active socket connection identifier.
 */
const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketID: {
    type: String,
  },
});

/**
 * Generates a signed authentication token for the current user.
 *
 * @returns {string} JWT containing the user id.
 */
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET);
  return token;
};

/**
 * Compares a raw password against the stored password hash.
 *
 * @param {string} password - Plaintext password to verify.
 * @returns {Promise<boolean>} True when the passwords match.
 */
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

/**
 * Hashes a plaintext password before persistence.
 *
 * @param {string} password - Plaintext password.
 * @returns {Promise<string>} Bcrypt hash.
 */
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
