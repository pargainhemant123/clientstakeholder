'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Adding the new column 'phoneNumber'
    await queryInterface.addColumn('Clients', 'phoneNumber', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // Changing the 'salary' column type to DECIMAL(10, 2)
    await queryInterface.changeColumn('Clients', 'salary', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Removing the 'phoneNumber' column
    await queryInterface.removeColumn('Clients', 'phoneNumber');

    // Reverting the 'salary' column type back to INTEGER (or its previous type)
    await queryInterface.changeColumn('Clients', 'salary', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  }
};
