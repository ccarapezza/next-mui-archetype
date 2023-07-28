'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('variation', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: true
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
    queryInterface.addConstraint('variation', {
      fields: ['categoryId'],
      type: 'foreign key',
      name: 'product_variation_category_fk',
      references: {
        table: 'product_category',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    queryInterface.addConstraint('variation', {
        fields: ['name', 'categoryId'],
        type: 'unique',
        name: 'variation_name_category_unique'
    });
  },

  async down(queryInterface, Sequelize) { 
    await queryInterface.dropTable('variation');
  }
};
