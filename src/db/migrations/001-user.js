'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: "email"
      },
      password: {
        type: Sequelize.STRING
      },
      emailVerified: {
        type: Sequelize.DATE
      },
      image: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('users');
  }
};
