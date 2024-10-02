import express from "express";
import createHttpError from "http-errors";
import { registerUser } from "../DB/UserOperations";

export const router = express.Router();

router.post('/register', async (req, res, next) =>{
    try {
        const {email, password} = req.body;
        if (!email || !password) throw createHttpError.BadRequest();

        const message = registerUser(email, password, next);
        res.status(201).send({message});

    } catch (error) {
        next(error)
    }
})

router.post('/login', async (req, res, next) =>{
    res.send('Login');
})

router.post('/refresh-token', async (req, res, next) =>{
    res.send('Refresh-token');
})

router.delete('/logout', async (req, res, next) =>{
    res.send('Logout');
})