import databaseService from "../service/DatabaseService.js"

/**
 * Model to interact with the 'users' table in the database.
 * @class
 */
class UsersModel {
  /**
   * Verify and convert user ID.
   * @param {string} id - The user ID as a string.
   * @returns {number} - The verified user ID as an integer.
   * @throws {Error} - Throws an error if the ID format is invalid.
   */
  verifyUserId(id) {
    const userId = parseInt(id)
    if (!Number.isInteger(userId)) {
      throw new Error('Invalid ID format')
    }
    return userId
  }

  /**
   * Get all users from the database.
   * @async
   * @returns {Promise<Array>} An array of users.
   */
  async getAllUsers() {
    const query = "SELECT * FROM user"
    return await databaseService.query(query)
  }

  // ✅ NEW: Get a single user by id
  async getUserById(id) {
    const query = "SELECT * FROM user WHERE id = ?"
    const rows = await databaseService.query(query, [id])
    return rows[0] || null
  }

  /*Filter users by a search string (username/email)*/
  async getUsersBySearchString(searchStr) {
    const query = "SELECT * FROM user WHERE username LIKE ? OR email LIKE ?"
    const like = `%${searchStr}%`
    return await databaseService.query(query, [like, like])
  }

  /**
   * Add a new user to the database.
   * @async
   * @param {object} user - Details for the user.
   * @returns {Promise<number>} The ID of the newly created user.
   */
  async addUser(user) {
    const { username, email, password } = user
    const query = "INSERT INTO user (username, email, password) VALUES (?, ?, ?)"
    const result = await databaseService.query(query, [username, email, password])
    return result.insertId
  }

  /**
   * Update an existing user in the database.
   * @async
   * @param {number} id - The ID of the user to update.
   * @param {object} user - Details of the user to update.
   * @returns {Promise<boolean>} True if the update was successful, false otherwise.
   */
  async updateUser(id, user) {
    const { username, email, password } = user
    const query = "UPDATE user SET username = ?, email = ?, password = ? WHERE id = ?"
    const result = await databaseService.query(query, [username, email, password, id])
    return result.affectedRows > 0
  }

  /**
   * Delete a user from the database.
   * @async
   * @param {number} id - The ID of the user to delete.
   * @returns {Promise<boolean>} True if the deletion was successful, false otherwise.
   */
  async deleteUser(id) {
    const query = "DELETE FROM user WHERE id = ?"
    const result = await databaseService.query(query, [id])
    return result.affectedRows > 0
  }

  /*Delete all users*/
  async deleteAllUsers() {
    const query = "DELETE FROM user"
    const result = await databaseService.query(query)
    return result.affectedRows || 0
  }
}

export default new UsersModel()
