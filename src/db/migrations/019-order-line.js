'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('order_line', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            itemId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            orderId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            qty: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            price: {
                type: Sequelize.DECIMAL(15, 2),
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
        queryInterface.addConstraint('order_line', {
            fields: ['itemId'],
            type: 'foreign key',
            name: 'order_line_fk_product_item',
            references: {
                table: 'product_item',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });

        queryInterface.addConstraint('order_line', {
            fields: ['orderId'],
            type: 'foreign key',
            name: 'order_line_fk_shop_order',
            references: {
                table: 'shop_order',
                field: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('order_line');
    }
};