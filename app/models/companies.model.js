module.exports = (sequelize, Sequelize) => {
  return sequelize.define("companies", {
    title: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    },
    position: {
      type: Sequelize.STRING
    }
  });
};
