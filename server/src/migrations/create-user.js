"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
      },

      phone: {
        type: Sequelize.INTEGER,
      },
      password: {
        type: Sequelize.STRING,
      },
      zalo: {
        type: Sequelize.STRING,
      },
      fbUrl: {
        type: Sequelize.STRING,
      },
      avatar: {
        type: Sequelize.TEXT("long"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
