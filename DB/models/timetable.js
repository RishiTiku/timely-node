const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

export const Timetable = sequelize.define('timetable', {
    TimetableID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    StartTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    EndTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    Day: {
      type: DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
      allowNull: false,
    },
    SubjectID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    LectureBatchID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    LabBatchID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    RoomNumber: DataTypes.STRING,
  }, {
    indexes: [
      {
        unique: true,
        fields: ['StartTime', 'EndTime', 'Day', 'SubjectID', 'LabBatchID']
      }
    ]
  });
  