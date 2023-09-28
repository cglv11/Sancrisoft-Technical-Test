const sqlite3 = require('sqlite3').verbose();

let instance = null;

class DbSingleton {
    constructor() {
        if (!instance) {
            instance = new sqlite3.Database('./test.db', (err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log('Connected to the in-memory SQlite database.');
            });
        }
        
        return instance;
    }
}

const db = new DbSingleton();

module.exports = db;