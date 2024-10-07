
const homeFunctions = {
    homeGreeting: async (req, res, next) => {
        // console.log(req.headers['authorization']);
        res.send('Hello from express.');
    },

    errorHandler: (err, req, res, next) => {
        res.status(err.status || 500)
        res.send({
            error: {
                status: err.status || 500,
                message: err.message
            }
        })
    },

    notFoundError: async (req, res, next) => {
        next(createError.NotFound())
    },

    onSigint: async () => {
        console.log('Closing database connection pool...');
        await closePool();
        console.log('Database connection pool closed. Exiting...');
        process.exit(0);
    }
}

export default homeFunctions;