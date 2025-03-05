const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/db");
const runMigrations = require("./config/migration");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", taskRoutes);

async function startServer() {
  try {
    await runMigrations();
    console.log("Database migrations completed successfully.");

    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

    return server;
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
}

if (process.env.NODE_ENV !== "test") {
  startServer();
}

module.exports = { app, startServer };
