import bcrypt from 'bcrypt'
import dbs from '../service/DatabaseService.js'
import jwt from './jwt.js'

/**
 * Model to interact with the 'users' table in the database.
 *
 * @class
 */
class UsersModel {
  #table = 'user_jwt'

  /**
   * Verify and convert user ID.
   *
   * @param {string} id - The user ID as a string.
   * @returns {number} - The verified user ID as an integer.
   * @throws {Error} - Throws an error if the ID format is invalid.
   */
  verifyUserId (id) {
    const userId = parseInt(id)
    if (!Number.isInteger(userId)) {
      throw new Error('Invalid ID format')
    }
    return userId
  }

  /**
   * Hash a password based on the plain password.
   *
   * @param plaintext
   * @async
   * @returns {Promise<string>} The hashed password.
   */
  async #hashPassword (plaintext) {
    const saltRounds = 10
    return await bcrypt.hash(plaintext, saltRounds)
  }

  /**
   * Init the users with passwords.
   *
   * @async
   */
  async initPasswords () {
    const queryAll = `SELECT * FROM ${this.#table}`
    const queryPassword = `SELECT password FROM ${this.#table} WHERE username = ?`
    const updatePassword = `UPDATE ${this.#table} SET password = ? WHERE username = ?`
    const result = await dbs.query(queryAll)

    for (const user of result) {
      const [{ password }] = await dbs.query(queryPassword, [user.username])
      const hashedPassword = await this.#hashPassword(password)
      await dbs.query(updatePassword, [hashedPassword, user.username])
    }
  }

  /**
   * Get all users from the database.
   *
   * @async
   * @returns {Promise<Array>} An array of users.
   */
  async getAllUsers () {
    let sql = 'SELECT id, username, password, email FROM ??'
    const arg = [this.#table]
    sql = dbs.format(sql, arg)
    return await dbs.query(sql)
  }

  /**
   * Get user from the database.
   *
   * @async
   * @param {string} username - The name or acronym of the user.
   * @returns {Promise<object>} A user if it exists or false.
   */
  async getUser (username) {
    let sql = 'SELECT * FROM ?? WHERE username = ?'
    const arg = [this.#table, username]
    sql = dbs.format(sql, arg)
    const [result] = await dbs.query(sql)
    return result === undefined ? false : result
  }

  /**
   * Get user from the database.
   *
   * @async
   * @param {number} userId - The id of the user.
   * @returns {Promise<object>} A user if it exists or false.
   */
  async getUserById (userId) {
    let sql = 'SELECT * FROM ?? WHERE id = ?'
    const arg = [this.#table, userId]
    sql = dbs.format(sql, arg)
    const [result] = await dbs.query(sql)
    return result === undefined ? false : result
  }

  /**
   * Add a new user to the database.
   *
   * @async
   * @param username
   * @param password
   * @param email
   * @param {object} user - Details for the user.
   * @returns {Promise<number>} The ID of the newly created user.
   */
  async addUser (username, password, email) {
    let sql = 'INSERT INTO ?? (username, password, email) VALUES (?, ?, ?)'
    const hashedPassword = await this.#hashPassword(password)
    const arg = [this.#table, username, hashedPassword, email]
    sql = dbs.format(sql, arg)
    const result = await dbs.query(sql)
    return result.insertId
  }

  /**
   * Update an existing user in the database.
   *
   * @async
   * @param {number} userId - The ID of the user to update.
   * @param {string} email - The email of the user.
   * @returns {Promise<boolean>} True if the update was successful, false otherwise.
   */
  async updateUser (userId, email) {
    let sql = 'UPDATE ?? SET email = ? WHERE id = ?'
    const arg = [this.#table, email, userId]
    sql = dbs.format(sql, arg)
    const result = await dbs.query(sql)
    return result.affectedRows > 0
  }

  /**
   * Delete a user from the database.
   *
   * @async
   * @param {number} userId - The ID of the user to delete.
   * @returns {Promise<boolean>} True if the deletion was successful, false otherwise.
   */
  async deleteUser (userId) {
    let sql = 'DELETE FROM ?? WHERE id = ?'
    const arg = [this.#table, userId]
    sql = dbs.format(sql, arg)
    const result = await dbs.query(sql)
    return result.affectedRows > 0
  }

  /**
   * Search for users in the database.
   *
   * @async
   * @param {string} search - String to search for.
   * @returns {Promise<array>} Array of users matching the search critera.
   */
  async searchUser (search) {
    const searchWildcard = `%${search}%`
    let sql = 'SELECT id, username, email FROM ?? WHERE id = ? OR username LIKE ? OR email LIKE ?'
    const arg = [this.#table, search, searchWildcard, searchWildcard]
    sql = dbs.format(sql, arg)
    const result = await dbs.query(sql)
    console.log(sql)
    console.log(result)
    return result
  }

  /**
   * Login user and get a JWT token.
   *
   * @async
   * @param {object} username - The username.
   * @param {object} password - The password for the username.
   * @returns {Promise<string>} A JWT token if login succedded.
   */
  async login (username, password) {
    const user = await this.getUser(username)
    if (!user) {
      throw new Error('User does not exists')
    }

    const hashedPassword = user.password
    const success = await bcrypt.compare(password, hashedPassword)
    if (!success) {
      throw new Error('User and password does not match')
    }

    const token = jwt.createJwtToken(user.username, user.role, user.email)
    return token
  }

  /**
   * Login user.
   *
   * @async
   * @param {object} username - The username.
   * @param {object} password - The password for the username.
   * @returns {Promise<object>} Object with user details, on success.
   */
  async checkUserAndPassword (username, password) {
    const user = await this.getUser(username)
    if (!user) {
      throw new Error('User does not exists')
    }

    const hashedPassword = user.password
    const success = await bcrypt.compare(password, hashedPassword)
    if (!success) {
      throw new Error('User and password does not match')
    }

    return {
      username: user.username,
      role: user.role
    }
  }
}

export default new UsersModel()
