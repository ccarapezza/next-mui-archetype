'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // 1. Add column link
        await queryInterface.addColumn('product', 'link', { type: Sequelize.STRING, allowNull: false, defaultValue: 'CHANGE-IT' });
        // 2. Update column link
        const products = await queryInterface.sequelize.query('SELECT id, name FROM product where link = \'CHANGE-IT\'', { type: Sequelize.QueryTypes.SELECT });
        const productPromises = products.map(async product => {
            const linkBase = product.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/[^\w]/g, '-');
            let link = linkBase;
            let count = 0;
            while (await queryInterface.sequelize.query(`SELECT id FROM product WHERE link = '${link}'`, { type: Sequelize.QueryTypes.SELECT }).length > 0) {
                link = `${linkBase}-${++count}`;
            }
            await queryInterface.sequelize.query(`UPDATE product SET link = '${link}' WHERE id = ${product.id}`);
        });
        await Promise.all(productPromises);
        // 3. Add unique constraint to column link
        await queryInterface.addConstraint('product', {
            fields: ['link'],
            type: 'unique',
            name: 'product_link_unique'
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint('product', 'product_link_unique');
        await queryInterface.removeColumn('product', 'link');
    }
};
