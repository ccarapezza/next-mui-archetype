'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('role', [
            { id: 1, name: 'admin' },
            { id: 2, name: 'user' },
            { id: 3, name: 'client' },
            { id: 4, name: 'marketing' },
            { id: 5, name: 'sales' },
            { id: 6, name: 'designer' },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('role', null, {});
    }
};
