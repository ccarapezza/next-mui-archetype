'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      categoryId: {
        type: Sequelize.INTEGER
      },
    });

    queryInterface.addConstraint('product', {
      fields: ['categoryId'],
      type: 'foreign key',
      name: 'product_category_fk',
      references: {
        table: 'product_category',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down(queryInterface, Sequelize) { 
    await queryInterface.dropTable('product');
  }
};
