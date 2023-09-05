'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('image_container', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            code: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
            },
            key: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 1
            },
            title: {
                type: Sequelize.STRING,
                allowNull: true
            },
            buttonLabel: {
                type: Sequelize.STRING,
                allowNull: true
            },
            link: {
                type: Sequelize.STRING,
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
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('image_container');
    }
};