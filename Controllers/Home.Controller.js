import createHttpError from "http-errors";
import { closePool } from "../DB/Configuration.js";

const homeFunctions = {
    homeGreeting: async (req, res, next) => {
        // console.log(req.headers['authorization']);
        res.send({
            data: {},
            message: 'Hello From Timely!'
        });
    },

    errorHandler: (err, req, res, next) => {
        res.status(err.status || 500)
        res.send({
            data: {
                    error: {
                    status: err.status || 500
                    }
                },
            message: err.message
        })
    },

    notFoundError: async (req, res, next) => {
        next(createHttpError.NotFound())
    },

    onSigint: async () => {
        console.log('Closing database connection pool...');
        await closePool();
        console.log('Database connection pool closed. Exiting...');
        process.exit(0);
    }
}

export default homeFunctions;