import { createPool } from "mysql2/promise";
import dotenv from 'dotenv/config';


// console.log(process.env)

// Create a connection pool
export const pool = createPool({
    connectionLimit: 10, // Limit to 10 concurrent connections
    host: process.env.RDS_HOSTNAME || '127.0.0.1',
    port: process.env.RDS_PORT || '3306',
    user: process.env.RDS_USERNAME || 'timekeeper',
    password: process.env.RDS_PASSWORD || '1234',
    database: process.env.RDS_DB_NAME || process.env.DB_NAME
});

// Function to close the pool
export const closePool = () => {
    return new Promise((resolve, reject) => {
        pool.end((err) => {
            if (err) return reject(err);
            resolve();
        });
    });
};
