const { Sequelize } = require("sequelize");
const { feedbackModel } = require("../model/feedback");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("railway", "root", "U8g7Ni1Dx4h4PwW5iAZo", {
  host: "containers-us-west-176.railway.app",
  dialect: "mysql",
  port: 6040,
});

const db = {};
db.sequelize = sequelize;
db.feedback = feedbackModel(sequelize, Sequelize);

module.exports = db;
