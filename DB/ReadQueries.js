import { pool } from './Configuration.js';

export const getWeeklyTimetable = async (userID) => {
        const query = 
        `
            SELECT t.start_time, t.end_time, t.day, s.subject_name, lcb.batch_name as lec_batch_name, lab.batch_name as lab_batch_name, t.room_number, fd.faculty_code
            FROM
                timetable t 
                INNER JOIN students_subjects ss 
                        ON t.subject_id = ss.subject_id AND (t.lecture_batch_id = ss.lecture_batch_id OR t.lab_batch_id = ss.lab_batch_id)
                INNER JOIN subjects s 
                        ON t.subject_id = s.subject_id 
                LEFT JOIN lecture_batches lcb
                        ON t.subject_id = lcb.subject_id AND lcb.batch_id = t.lecture_batch_id
                LEFT JOIN lab_batches lab 
                        ON t.subject_id = lab.subject_id AND lab.batch_id = t.lab_batch_id
                LEFT JOIN faculty_data fd
                        ON t.faculty_id = fd.user_id
            WHERE 
                ss.user_id = ?
            ORDER BY t.day, t.start_time, t.end_time ASC
            ;
        `;
    
        try {
            const [results] = await pool.query(query, [userID]);
            return results;
        } catch (error) {
            console.error("Error fetching weekly timetable: ", error);
            throw error;
        }
    };
    
    export const getUsername = async (userID) => {
        const query = 
        `
            SELECT name FROM user_data WHERE id = ? LIMIT 1;
        
        `;
    
        try {
            const [results] = await pool.query(query, [userID]);
            return results;
        } catch (error) {
            console.error("Error fetching user details: ", error);
            throw error;
        }
    };

    // gives result for both students and faculty alike
    export const getWeeklyProcedure = async (userID) => {
        const query = 
        `
            CALL GetTimetableForUser(?);
        `;
    
        try {
            const [results] = await pool.query(query, [userID]);
            return results[0];
        } catch (error) {
            console.error("Error fetching weekly timetable: ", error);
            throw error;
        }
    };
    
    
















    
// export const getDailyTimetable = async (userID) => {
//         const query = 
//         `
//             WITH 
//                 college_uid AS (SELECT college_uid FROM user_data WHERE id = ? LIMIT 1),
//                 subject_mapping AS (SELECT subject_id, lecture_batch_id, lab_batch_id 
//                 FROM 
//                         students_subjects ss INNER JOIN college_uid u ON ss.uid = u.college_uid)
//             SELECT
//                 t.start_time, t.end_time, t.day, s.subject_name, t.room_number, l1.batch_name as lecture_batch_name, l2.batch_name as lab_batch_name
//             FROM 
//                 timetable t 
//                 LEFT JOIN subject_mapping sm ON t.subject_id = sm.subject_id AND (t.lecture_batch_id = sm.lecture_batch_id OR t.lab_batch_id = sm.lab_batch_id)
//                 INNER JOIN subjects s ON sm.subject_id = s.subject_id  
//                 LEFT JOIN lecture_batches l1 ON l1.subject_id = t.subject_id AND l1.batch_id = t.lecture_batch_id
//                 LEFT JOIN lab_batches l2 ON l2.subject_id = t.subject_id AND l2.batch_id = t.lab_batch_id 
//             WHERE 
//                 t.day = DAYNAME(CURDATE())
//             ORDER BY t.day, t.start_time ASC
//                         ;

        
//         `;
    
//         try {
//             const [results] = await pool.query(query, [userID]);
//             return results;
//         } catch (error) {
//             console.error("Error fetching daily timetable: ", error);
//             throw error;
//         }
//     };


    
        
    
        