import authRouter from './Routes/Auth.route.js';

import express from 'express';
import morgan from 'morgan';
import createError from 'http-errors';
import { verifyAccessToken } from './utils/jwt_helper.js';
import homeFunctions from './Controllers/Home.Controller.js';
import apiRouter from './Routes/Api.route.js'
import { dropAllTables } from './DB/DeleteTables.js'
import { createTables } from './DB/CreateTables.js';
import { describeAllTables } from './DB/DescribeTables.js';
import { addSampleData } from './DB/InsertSampleData.js';
import { getWeeklyTimetable } from './DB/ReadQueries.js';

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3000;
const URL = process.env.RDS_HOSTNAME || '127.0.0.1';

app.listen(PORT, () => {
    console.log(`App running on http://${URL}:${PORT}`);
})

app.get("/", verifyAccessToken, homeFunctions.homeGreeting)

app.use("/api", verifyAccessToken, apiRouter);

app.use('/auth', authRouter)

app.use(homeFunctions.notFoundError)

app.use(homeFunctions.errorHandler)

async function interact(){
    try{
        await dropAllTables();
        await createTables();
        // describeAllTables();
        await addSampleData();
        const result = await getWeeklyTimetable('1');
        console.log(result)
    }
    catch (error) {
        console.error('Error: ', error);
    }
    // } finally{
    //     closePool();
    // }
}

interact();

// (async () => {
//     try {
//         await sequelize.sync({ force: true }); // Using force will drop tables if they exist
//         console.log("Database synced successfully.");
//     } catch (error) {
//         console.error("Error syncing database:", error);
//     }
//   })();



process.on('SIGINT', homeFunctions.onSigint);