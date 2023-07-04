'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_roles', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
    queryInterface.addConstraint('user_roles', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'user_roles_fk_users',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    queryInterface.addConstraint('user_roles', {
      fields: ['roleId'],
      type: 'foreign key',
      name: 'user_roles_fk_roles',
      references: {
        table: 'roles',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user_roles');
  }
};
