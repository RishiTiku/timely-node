import createHttpError from "http-errors";
import { isValidPassword, registerUser } from "../DB/UserOperations.js";
import { authSchema } from "../utils/validation_schema.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt_helper.js'
import client from "../utils/init_redis.js";

const authFunctions = {
    register: async (req, res, next) =>{
        try {
            const result = await authSchema.validateAsync(req.body);
            console.log(req.body);
            const user = await registerUser(result.email, result.password, result.user_type);
            console.log(user);
            const accessToken = await signAccessToken(user.user_id);
            const refreshToken = await signRefreshToken(user.user_id);
            res.status(201).send({data:{ accessToken, refreshToken }});
        } catch (error) {
            if(error.isJoi === true) error.status = 422;
            next(error)
        }
    },
    login: async (req, res, next) =>{
        try {
            const result = await authSchema.validateAsync(req.body);
            const {isValid, userID} = await isValidPassword(result.email, result.password);
            if( !isValid ) throw createHttpError.Unauthorized('Invalid Username or Password');
            
            const accessToken = await signAccessToken(userID);
            const refreshToken = await signRefreshToken(userID);
    
            return res.status(200).json({data:{ accessToken, refreshToken }});
        } catch (error) {
            if(error.isJoi === true) return next(createHttpError.BadRequest("Invalid Username or Password."));
            next(error)
        }
    },
    refresh: async (req, res, next) =>{
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) throw createHttpError.BadRequest();
            const userID = await verifyRefreshToken(refreshToken);
            const accessToken = await signAccessToken(userID);
            const newRefreshToken = await signRefreshToken(userID);
            res.send({data:{ "accessToken": accessToken, "refreshToken":  newRefreshToken }});
            
        } catch (error) {
            next(error);
        }
    },
    logout: async (req, res, next) => {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) throw createHttpError.BadRequest();
            const userID = await verifyRefreshToken(refreshToken);
            const result = await client.del(String(userID));
    
            if (result === 1) {
                res.status(204).send({data:{}, message: "Logged out User Successfully!"}); // No content
            } else {
                throw createHttpError.InternalServerError();
            }
        } catch (error) {
            next(error); // Handle errors
        }
    }  
} 

export default authFunctions;