const db = require("../utils/sqlite");

const createTable = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS vehicles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            city_mpg INTEGER,
            class TEXT NOT NULL,
            combination_mpg INTEGER,
            cylinders INTEGER,
            displacement INTEGER,
            drive TEXT,
            fuel_type TEXT,
            highway_mpg INTEGER,
            make TEXT NOT NULL,
            model TEXT NOT NULL,
            transmission TEXT,
            year INTEGER NOT NULL
        )
    `;

    db.run(query, [], (err) => {
        if (err) {
            console.error("Error creating vehicles table: ", err);
        } else {
            console.log("Vehicles table ready.");
        }
    });
}

module.exports = {
    createTable
};