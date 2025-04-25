'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('coin', [
      {
        coin_name: 'Bitcoin',
        coin_symbol: 'BTC',
        coin_price: 66000.75,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        coin_name: 'Ethereum',
        coin_symbol: 'ETH',
        coin_price: 3200.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        coin_name: 'Binance Coin',
        coin_symbol: 'BNB',
        coin_price: 550.3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('coin', null, {});
  }
};