import { pool } from './Configuration.js';

export const createProcedureGetTimetableForUser = async () => {
    return pool.query(
      `
      CREATE PROCEDURE GetTimetableForUser(IN userId INT)
      BEGIN
          DECLARE userType VARCHAR(20);
      
          -- Retrieve the user_type for the given user
          SELECT user_type INTO userType FROM users WHERE user_id = userId;
      
          -- Check user type and execute the appropriate query
          IF userType = 'F' THEN
              -- Execute the query for faculty
              SELECT t.timetable_id, t.start_time, t.end_time, t.day, s.subject_name, 
                     lcb.batch_name AS lec_batch_name, lab.batch_name AS lab_batch_name, 
                     t.room_number, fd.faculty_code
              FROM timetable t
              INNER JOIN subjects s 
                  ON t.subject_id = s.subject_id
              LEFT JOIN lecture_batches lcb 
                  ON t.subject_id = lcb.subject_id 
                  AND lcb.batch_id = t.lecture_batch_id
              LEFT JOIN lab_batches lab 
                  ON t.subject_id = lab.subject_id 
                  AND lab.batch_id = t.lab_batch_id
              LEFT JOIN faculty_data fd 
                  ON t.faculty_id = fd.user_id
              WHERE t.faculty_id = userId
              ORDER BY t.day, t.start_time, t.end_time ASC;
      
          ELSEIF userType = 'S' THEN
              -- Execute the query for students
              SELECT t.timetable_id, t.start_time, t.end_time, t.day, s.subject_name, 
                     lcb.batch_name AS lec_batch_name, lab.batch_name AS lab_batch_name, 
                     t.room_number, fd.faculty_code
              FROM timetable t
              INNER JOIN students_subjects ss 
                  ON t.subject_id = ss.subject_id 
                  AND (t.lecture_batch_id = ss.lecture_batch_id OR t.lab_batch_id = ss.lab_batch_id)
              INNER JOIN subjects s 
                  ON t.subject_id = s.subject_id
              LEFT JOIN lecture_batches lcb 
                  ON t.subject_id = lcb.subject_id 
                  AND lcb.batch_id = t.lecture_batch_id
              LEFT JOIN lab_batches lab 
                  ON t.subject_id = lab.subject_id 
                  AND lab.batch_id = t.lab_batch_id
              LEFT JOIN faculty_data fd 
                  ON t.faculty_id = fd.user_id
              WHERE ss.user_id = userId
              ORDER BY t.day, t.start_time, t.end_time ASC;
      
          ELSE
              -- Handle unexpected user type if needed
              SELECT 'Error: Unknown user type' AS Error;
          END IF;
      END;      
      `
    );
  }

export const createProcedures = async () => {
    try {
        await createProcedureGetTimetableForUser();
        console.log('All procedures created successfully!');
      } catch (err) {
        console.log('Error: ', err);
    }
}