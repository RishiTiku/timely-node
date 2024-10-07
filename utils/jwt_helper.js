import JWT from 'jsonwebtoken';
import createHttpError from 'http-errors';
import client from './init_redis.js';

const ONE_YEAR_SECONDS = 365*24*60*60;

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

export const signRefreshToken = async (userID) => {
    return new Promise((resolve, reject) => {
        const payload = {};
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const options = {
            expiresIn: "1y",
            issuer: "node-timely",
            audience: `${userID}`
        };

        JWT.sign(payload, secret, options, async (error, token) => {
            if (error) {
                console.log("JWT sign error:", error.message);
                return reject(createHttpError.InternalServerError());
            }

            try {
                // Use Redis client with promises
                await client.set(String(userID), String(token), {
                    EX: ONE_YEAR_SECONDS // Set expiration
                });
                console.log("sign refresh token resolved");
                return resolve(token);
            } catch (err) {
                console.log("Redis SET error:", err.message);
                return reject(createHttpError.InternalServerError());
            }
        });
    });
};

export const verifyRefreshToken = async (refreshToken) => {
    try {
        const payload = JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const userID = payload.aud;
        
        const storedToken = await client.get(String(userID));

        if (refreshToken === storedToken) {
            return userID;
        } else {
            throw createHttpError.Unauthorized();
        }
    } catch (error) {
        const message = (error.name === 'JsonWebTokenError') ? 'Unauthorized' : error.message;
        throw createHttpError.Unauthorized(message);
    }
};
