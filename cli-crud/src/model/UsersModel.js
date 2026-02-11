import databaseService from "../service/DatabaseService.js"

/**
 * Model to interact with the 'users' table in the database.
 * @class
 */
class UsersModel {
  /**
   * Get all users from the database.
   * @async
   * @returns {Promise<Array>} An array of users.
   */
  async getAllUsers() {
    const query = "SELECT * FROM user"
    return await databaseService.query(query)
  }

  /**
   * Add a new user to the database.
   * @async
   * @param {string} name - The name of the user.
   * @param {string} email - The email of the user.
   * @param {string} password - The passowrd of the user.
   * @returns {Promise<number>} The ID of the newly created user.
   */
  async addUser(name, email, password) {
    const query = "INSERT INTO user (username, email, password) VALUES (?, ?, ?)"
    const result = await databaseService.query(query, [name, email, password])
    return result.insertId
  }

  /**
   * Update an existing user in the database.
   * @async
   * @param {number} id - The ID of the user to update.
   * @param {string} name - The new name of the user.
   * @param {string} email - The new email of the user.
   * @returns {Promise<boolean>} True if the update was successful, false otherwise.
   */
  async updateUser(id, name, email) {
    const query = "UPDATE user SET username = ?, email = ? WHERE id = ?"
    const result = await databaseService.query(query, [name, email, id])
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

    /*View a single user by ID (hides password)*/
  async getUserById(id) {
    const query =
      "SELECT id, username, email, created_at, updated_at FROM user WHERE id = ?"
    const rows = await databaseService.query(query, [id])
    return rows[0] ?? null
  }

  /*Search users by username or email (hides password)*/
  async searchUsers(term) {
    const query = `
      SELECT id, username, email, created_at, updated_at
      FROM user
      WHERE username LIKE ? OR email LIKE ?
      ORDER BY id
    `
    const like = `%${term}%`
    return await databaseService.query(query, [like, like])
  }
}

export default new UsersModel()
