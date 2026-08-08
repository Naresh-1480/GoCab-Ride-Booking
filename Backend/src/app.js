const express = require("express");
const cors = require("cors");
const app = express();
const cookieparser = require("cookie-parser");
const authRouters = require("./routes/user.route");
const errorHandler = require("./middlewares/error.middleware");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server Working Properly",
  });
});

app.use("/users", authRouters);

app.use(errorHandler);

module.exports = app;
