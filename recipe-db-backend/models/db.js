const mysql = require('mysql2');

// Create Connection Pool
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',          // your MySQL username (usually 'root')
    password: 'Nikhil@5720',          // your MySQL password (empty if no password)
    database: 'recipe_db'  // your database name created earlier
});

module.exports = db;
