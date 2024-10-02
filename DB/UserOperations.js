import { pool } from './Configuration';
import { bcrypt } from 'bcrypt';

export const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
export const insertUserQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';

const registerUser = async (email, password) => {
    // Check if email already exists
    const [rows] = await pool.query(checkEmailQuery, [email]);
    if (rows.length > 0) {
        throw createHttpError.Conflict(`"${email}" is already registered.`);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    await pool.query(insertUserQuery, [email, hashedPassword]);

    return 'User registered successfully';
};