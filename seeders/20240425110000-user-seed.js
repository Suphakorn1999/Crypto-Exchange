'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        username: 'pattama',
        email: 'pattama@example.com',
        password: 'hashedpassword1',
        phone: '0812345678',
        verifyStatus: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'john',
        email: 'john@example.com',
        password: 'hashedpassword2',
        phone: '0898765432',
        verifyStatus: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};