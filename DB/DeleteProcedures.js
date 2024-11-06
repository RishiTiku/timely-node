import { pool } from "./Configuration.js";

export const dropProcedureGetTimetableForUser = async () => {
    return pool.query(`DROP PROCEDURE IF EXISTS GetTimetableForUser;`);
}

export const dropAllProcedures = async () => {
    try {
        await dropProcedureGetTimetableForUser();
        console.log('All procedures dropped successfully.');
    } catch (error) {
        console.error('Error dropping procedures: ', error);
    }
}