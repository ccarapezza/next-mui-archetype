'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('product_configuration', {
      productItemId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      variationOptionId: {
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
    queryInterface.addConstraint('product_configuration', {
      fields: ['productItemId'],
      type: 'foreign key',
      name: 'product_configuration_fk_product',
      references: {
        table: 'product_item',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    queryInterface.addConstraint('product_configuration', {
      fields: ['variationOptionId'],
      type: 'foreign key',
      name: 'product_configuration_fk_variation_option',
      references: {
        table: 'variation_option',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('product_configuration');
  }
};
