import dbs from '../service/DatabaseService.js'

/**
 * Model to interact with the 'user' table in the database.
 * @class
 */
class UsersModel {
  #table = 'user'

  verifyUserId (id) {
    const userId = parseInt(id)
    if (!Number.isInteger(userId)) {
      throw new Error('Invalid ID format')
    }
    return userId
  }

  async getAllUsers () {
    const query = `SELECT * FROM ${this.#table}`
    return await dbs.query(query)
  }

  async getUserById (id) {
    const query = `SELECT * FROM ${this.#table} WHERE id = ?`
    const rows = await dbs.query(query, [id])
    return rows[0] || null
  }

  async addUser (user) {
    const { username, email, password } = user
    const query = `INSERT INTO ${this.#table} (username, email, password) VALUES (?, ?, ?)`
    const result = await dbs.query(query, [username, email, password])
    return result.insertId
  }

  async updateUser (id, user) {
    const { username, email, password } = user
    const query = `UPDATE ${this.#table} SET username = ?, email = ?, password = ? WHERE id = ?`
    const result = await dbs.query(query, [username, email, password, id])
    return result.affectedRows > 0
  }

  async deleteUser (id) {
    const query = `DELETE FROM ${this.#table} WHERE id = ?`
    const result = await dbs.query(query, [id])
    return result.affectedRows > 0
  }
}

export default new UsersModel()
