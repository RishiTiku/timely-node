const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

export const UserData = sequelize.define('user_data', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    college_uid: DataTypes.BIGINT,
    name: DataTypes.STRING,
    semester: DataTypes.INTEGER,
    division: DataTypes.INTEGER,
  });