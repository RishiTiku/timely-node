// dbConfig.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('timelydatabase', 'timekeeper', '1234', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
