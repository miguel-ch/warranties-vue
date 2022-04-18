import sqlite3 from "sqlite3";
import { open } from "sqlite";

// The function that opens the db
export const openDb = async () => {
    let db = await open({
        filename: './garantias.db',
        driver: sqlite3.Database
    });
    db.get("PRAGMA foreign_keys = ON");
    return db;
}