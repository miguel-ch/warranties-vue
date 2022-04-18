class SQLiteHandler {
    static handle(err, next) {
        // Base error object
        let error = {
            code: 500,
            statusCode: 500,
            message: "Internal server error",
        };

        // Known errors
        console.log(err);
        if (err.code == "SQLITE_CONSTRAINT") {
            error.code = err.errno;
            error.statusCode = 400;
            error.message = "Information already exists";
        }

        // Continue
        next(error);
    }
}

export default SQLiteHandler;
