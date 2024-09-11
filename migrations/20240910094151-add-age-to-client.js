'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add 'age' column
    await queryInterface.addColumn('Clients', 'age', {
      type: Sequelize.INTEGER,
      allowNull: true // Change to false if you want to make it a required field
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove 'age' column
    await queryInterface.removeColumn('Clients', 'age');
  }
};
