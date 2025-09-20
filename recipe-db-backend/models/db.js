const mysql = require('mysql2');

// Create Connection Pool
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',          // your MySQL username (usually 'root')
    password: 'Nikhil@5720',          // your MySQL password (empty if no password)
    database: 'recipe_db'  // your database name created earlier
});

module.exports = db;



// // Use promise wrapper
// const mysql = require('mysql2/promise');

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'Nikhil@5720',
//   database: 'recipe_db',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// module.exports = pool;
