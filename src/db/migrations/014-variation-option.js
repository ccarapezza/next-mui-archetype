'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('variation_option', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      variationId: {
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

    queryInterface.addConstraint('variation_option', {
      fields: ['variationId'],
      type: 'foreign key',
      name: 'variation_option_fk',
      references: {
        table: 'variation',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });   
  },

  async down(queryInterface, Sequelize) { 
    await queryInterface.dropTable('variation_option');
  }
};
