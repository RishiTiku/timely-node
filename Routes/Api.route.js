import express from "express";
import { verifyAccessToken } from '../utils/jwt_helper.js';
import apiFunctions from "../Controllers/Api.Controller.js";


const router = express.Router();

router.get('/getWeekly', apiFunctions.getWeekly);

router.get('/searchPerson/:uid', apiFunctions.searchPerson);

// announcements


export default router;
