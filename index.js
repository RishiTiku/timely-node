import { closePool } from './DB/Configuration.js';
import authRouter from './Routes/Auth.route.js';

import express from 'express';
import morgan from 'morgan';
import createError from 'http-errors';
import { verifyAccessToken } from './utils/jwt_helper.js';
import homeFunctions from './Controllers/Home.Controller.js';

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App running on http://127.0.0.1:${PORT}`);
})

app.get("/", verifyAccessToken, homeFunctions.homeGreeting)

app.use('/auth', authRouter)

app.use(homeFunctions.notFoundError)

app.use(homeFunctions.errorHandler)

async function interact(){
    try{
        // await dropAllTables();
        // await createTables();
        // var a = await bcrypt.hash(', 10)
        // console.log(a)
        // await registerUser("abcde", "1234")
            // .then();
        // await addSampleData();
        // await getWeeklyTimetable(2021700067)
        //     .then(timetable => {
        //         console.log("Weekly Timetable: ", timetable);
        //     })
        //     .catch(error => {
        //         console.error('Error retrieving timetable:', error);
        //     });
    }
    catch (error) {
        console.error('Error: ', error);
    }
    // } finally{
    //     closePool();
    // }
}

// interact();

process.on('SIGINT', homeFunctions.onSigint);