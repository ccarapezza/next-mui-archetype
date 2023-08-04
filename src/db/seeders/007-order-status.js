'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('order_status', [
            { name: "Pending" },
            { name: "Payment in process" },
            { name: "Payment accepted" },
            { name: "Payment rejected" },
            { name: "Ready for dispatch" },
            { name: "Dispatched" },
            { name: "Delivered" },
            { name: "Cancelled" },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('order_status', null, {});
    }
};
