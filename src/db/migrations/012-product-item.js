'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_item', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      masterProductId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sku: {
        type: Sequelize.STRING,
        allowNull: false
      },
      stock: {
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.STRING,
      },
    });

    queryInterface.addConstraint('product_item', {
      fields: ['masterProductId'],
      type: 'foreign key',
      name: 'master_product_fk',
      references: {
        table: 'product',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down(queryInterface, Sequelize) { 
    await queryInterface.dropTable('product_item');
  }
};
