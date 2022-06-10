const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  'u280636814_NodeJsDev',
  'u280636814_userNodeJsDev',
  'm*A@8vY4M4', {
  host: '194.59.164.64',
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