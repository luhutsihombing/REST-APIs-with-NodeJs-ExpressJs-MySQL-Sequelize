module.exports = (sequelize, Sequelize) => {
  return sequelize.define("product", {
    productName: {
      type: Sequelize.STRING
    },
    productDescription: {
      type: Sequelize.STRING
    },
    productCategory: {
      type: Sequelize.STRING
    },
    productImage: {
      type: Sequelize.STRING
    },
    productPrice: {
      type: Sequelize.STRING
    },
    productQty: {
      type: Sequelize.STRING
    }
  });
};
