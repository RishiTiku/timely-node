import { closePool } from './DB/Configuration.js';
import { createTables }  from './DB/CreateTables.js';
import { dropAllTables } from './DB/DeleteTables.js';
import { addSampleData } from './DB/InsertSampleData.js';
import { getWeeklyTimetable } from './DB/Queries.js';
import { router } from './Routes/Auth.route.js';

import express from 'express';
import morgan from 'morgan';
import createError from 'http-errors';
import { config } from 'dotenv'


const app = express();
app.use(morgan('dev'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App running on http://127.0.0.1:${PORT}`);
})

app.get("/", async (req, res, next) => {
    res.send('Hello from express.');
})

app.use('/auth', router)

app.use(async (req, res, next) => {
    next(createError.NotFound())
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

async function interact(){
    try{
        await dropAllTables();
        await createTables();
        await addSampleData();
        await getWeeklyTimetable(2021700067)
            .then(timetable => {
                console.log("Weekly Timetable: ", timetable);
            })
            .catch(error => {
                console.error('Error retrieving timetable:', error);
            });
    }
    catch (error) {
        console.error('Error: ', error);
    } finally{
        closePool();
    }
}

//interact();

process.on('SIGINT', async () => {
    console.log('Closing database connection pool...');
    await closePool();
    console.log('Database connection pool closed. Exiting...');
    process.exit(0);
});