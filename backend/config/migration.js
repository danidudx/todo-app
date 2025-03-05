const sequelize = require("./db");

async function runMigrations() {
  try {
    console.log("Running migrations...");
    await sequelize.sync({ alter: true });
    console.log("Migrations completed.");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

module.exports = runMigrations;
