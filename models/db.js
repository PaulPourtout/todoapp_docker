const client = require('pg').Client;

const db = new client({
    user: 'user1',
    host: 'db', // WHEN IN WEB CONTAINER
    // host: 'localhost',
    database: 'tododb',
    password: 'changeme',
    port: 5432
});

db.connect((err) => {
    try {
        console.log("DB connected");
    }
    catch (err) {
        return console.log('error', err);
    }
});

module.exports = db;