'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.TEXT
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
    queryInterface.addConstraint('posts', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'posts_fk_users',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  }
};
