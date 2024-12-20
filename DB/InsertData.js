import { pool } from './Configuration.js';

// Function to insert a single user
export const insertUsers = async (email, password, user_type) => {
    const query = `INSERT INTO users (email, password, user_type) VALUES (?, ?, ?)`;
    try {
        await pool.query(query, [email, password, user_type]);
        console.log("User inserted successfully.");
    } catch (error) {
        console.error("Error inserting user: ", error);
    }
};

// Function to insert multiple user_data records
export const insertStudentData = async (userData) => {
    const query = `INSERT INTO student_data (user_id, college_uid, name, semester, division, passout) VALUES ?`;
    try {
        await pool.query(query, [userData]);
        console.log("User data inserted successfully.");
    } catch (error) {
        console.error("Error inserting user data: ", error);
    }
};

export const insertFacultyData = async (facultyData) => {
    const query = `INSERT INTO faculty_data (user_id, faculty_code, faculty_name, default_room) VALUES ?`;
    try {
        await pool.query(query, [facultyData]);
        console.log("User data inserted successfully.");
    } catch (error) {
        console.error("Error inserting user data: ", error);
    }
};

// Function to insert multiple subjects
export const insertSubjects = async (subjects) => {
    const query = `INSERT INTO subjects (subject_name) VALUES ?`;
    try {
        await pool.query(query, [subjects]);
        console.log("Subjects inserted successfully.");
    } catch (error) {
        console.error("Error inserting subjects: ", error);
    }
};

// Function to insert multiple lab_batches
export const insertLabBatches = async (batches) => {
    const query = `INSERT INTO lab_batches (subject_id, batch_id, batch_name) VALUES ?`;
    try {
        await pool.query(query, [batches]);
        console.log("Lab batches inserted successfully.");
    } catch (error) {
        console.error("Error inserting lab batches: ", error);
    }
};

// Function to insert multiple lecture_batches
export const insertLectureBatches = async (batches) => {
    const query = `INSERT INTO lecture_batches (subject_id, batch_id, batch_name) VALUES ?`;
    try {
        await pool.query(query, [batches]);
        console.log("Lecture batches inserted successfully.");
    } catch (error) {
        console.error("Error inserting lecture batches: ", error);
    }
};

// Function to insert multiple entries into students_subjects
export const insertStudentsSubjects = async (entries) => {
    const query = `INSERT INTO students_subjects (user_id, subject_id, lecture_batch_id, lab_batch_id) VALUES ?`;
    try {
        await pool.query(query, [entries]);
        console.log("Student subjects inserted successfully.");
    } catch (error) {
        console.error("Error inserting student subjects: ", error);
    }
};

// Function to insert multiple timetable entries
export const insertTimetableEntries = async (entries) => {
    const query = `INSERT INTO timetable (start_time, end_time, day, subject_id, lecture_batch_id, lab_batch_id, room_number, faculty_id) VALUES ?`;
    try {
        await pool.query(query, [entries]);
        console.log("Timetable entries inserted successfully.");
    } catch (error) {
        console.error("Error inserting timetable entries: ", error);
    }
};


export const insertStatus = async (status) => {
    const query = `INSERT INTO status (user_id, status) VALUES ?`;
    try {
        await pool.query(query, [status]);
        console.log("Lecture batches inserted successfully.");
    } catch (error) {
        console.error("Error inserting lecture batches: ", error);
    }
};
