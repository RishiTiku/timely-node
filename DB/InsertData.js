import { pool } from './Configuration.js';

// Function to insert multiple students
export const insertStudents = (students) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO Students (UID, Name) VALUES ?`;
        pool.query(query, [students], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

export const insertUsers = (Users) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO Users (UID, email, password_hash, name) VALUES ?`;
        pool.query(query, [students], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Function to insert multiple subjects
export const insertSubjects = (subjects) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO Subjects (SubjectID, SubjectName) VALUES ?`;
        pool.query(query, [subjects], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Function to insert multiple batches
export const insertBatches = (batches) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO Batches (SubjectID, BatchID, BatchName) VALUES ?`;
        pool.query(query, [batches], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Function to insert multiple entries into Students_Subjects
export const insertStudentsSubjects = (entries) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO Students_Subjects (UID, SubjectID, BatchID) VALUES ?`;
        pool.query(query, [entries], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// Function to insert multiple timetable entries
export const insertTimetableEntries = (entries) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO Timetable (StartTime, EndTime, Day, SubjectID, BatchID, RoomNumber) VALUES ?`;
        pool.query(query, [entries], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};