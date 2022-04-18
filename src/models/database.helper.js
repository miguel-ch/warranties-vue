import { openDb } from "../database.js";
import SQLiteHandler from "./database.handler.js";

export const searchAllFromTable = (tableName, next) => {
    connectDatabase((db) => {
        db.all("SELECT * FROM " + tableName)
            .then((data) => next(null, data))
            .catch((err) => SQLiteHandler(err, next));
    });
};

export const searchQuery = (query, params, next) => {
    connectDatabase((db) => {
        db.get(query, params)
            .then((data) => next(null, data))
            .catch((err) => SQLiteHandler(err, next));
    });
};

export const modifyQuery = (query, params, next) => {
    connectDatabase((db) => {
        db.run(query, params)
            .then((data) => next(null, data))
            .catch((err) => SQLiteHandler.handle(err, next));
    });
};

// Main database connection and error handling
const connectDatabase = (next) => {
    openDb()
        .then((db) => next(db))
        .catch((err) => SQLiteHandler.handle(err, next));
};
