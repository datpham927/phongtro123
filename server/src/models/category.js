"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasOne(models.Post, {
        foreignKey: "categoryCode",
        as: "category",
      });
    }
  }
  Category.init(
    {
      code: DataTypes.STRING,
      value: DataTypes.STRING,
      header: DataTypes.STRING, //diện tích
      subheader: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
