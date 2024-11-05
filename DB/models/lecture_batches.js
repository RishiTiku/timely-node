const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

export const LectureBatches = sequelize.define('lecture_batches', {
    SubjectID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    BatchID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    BatchName: {
      type: DataTypes.STRING,
      defaultValue: null,
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['SubjectID', 'BatchID']
      }
    ]
  });
  