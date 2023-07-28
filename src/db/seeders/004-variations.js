'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('variation', [
            { id: 1, name: 'Talle' },
            { id: 2, name: 'Color' },
            { id: 3, name: 'Material' }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('variation', null, {});
    }
};
