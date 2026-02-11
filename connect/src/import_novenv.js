import db from './config/database_novenv.js'

// Connect the database and get the 'connection'
const con = await db.getConnection()

// Perform a query
const sql = 'SELECT * FROM `user` WHERE `username` = ?'
const args = ['alice']
const [results] = await con.execute(sql, args)

// Print the resultset
console.log(results)

// Print resultset in table, need to format the date
const user = results[0]
const formattedUser = {
  ...user,
  created_at: user.created_at.toISOString(),
  updated_at: user.updated_at.toISOString()
}

console.table(formattedUser)

// Close the database connection
await db.close()
