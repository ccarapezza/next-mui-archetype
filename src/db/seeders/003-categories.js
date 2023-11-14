'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_category', [
        { id:1, name: 'Hombre', parentId: null },
        { id:2, name: 'Remera', parentId: 1 },
        { id:3, name: 'Pantalón', parentId: 1 },
        { id:4, name: 'Mujer', parentId: null },
        { id:5, name: 'Remera', parentId: 4 },
        { id:6, name: 'Pantalón', parentId: 4 },
        { id:7, name: 'Kids', parentId: null },
        { id:8, name: 'Remera', parentId: 7 },
        { id:9, name: 'Pantalón', parentId: 7 },
        { id:10, name: 'Sale', parentId: null },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_category', null, {});
  }
};
