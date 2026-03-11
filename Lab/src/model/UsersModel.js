import bcrypt from 'bcrypt'
import jwt from './jwt.js'

/**
 * Model for simple authentication.
 *
 * Hard-coded user for Lab 2:
 * username: doe
 * password: doe
 */
class UsersModel {
  #user = {
    username: 'doe',
    email: 'doe@example.com',
    role: 'user'
  }

  #passwordHashPromise = bcrypt.hash('doe', 10)

  /**
   * Get public user details.
   *
   * @returns {object} User details.
   */
  getPublicUser () {
    return this.#user
  }

  /**
   * Login user and get a JWT token.
   *
   * @async
   * @param {string} username Username.
   * @param {string} password Password.
   * @returns {Promise<string>} JWT token.
   */
  async login (username, password) {
    if (username !== this.#user.username) {
      throw new Error('Wrong user or password!')
    }

    const hashedPassword = await this.#passwordHashPromise
    const success = await bcrypt.compare(password, hashedPassword)

    if (!success) {
      throw new Error('Wrong user or password!')
    }

    return jwt.createJwtToken(
      this.#user.username,
      this.#user.role,
      this.#user.email
    )
  }
}

export default new UsersModel()