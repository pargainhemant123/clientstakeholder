'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
    }
  }

  Client.init({
    clientId: {
      type: DataTypes.INTEGER, // Change type to INTEGER
      autoIncrement: true, // Auto increment for clientId
      primaryKey: true // Set as primary key
    },
    clientName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2), // Change to DECIMAL with precision
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING, // New field
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER, // New column
      allowNull: true // Change to false if required
    }
  }, {
    sequelize,
    modelName: 'Client',
  });

  return Client;
};
