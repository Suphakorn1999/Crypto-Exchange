'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('currency', [
      {
        currency_name: 'US Dollar',
        currency_symbol: 'USD',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        currency_name: 'Euro',
        currency_symbol: 'EUR',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        currency_name: 'Japanese Yen',
        currency_symbol: 'JPY',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        currency_name: 'Thai Baht',
        currency_symbol: 'THB',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('currency', null, {});
  }
};