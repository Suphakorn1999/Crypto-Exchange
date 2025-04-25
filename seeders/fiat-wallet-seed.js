'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('fiat_wallet', [
      {
        user_id: 1,
        currency_id: 1,  // USD
        balance: 5000.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        currency_id: 4,  // THB
        balance: 150000.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        currency_id: 1,  // USD
        balance: 3000.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        currency_id: 2,  // EUR
        balance: 2500.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fiat_wallet', null, {});
  }
};