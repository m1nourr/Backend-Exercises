import db from './config/database.js';

// Connect the database and get the 'connection'
const con = await db.getConnection();

// Perform a query
const sql = 'SELECT * FROM `user` WHERE `username` = ?';
const args = ['alice'];
const [results] = await con.execute(sql, args);

// Print the resultset
console.log(results);

// Close the database connection
await db.close();
