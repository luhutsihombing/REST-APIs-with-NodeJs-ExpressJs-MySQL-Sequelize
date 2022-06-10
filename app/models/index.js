require('dotenv').config();

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  operatorsAliases: 0,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.admin = require("./admin.model.js")(sequelize, Sequelize);
db.companies = require("./companies.model.js")(sequelize, Sequelize);
db.product = require("./product.model.js")(sequelize, Sequelize);
module.exports = db;