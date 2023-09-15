'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('customer_contact_status', [
            { name: "Abierta" },
            { name: "Cerrada" },
            { name: "Cancelada" },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('customer_contact_status', null, {});
    }
};