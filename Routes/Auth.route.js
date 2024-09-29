import express from "express";

export const router = express.Router();

router.post('/register', async (req, res, next) =>{
    res.send('Register');
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