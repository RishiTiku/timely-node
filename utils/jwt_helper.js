import JWT from 'jsonwebtoken';
import createHttpError from 'http-errors';

export const signAccessToken = (userID) => {
    return new Promise((resolve, reject) => {
        const payload = {};
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: "1h",
            issuer : "node-timely",
            audience : `${userID}`
        }
        JWT.sign(payload, secret, options, (error, token) => {
            if(error){
                console.log(error.message);
                reject(createHttpError.InternalServerError());
            }
            resolve(token);
        });

    })
}

export const verifyAccessToken = (req, res, next) => {
    const AuthHeader = req.headers['authorization'];
    if (!AuthHeader) return next(createHttpError.Unauthorized());
    const bearerToken = AuthHeader.split(' ');
    const token = bearerToken[1];
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
        if(error){
            const message = (error.name === 'JsonWebTokenError') ? 'Unauthorized' : error.message;
            return next(createHttpError.Unauthorized(message));
        }   

        req.payload = payload;
        next();
    });
}

export const signRefreshToken = (userID) => {
    return new Promise((resolve, reject) => {
        const payload = {};
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const options = {
            expiresIn: "1y",
            issuer : "node-timely",
            audience : `${userID}`
        }
        JWT.sign(payload, secret, options, (error, token) => {
            if(error){
                console.log(error.message);
                reject(createHttpError.InternalServerError());
            }
            resolve(token);
        });

    })
}

export const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, payload) => {
        if(error){
            const message = (error.name === 'JsonWebTokenError') ? 'Unauthorized' : error.message;
            return reject(createHttpError.Unauthorized(message));
        }   
        const userID = payload.aud;
        resolve(userID)
    });})
}