const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

export const LabBatches = sequelize.define('lab_batches', {
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
  