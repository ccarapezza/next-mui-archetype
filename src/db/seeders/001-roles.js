'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('role', [
            { id: 1, name: 'admin' },
            { id: 2, name: 'user' },
            { id: 3, name: 'client' }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('role', null, {});
    }
};
