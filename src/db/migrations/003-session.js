'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sessions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      expires: {
        type: Sequelize.DATE,
        allowNull: false
      },
      sessionToken: {
        type: Sequelize.STRING,
        unique: "sessionToken",
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID
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
    queryInterface.addConstraint('sessions', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'sessions_fk_users',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'cascade'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sessions');
  }
};
