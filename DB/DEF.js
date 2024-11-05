import { pool } from './Configuration.js';

// Function to drop the Users table
export const dropTableUsers = () => {
    return new Promise((resolve, reject) => {
        pool.query(`DROP TABLE IF EXISTS users;`, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Function to drop the UserTokens table
export const dropTableUserTokens = () => {
    return new Promise((resolve, reject) => {
        pool.query(`DROP TABLE IF EXISTS user_tokens;`, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Function to drop the UserData table
export const dropTableUserData = () => {
    return new Promise((resolve, reject) => {
        pool.query(`DROP TABLE IF EXISTS user_data;`, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Function to drop the Subjects table
export const dropTableSubjects = () => {
    return new Promise((resolve, reject) => {
        pool.query(`DROP TABLE IF EXISTS Subjects;`, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Function to drop the LabBatches table
export const dropTableLabBatches = () => {
    return new Promise((resolve, reject) => {
        pool.query(`DROP TABLE IF EXISTS LabBatches;`, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Function to drop the LectureBatches table
export const dropTableLectureBatches = () => {
    return new Promise((resolve, reject) => {
        pool.query(`DROP TABLE IF EXISTS LectureBatches;`, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Function to drop the StudentsSubjects table
export const dropTableStudentsSubjects = () => {
    return new Promise((resolve, reject) => {
        pool.query(`DROP TABLE IF EXISTS Students_Subjects;`, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Function to drop the Timetable table
export const dropTableTimetable = () => {
    return new Promise((resolve, reject) => {
        pool.query(`DROP TABLE IF EXISTS Timetable;`, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Function to drop the TimetableExceptions table
export const dropTableTimetableExceptions = () => {
    return new Promise((resolve, reject) => {
        pool.query(`DROP TABLE IF EXISTS TimetableExceptions;`, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Function to drop the SpecialTimetable table
export const dropTableSpecialTimetable = () => {
    return new Promise((resolve, reject) => {
        pool.query(`DROP TABLE IF EXISTS SpecialTimetable;`, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Function to drop the Holidays table
export const dropTableHolidays = () => {
    return new Promise((resolve, reject) => {
        pool.query(`DROP TABLE IF EXISTS Holidays;`, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Function to drop all tables
export async function dropAllTables1() {
    try {
        await dropTableTimetableExceptions();
        await dropTableSpecialTimetable();
        await dropTableTimetable();
        await dropTableStudentsSubjects();
        await dropTableLabBatches();
        await dropTableLectureBatches();
        await dropTableSubjects();
        await dropTableUserTokens();
        await dropTableUserData();
        await dropTableUsers();
        await dropTableHolidays();

        console.log('All tables dropped successfully.');
    } catch (error) {
        console.error('Error dropping tables: ', error);
    }
}

// Call the function to drop all tables
// dropAllTables();
