require("dotenv").config();
const dns = require("dns");
dns.setServers(["1.1.1.1", "1.0.0.1"]);

const http = require("http");
const app = require("./src/app");
const PORT = process.env.PORT || 3000;
const connectDB = require("./src/db/db");

/**
 * Bootstraps the application by connecting to MongoDB first and then starting
 * the HTTP server once the database connection is ready.
 */
connectDB()
  .then(() => {
    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
