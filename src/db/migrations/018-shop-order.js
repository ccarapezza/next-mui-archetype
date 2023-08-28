'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('shop_order', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            orderDate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            orderTotal: {
                type: Sequelize.DECIMAL(15, 2),
                allowNull: false
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: true
            },
            statusId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            contactFormId: {
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
        queryInterface.addConstraint('shop_order', {
            fields: ['userId'],
            type: 'foreign key',
            name: 'shop_order_fk_users',
            references: {
                table: 'users',
                field: 'id'
            },
            onDelete: 'restrict',
            onUpdate: 'cascade'
        });
        queryInterface.addConstraint('shop_order', {
            fields: ['statusId'],
            type: 'foreign key',
            name: 'shop_order_fk_order_status',
            references: {
                table: 'order_status',
                field: 'id'
            },
            onDelete: 'restrict',
            onUpdate: 'cascade'
        });
        queryInterface.addConstraint('shop_order', {
            fields: ['contactFormId'],
            type: 'foreign key',
            name: 'shop_order_fk_contact_form',
            references: {
                table: 'contact_form',
                field: 'id'
            },
            onDelete: 'restrict',
            onUpdate: 'cascade'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('shop_order');
    }
};