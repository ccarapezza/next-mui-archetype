'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('accounts', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      provider: {
        type: Sequelize.STRING,
        allowNull: false
      },
      providerAccountId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      refresh_token: {
        type: Sequelize.STRING
      },
      access_token: {
        type: Sequelize.STRING
      },
      expires_at: {
        type: Sequelize.INTEGER
      },
      token_type: {
        type: Sequelize.STRING
      },
      scope: {
        type: Sequelize.STRING
      },
      id_token: {
        type: Sequelize.TEXT
      },
      session_state: {
        type: Sequelize.STRING
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
    queryInterface.addConstraint('accounts', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'accounts_fk_users',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'cascade'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('accounts');
  }
};
