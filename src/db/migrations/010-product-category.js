'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_category', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      parentId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    });

    queryInterface.addConstraint('product_category', {
      fields: ['parentId'],
      type: 'foreign key',
      name: 'product_category_fk_parent',
      references: {
        table: 'product_category',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down(queryInterface, Sequelize) { 
    await queryInterface.dropTable('product_category');
  }
};
