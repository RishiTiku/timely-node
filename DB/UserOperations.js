import { pool } from './Configuration.js';
import bcrypt from "bcrypt";
import createHttpError from 'http-errors';
import { insertUsers } from './InsertData.js';


export const findUser = async (email) => {
    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await pool.query(checkEmailQuery, [email]);
    if (rows.length > 0) {
        return rows[0];
    }
    return false;
}

// export const insertUserQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';

export const registerUser = async (email, password, user_type) => {
    try {
        // // Check if email already exists
        const userExists = await findUser(email);
        if (userExists) {
            throw createHttpError.Conflict(`${email} is already registered.`);
        }
        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);
        await insertUsers(email, hashedPassword, user_type);
        const savedUser = await findUser(email);
        console.log('saved user', savedUser);
        // Return the saved user tuple
        return savedUser;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const isValidPassword = async (email, plainPassword) => {
    try {
        // Find the user by email
        const user = await findUser(email);

        if (!user) {
            throw createHttpError.NotFound("User Not Registered.");
        }

        // Compare password
        const isValid = await bcrypt.compare(plainPassword, user.password);
        const userID = user.id
        return {isValid, userID};
    } catch (error) {
        console.error('Error during password validation:', error);
        throw error;
    }
};
