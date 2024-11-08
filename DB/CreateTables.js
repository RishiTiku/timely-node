import { pool } from './Configuration.js';

// Function to create the users table
export const createTableUsers = () => {
  return pool.query(
    `CREATE TABLE IF NOT EXISTS users (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      user_type ENUM('F', 'S', 'A') NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`
  );
};

// Function to create the user_data table
export const createTableStudentData = () => {
  return pool.query(
    `CREATE TABLE IF NOT EXISTS student_data (
      user_id INT PRIMARY KEY,
      college_uid BIGINT UNIQUE NOT NULL,
      name VARCHAR(255),
      semester INT,
      division INT,
      passout INT
    );`
  );
};

export const createTableFacultyData = () => {
  return pool.query(
    `CREATE TABLE IF NOT EXISTS faculty_data (
      user_id INT PRIMARY KEY,
      faculty_code VARCHAR(10) UNIQUE,
      faculty_name VARCHAR(255),
      default_room VARCHAR(63)
    );`
  );
}


// Function to create the subjects table
export const createTableSubjects = () => {
  return pool.query(
    `CREATE TABLE IF NOT EXISTS subjects (
      subject_id INT PRIMARY KEY AUTO_INCREMENT,
      subject_name VARCHAR(255) NOT NULL
    );`
  );
};

// Function to create the lab_batches table
export const createTableLabBatches = () => {
  return pool.query(
    `CREATE TABLE IF NOT EXISTS lab_batches (
      subject_id INT NOT NULL,
      batch_id INT NOT NULL DEFAULT 0,
      batch_name VARCHAR(255) DEFAULT NULL,
      PRIMARY KEY (subject_id, batch_id)
    );`
  );
};

// Function to create the lecture_batches table
export const createTableLectureBatches = () => {
  return pool.query(
    `CREATE TABLE IF NOT EXISTS lecture_batches (
      subject_id INT NOT NULL,
      batch_id INT NOT NULL DEFAULT 0,
      batch_name VARCHAR(255) DEFAULT NULL,
      PRIMARY KEY (subject_id, batch_id)
    );`
  );
};

// Mapping between Students and Subject batches
export const createTableStudentsSubjects = () => {
  return pool.query(
    `CREATE TABLE IF NOT EXISTS students_subjects (
      user_id INT NOT NULL,
      subject_id INT NOT NULL,
      lecture_batch_id INT DEFAULT 0,
      lab_batch_id INT DEFAULT 0,
      PRIMARY KEY (user_id, subject_id)
    );`
  );
};

// Function to create the timetable table
export const createTableTimetable = () => {
  return pool.query(
    `CREATE TABLE IF NOT EXISTS timetable (
      timetable_id INT AUTO_INCREMENT PRIMARY KEY,
      start_time TIME NOT NULL,
      end_time TIME NOT NULL,
      day ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
      subject_id INT NOT NULL,
      lecture_batch_id INT DEFAULT NULL,
      lab_batch_id INT DEFAULT NULL,
      room_number VARCHAR(255),
      faculty_id INT NULL,
      UNIQUE (start_time, end_time, day, subject_id, lab_batch_id)
    );`
  );
};

export const createTableStatus = () => {
  return pool.query(
    `CREATE TABLE IF NOT EXISTS status (
      user_id INT PRIMARY KEY,
      status ENUM('DO_NOT_TRACK', 'BUSY', 'AVAILABLE', 'ON_LEAVE') DEFAULT 'AVAILABLE'
    );`
  );
}



// Adjusted createTables function to handle dependencies properly
export async function createTables() {
  try {
    await createTableUsers();              // No dependencies
    await createTableStudentData();        // No dependencies
    await createTableSubjects();           // No dependencies
    await createTableLabBatches();         // Depends on Subjects
    await createTableLectureBatches();     // Depends on Subjects
    await createTableStudentsSubjects();   // Depends on UserData, LabBatches
    await createTableTimetable();          // Depends on LabBatches
    await createTableFacultyData();
    await createTableStatus();

    console.log('All tables created successfully!');
  } catch (err) {
    console.log('Error: ', err);
  }
}


























































// // Function to create the timetable_exceptions table
// export const createTableTimetableExceptions = () => {
//   return pool.query(
//     `CREATE TABLE IF NOT EXISTS timetable_exceptions (
//       exception_id INT AUTO_INCREMENT PRIMARY KEY,
//       date DATE NOT NULL,
//       timetable_id INT NOT NULL,
//       new_date DATE,
//       new_start_time TIME,
//       new_end_time TIME,
//       reason VARCHAR(255),
//       UNIQUE (date, timetable_id)
//     );`
//   );
// };

// // Function to create the special_timetable table
// export const createTableSpecialTimetable = () => {
//   return pool.query(
//     `CREATE TABLE IF NOT EXISTS special_timetable (
//       special_timetable_id INT AUTO_INCREMENT PRIMARY KEY,
//       date DATE NOT NULL,
//       start_time TIME NOT NULL,
//       end_time TIME NOT NULL,
//       subject_id INT NOT NULL,
//       lecture_batch_id INT NOT NULL DEFAULT 0,
//       lab_batch_id INT NOT NULL DEFAULT 0,
//       room_number VARCHAR(255),
//       reason VARCHAR(255)
//     );`
//   );
// };

// // Function to create the holidays table
// export const createTableHolidays = () => {
//   return pool.query(
//     `CREATE TABLE IF NOT EXISTS holidays (
//       holiday_id INT AUTO_INCREMENT PRIMARY KEY,
//       date DATE NOT NULL UNIQUE,
//       start_time TIME DEFAULT '00:00:00',
//       end_time TIME DEFAULT '23:59:59',
//       affects_sem INT DEFAULT 0,
//       affects_div INT DEFAULT 0,
//       reason VARCHAR(255),
//       UNIQUE (date, start_time, end_time)
//     );`
//   );
// };