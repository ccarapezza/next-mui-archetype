'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('variation_option', [
            { value: 'S', variationId: 1 },
            { value: 'M', variationId: 1 },
            { value: 'X', variationId: 1 },
            { value: '#fff', variationId: 2 },
            { value: '#000', variationId: 2 },
            { value: '#ff0000', variationId: 2 },
            { value: 'Algodón', variationId: 3 },
            { value: 'Nylon', variationId: 3 },
            { value: 'Lana', variationId: 3 },
            { value: 'Poliéster', variationId: 3 },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('variation_option', null, {});
    }
};
