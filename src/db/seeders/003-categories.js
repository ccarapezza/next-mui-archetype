'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_category', [
        { id:1, name: 'Ropa', parentId: null },
        { id:2, name: 'Remera', parentId: 1 },
        { id:3, name: 'Gorra', parentId: 1 },
        { id:4, name: 'Grow', parentId: null },
        { id:5, name: 'Cultivo', parentId: 4 },
        { id:6, name: 'Parafernalia', parentId: 4 },
        { id:7, name: 'Fertilizante', parentId: 5 },
        { id:8, name: 'Sustrato', parentId: 5 },
        { id:9, name: 'Merchandising', parentId: null },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_category', null, {});
  }
};
