import { getDailyTimetable, getUsername, getStatusFromUid, getWeeklyTimetable } from "../DB/ReadQueries.js";

const apiFunctions = {
    getWeekly: async(req, res, next) => {
        const payload = req.payload;
        const userID = payload.aud;
        const name = await getUsername(userID);
        const result = await getWeeklyTimetable(userID);
        res.status(200).send({data:{/*"user_id": userID, "username" : name[0].name, */"timetables": result}})
    },
    getDaily: async(req, res, next) => {
        const payload = req.payload;
        const userID = payload.aud;
        const name = await getUsername(userID);
        const result = await getDailyTimetable(userID);
        res.status(200).send({data:{/*"user_id": userID, "username" : name[0].name, */"timetables": result}})
    },
    searchPerson: async(req, res, next) => {
        const personUid = req.params.uid;
        const {id, name} = await getStatusFromUid(personUid);
        
        res.status(200).send({data:{/*"user_id": userDetails[0].id, */"username" : userDetails[0].name, "do_not_track": doNotTrack, "status" : status, "whereabouts" : whereabouts}})
    }
}

export default apiFunctions;