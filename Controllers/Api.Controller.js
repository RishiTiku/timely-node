import { getWeeklyProcedure} from "../DB/ReadQueries.js";

const apiFunctions = {
    getWeekly: async(req, res, next) => {
        try {
            const payload = req.payload;
            const userID = payload.aud;
            const result = await getWeeklyProcedure(userID);
            res.status(200).send({data:{"timetables": result}})
        } catch(err) {
            next(err)
        }
    },
    searchPerson: async(req, res, next) => {
        const personUid = req.params.uid;
        const {id, name} = await getStatusFromUid(personUid);
        
        res.status(200).send({data:{/*"user_id": userDetails[0].id, */"username" : userDetails[0].name, "do_not_track": doNotTrack, "status" : status, "whereabouts" : whereabouts}})
    }
}

export default apiFunctions;