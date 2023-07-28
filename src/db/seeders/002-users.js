'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /*
        await queryInterface.bulkInsert('users', [
            // Admin
            {
                id: 1,
                firstName: 'Admin',
                lastName: 'Admin',
                email: '',
                password: '',
                emailVerified: new Date(),
                image: '',
                createdAt: new Date(),
                updatedAt: new Date()
            },  
        ], {});
        */
    },

    async down(queryInterface, Sequelize) {
        /*
        await queryInterface.bulkDelete('users', null, {});
        */
    }
};
