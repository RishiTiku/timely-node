import express from "express";
import authFunctions from "../Controllers/Auth.Controller.js";


const router = express.Router();

router.post('/register', authFunctions.register)

router.post('/login', authFunctions.login)

router.post('/refresh-token', authFunctions.refresh)

router.delete('/logout', authFunctions.logout);

export default router;
