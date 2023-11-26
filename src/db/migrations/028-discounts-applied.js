
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('discounts_applied', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            checkoutDiscountsId: {
                type: Sequelize.INTEGER,
            },
            orderId: {
                type: Sequelize.INTEGER,
            },
            userId: {
                type: Sequelize.UUID,
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
        queryInterface.addConstraint('discounts_applied', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'discounts_applied_fk_users',
            references: {
                table: 'users',
                field: 'id'
            },
            onDelete: 'restrict',
            onUpdate: 'cascade'
        });
        queryInterface.addConstraint('discounts_applied', {
            fields: ['orderId'],
            type: 'foreign key',
            name: 'discounts_applied_fk_shop_order',
            references: {
                table: 'shop_order',
                field: 'id'
            },
            onDelete: 'restrict',
            onUpdate: 'cascade'
        });
        queryInterface.addConstraint('discounts_applied', {
            fields: ['checkoutDiscountsId'],
            type: 'foreign key',
            name: 'discounts_applied_fk_checkout_discounts',
            references: {
                table: 'checkout_discounts',
                field: 'id'
            },
            onDelete: 'restrict',
            onUpdate: 'cascade'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('discounts_applied');
    }
};
