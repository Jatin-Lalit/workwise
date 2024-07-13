"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.User, { foreignKey: "sellerId" });
      Product.hasMany(models.Cart, { foreignKey: "productId" });
    }
  }
  Product.init(
    {
      sellerId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      category: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.DECIMAL,
      discount: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
