import Joi from "joi";

export const authSchema = Joi.object({ 
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(2).required(), //Change this to 8 - minimum!!!!
    user_type: Joi.string()
})

