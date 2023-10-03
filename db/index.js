// url
// // mysql://root:U8g7Ni1Dx4h4PwW5iAZo@containers-us-west-176.railway.app:6040/railway

// database
// // railway

// host
// // containers-us-west-176.railway.app

// password
// // U8g7Ni1Dx4h4PwW5iAZo

// port
// // 6040

// user
// // root

const { Sequelize } = require("sequelize");
const { catalogModel } = require("../model/catalog");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("railway", "root", "U8g7Ni1Dx4h4PwW5iAZo", {
  host: "containers-us-west-176.railway.app",
  dialect: "mysql",
  port: 6040,
});

const db = {};
db.sequelize = sequelize;
db.catalog = catalogModel(sequelize, Sequelize)

module.exports = db;
