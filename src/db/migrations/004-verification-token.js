'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('verification_tokens', {
      token: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      identifier: {
        type: Sequelize.STRING,
        allowNull: false
      },
      expires: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('verification_tokens');
  }
};
