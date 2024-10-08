import { getDailyTimetable, getUsername, getWeeklyTimetable } from "../DB/ReadQueries.js";

const apiFunctions = {
    getWeekly: async(req, res, next) => {
        const payload = req.payload;
        const userID = payload.aud;
        const name = await getUsername(userID);
        const result = await getWeeklyTimetable(userID);
        res.status(200).send({"user_id": userID, "username" : name[0].name, "timetables": result})
    },
    getDaily: async(req, res, next) => {
        const payload = req.payload;
        const userID = payload.aud;
        const name = await getUsername(userID);
        const result = await getDailyTimetable(userID);
        res.status(200).send({"user_id": userID, "username" : name[0].name, "timetables": result})
    }
}

export default apiFunctions;