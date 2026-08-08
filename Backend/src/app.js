const express = require("express");
const cors = require("cors");
const app = express();
const authRouters = require("./routes/user.route");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", authRouters);

/**
 * Health-check route that confirms the API is running.
 *
 * @param {import("express").Request} req - Express request object.
 * @param {import("express").Response} res - Express response object.
 * @returns {void}
 */
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server Working Properly",
  });
});

module.exports = app;
