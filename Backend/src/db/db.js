const mongoose = require("mongoose");

/**
 * Connects the application to MongoDB using the configured connection string.
 *
 * @async
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected Successfully");
  } catch (err) {
    throw err;
  }
};

module.exports = connectDB;
