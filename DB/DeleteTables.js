import { pool } from './Configuration.js';

// Function to drop the users table
export const dropTableUsers = () => {
    return pool.query(`DROP TABLE IF EXISTS users;`);
};

// Function to drop the user_data table
export const dropTableStudentData = () => {
    return pool.query(`DROP TABLE IF EXISTS student_data;`);
};

export const dropTableFacultyData = () => {
    return pool.query(`DROP TABLE IF EXISTS faculty_data;`);
};

// Function to drop the subjects table
export const dropTableSubjects = () => {
    return pool.query(`DROP TABLE IF EXISTS subjects;`);
};

// Function to drop the lab_batches table
export const dropTableLabBatches = () => {
    return pool.query(`DROP TABLE IF EXISTS lab_batches;`);
};

// Function to drop the lecture_batches table
export const dropTableLectureBatches = () => {
    return pool.query(`DROP TABLE IF EXISTS lecture_batches;`);
};

// Function to drop the students_subjects table
export const dropTableStudentsSubjects = () => {
    return pool.query(`DROP TABLE IF EXISTS students_subjects;`);
};

// Function to drop the timetable table
export const dropTableTimetable = () => {
    return pool.query(`DROP TABLE IF EXISTS timetable;`);
};

export const dropTableStatus = () => {
    return pool.query(`DROP TABLE IF EXISTS status;`);
};



// Function to drop all tables
export async function dropAllTables() {
    try {
        
        await dropTableTimetable();
        await dropTableStudentsSubjects();
        await dropTableLabBatches();
        await dropTableLectureBatches();
        await dropTableSubjects();
        await dropTableStudentData();
        await dropTableUsers();
        await dropTableFacultyData();
        await dropTableStatus();

        console.log('All tables dropped successfully.');
    } catch (error) {
        console.error('Error dropping tables: ', error);
    }
}


















































































































// // Function to drop the timetable_exceptions table
// export const dropTableTimetableExceptions = () => {
//     return pool.query(`DROP TABLE IF EXISTS timetable_exceptions;`);
// };

// // Function to drop the special_timetable table
// export const dropTableSpecialTimetable = () => {
//     return pool.query(`DROP TABLE IF EXISTS special_timetable;`);
// };

// // Function to drop the holidays table
// export const dropTableHolidays = () => {
//     return pool.query(`DROP TABLE IF EXISTS holidays;`);
// };