import { pool } from './Configuration.js';

export const getWeeklyTimetable = (studentID) => {
    return new Promise((resolve, reject) => {
        const query = 
        `
        WITH SubjectsBatches AS (
            SELECT SubjectID, BatchID
            FROM Students_Subjects
            WHERE UID = ?
        ),  
        TT AS (SELECT t.StartTime, t.EndTime, t.Day, t.SubjectID, t.BatchID, t.RoomNumber
        FROM Timetable t INNER JOIN SubjectsBatches sb
                ON t.SubjectID = sb.SubjectID AND (t.BatchID = sb.BatchID OR t.BatchID = 0))
        SELECT StartTime, EndTime, Day, SubjectName, BatchName, RoomNumber
        FROM TT t INNER JOIN Subjects s ON s.SubjectID = t.SubjectID
                  INNER JOIN Batches b ON t.SubjectID = b.SubjectID AND t.BatchID = b.BatchID    
        ORDER BY Day, StartTime, EndTime ASC    
                ;
                  
        `;
        pool.query(query, [studentID], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

        