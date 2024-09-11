'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Clients', [{
      clientName: 'John Doe',
      password: 'hashed_password_1',
      clientId: 'client_001',
      email: 'john.doe@example.com',
      salary: 50000.00,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      clientName: 'Jane Smith',
      password: 'hashed_password_2',
      clientId: 'client_002',
      email: 'jane.smith@example.com',
      salary: 60000.00,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Clients', null, {});
  }
};
