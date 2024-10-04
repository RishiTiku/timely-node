import { pool } from './Configuration.js';

// Function to create the users table
export const createTableUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`
    , (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

// Function to create the user_tokens table
export const createTableUserTokens = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `CREATE TABLE IF NOT EXISTS user_tokens (
        user_id INT NOT NULL,
        access_token VARCHAR(512) NOT NULL,
        refresh_token VARCHAR(512) NOT NULL,
        access_token_expires TIMESTAMP NOT NULL,
        refresh_token_expires TIMESTAMP NOT NULL,
        UNIQUE(user_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );`
    , (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

// Function to create the user_data table
export const createTableUserData = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `CREATE TABLE IF NOT EXISTS user_data (
        id INT PRIMARY KEY,
        college_uid BIGINT UNIQUE NOT NULL,
        name VARCHAR(255),
        semester INT,
        division INT
      );`
    , (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

// Function to create the subjects table
export const createTableSubjects = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `CREATE TABLE IF NOT EXISTS Subjects (
        SubjectID INT PRIMARY KEY,
        SubjectName VARCHAR(255) NOT NULL
      );`
    , (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

// Function to create the lab_batches table
export const createTableLabBatches = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `CREATE TABLE IF NOT EXISTS LabBatches (
        SubjectID INT NOT NULL,
        BatchID INT NOT NULL DEFAULT 0,
        BatchName VARCHAR(255) DEFAULT NULL,
        PRIMARY KEY (SubjectID, BatchID),
        FOREIGN KEY (SubjectID) REFERENCES Subjects(SubjectID) ON DELETE CASCADE
      );`
    , (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

// Function to create the lecture_batches table
export const createTableLectureBatches = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `CREATE TABLE IF NOT EXISTS LectureBatches (
        SubjectID INT NOT NULL,
        BatchID INT NOT NULL DEFAULT 0,
        BatchName VARCHAR(255) DEFAULT NULL,
        PRIMARY KEY (SubjectID, BatchID),
        FOREIGN KEY (SubjectID) REFERENCES Subjects(SubjectID) ON DELETE CASCADE
      );`
    , (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

// Function to create the students_subjects table
export const createTableStudentsSubjects = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `CREATE TABLE IF NOT EXISTS Students_Subjects (
        UID BIGINT NOT NULL,
        SubjectID INT NOT NULL,
        LectureBatchID INT DEFAULT 0,
        LabBatchID INT NOT NULL DEFAULT 0,
        PRIMARY KEY (UID, SubjectID),
        FOREIGN KEY (SubjectID, LabBatchID) REFERENCES LabBatches(SubjectID, BatchID) ON DELETE CASCADE
      );`
    , (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

// Function to create the timetable table
export const createTableTimetable = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `CREATE TABLE IF NOT EXISTS Timetable (
        TimetableID INT AUTO_INCREMENT PRIMARY KEY,
        StartTime TIME NOT NULL,
        EndTime TIME NOT NULL,
        Day ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
        SubjectID INT NOT NULL,
        LectureBatchID INT DEFAULT NULL,
        LabBatchID INT DEFAULT NULL,
        RoomNumber VARCHAR(255),
        UNIQUE (StartTime, EndTime, Day, SubjectID, LabBatchID),
        FOREIGN KEY (SubjectID, LabBatchID) REFERENCES LabBatches(SubjectID, BatchID) ON DELETE CASCADE
      );`
    , (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

// Function to create the timetable_exceptions table
export const createTableTimetableExceptions = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `CREATE TABLE IF NOT EXISTS TimetableExceptions (
        ExceptionID INT AUTO_INCREMENT PRIMARY KEY,
        Date DATE NOT NULL,
        TimetableID INT NOT NULL,
        NewDate DATE,
        NewStartTime TIME,
        NewEndTime TIME,
        Reason VARCHAR(255),
        UNIQUE (Date, TimetableID),
        FOREIGN KEY (TimetableID) REFERENCES Timetable(TimetableID)
      );`
    , (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

// Function to create the special timetable table
export const createTableSpecialTimetable = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `CREATE TABLE IF NOT EXISTS SpecialTimetable (
        SpecialTimetableID INT AUTO_INCREMENT PRIMARY KEY,
        Date DATE NOT NULL,
        StartTime TIME NOT NULL,
        EndTime TIME NOT NULL,
        SubjectID INT NOT NULL,
        LectureBatchID INT NOT NULL DEFAULT 0,
        LabBatchID INT NOT NULL DEFAULT 0,
        RoomNumber VARCHAR(255),
        Reason VARCHAR(255)
      );`
    , (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

// Function to create the holidays table
export const createTableHolidays = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `CREATE TABLE IF NOT EXISTS Holidays (
        HolidayID INT AUTO_INCREMENT PRIMARY KEY,
        Date DATE NOT NULL UNIQUE,
        StartTime TIME DEFAULT '00:00:00',
        EndTime TIME DEFAULT '23:59:59',
        Affects_sem INT DEFAULT 0,
        Affects_div INT DEFAULT 0,
        Reason VARCHAR(255),
        UNIQUE (Date, StartTime, EndTime)
      );`
    , (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

  
// Adjusted createTables function to handle dependencies properly
export async function createTables1() {
  try {
    await createTableUsers();              // No dependencies
    await createTableUserTokens();         // Depends on Users
    await createTableUserData();           // No dependencies
    await createTableSubjects();           // No dependencies
    await createTableLabBatches();         // Depends on Subjects
    await createTableLectureBatches();     // Depends on Subjects
    await createTableStudentsSubjects();   // Depends on UserData, LabBatches
    await createTableTimetable();          // Depends on LabBatches
    await createTableTimetableExceptions(); // Depends on Timetable
    await createTableSpecialTimetable();   // No dependencies
    await createTableHolidays();           // No dependencies

    console.log('All tables created successfully!');
  } catch (err) {
    console.log('Error: ', err);
  }
}