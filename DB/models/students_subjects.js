const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

export const StudentsSubjects = sequelize.define('students_subjects', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    SubjectID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    LectureBatchID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    LabBatchID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id', 'SubjectID']
      }
    ]
  });
  