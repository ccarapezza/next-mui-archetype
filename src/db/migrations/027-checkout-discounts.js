'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('checkout_discounts', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING
            },
            active: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            coupon: {
                type: Sequelize.STRING
            },
            value: {
                type: Sequelize.INTEGER
            },
            coupon_type: {
                type: Sequelize.STRING
            },
            application_type: {
                type: Sequelize.STRING
            },
            uses_per_user: {
                type: Sequelize.INTEGER
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
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('checkout_discounts');
    }
};
