"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Overview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Overview.hasOne(models.Post, {
        foreignKey: "overviewId",
        as: "Overview",
      });
    }
  }
  Overview.init(
    {
      code: DataTypes.STRING,
      area: DataTypes.STRING,
      type: DataTypes.STRING, //diện tích
      target: DataTypes.STRING,
      expire: DataTypes.STRING, //hết hạn
      bonus: DataTypes.STRING,
      created: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Overview",
    }
  );
  return Overview;
};
