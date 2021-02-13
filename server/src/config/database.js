'use strict';
const Sequelize = require('sequelize');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const config = require('./db.config');

let connection;

(async () => {
  connection = new Sequelize(config);
  try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  User.init(connection);
  Product.init(connection);
})();

module.exports = connection;
