const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

export const Subjects = sequelize.define('subjects', {
    SubjectID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    SubjectName: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  