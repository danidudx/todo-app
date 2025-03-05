const sequelize = require("../config/db");

const resetDatabase = async () => {
  await sequelize.sync({ force: true });
};

module.exports = resetDatabase;
