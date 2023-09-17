const sqlite3 = require('sqlite3').verbose();

// Connect to a database (test.db). If it doesn't exist, a new one will be created.
const db = new sqlite3.Database('./test.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

module.exports = db;
