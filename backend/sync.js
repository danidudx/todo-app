const sequelize = require("./config/db");
const Task = require("./models/Task");

const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log("Database synced");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

syncDatabase();
