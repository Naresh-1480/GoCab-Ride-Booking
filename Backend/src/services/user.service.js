const userModel = require("../models/user.model");

/**
 * Creates a user document in MongoDB.
 *
 * @async
 * @param {Object} params - User creation payload.
 * @param {string} params.firstname - User first name.
 * @param {string} [params.lastname] - User last name.
 * @param {string} params.email - User email address.
 * @param {string} params.password - Hashed password.
 * @returns {Promise<import("mongoose").Document>} The persisted user document.
 * @throws {Error} Throws when required fields are missing.
 */
const createUser = async ({ firstname, lastname, email, password }) => {
  if (!firstname || !email || !password) {
    throw new err("Please Enter All Fields");
  }

  const user = userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });

  return user;
};

module.exports = { createUser };
