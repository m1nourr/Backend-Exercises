import mysql from 'mysql2/promise'
import mysql2 from 'mysql2'
import { config } from '../config/database.js'

/**
 * Service (singleton) to manage database operations.
 *
 * @class
 */
class DatabaseService {
  #connection = null

  /**
   * Connect to the database using the configuration provided.
   *
   * @async
   * @returns {Promise<void>}
   */
  async connect () {
    try {
      this.#connection = await mysql.createConnection(config)
      console.log('Database connected.')
    } catch (error) {
      console.error('Database connection failed:', error.message)
      process.exit(1)
    }

    process.on('SIGINT', async () => {
      await this.closeConnection()
    })

    process.on('SIGTERM', async () => {
      await this.closeConnection()
    })
  }

  /**
   * Format a SQL query safely.
   *
   * @param {string} queryString SQL query.
   * @param {Array} params Query parameters.
   * @returns {string} Formatted SQL string.
   */
  format (queryString, params = []) {
    return mysql2.format(queryString, params)
  }

  /**
   * Ensure there is an active database connection.
   *
   * @async
   * @returns {Promise<void>}
   */
  async ensureConnection () {
    if (!this.#connection) {
      await this.connect()
      return
    }

    if (this.#connection.connection?._closing) {
      this.#connection = await mysql.createConnection(config)
      console.log('Database reconnected.')
    }
  }

  /**
   * Execute a database query.
   *
   * @async
   * @param {string} queryString SQL query string.
   * @param {Array} [params=[]] Query parameters.
   * @returns {Promise<object>} Query result.
   */
  async query (queryString, params = []) {
    await this.ensureConnection()

    try {
      const [rows] = await this.#connection.execute(queryString, params)
      return rows
    } catch (error) {
      throw new Error(`Database error: ${error.message}`)
    }
  }

  /**
   * Close the database connection.
   *
   * @async
   * @returns {Promise<void>}
   */
  async closeConnection () {
    if (!this.#connection) return

    try {
      await this.#connection.end()
      this.#connection = null
      console.log('Database connection closed.')
    } catch (err) {
      console.error('Error closing the database connection:', err.message)
      throw err
    }
  }
}

export default new DatabaseService()