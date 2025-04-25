'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('crypto_wallet', [
      {
        user_id: 1,
        coin_id: 1, // Bitcoin
        balance: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        coin_id: 2, // Ethereum
        balance: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        coin_id: 1, // Bitcoin
        balance: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        coin_id: 3, // Binance Coin
        balance:  100,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('crypto_wallet', null, {});
  }
};