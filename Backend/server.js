require("dotenv").config();
const dns = require("dns");
dns.setServers(["1.1.1.1", "1.0.0.1"]);

const http = require("http");
const app = require("./src/app");
const PORT = process.env.PORT || 3000;
const connectDB = require("./src/db/db");

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
