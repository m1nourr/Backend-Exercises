import mysql from 'mysql2/promise'
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

    process.on('SIGINT', () => this.closeConnection())
    process.on('SIGTERM', () => this.closeConnection())
  }

  /**
   * Execute a database query.
   *
   * @async
   * @param {string} queryString - The SQL query string.
   * @param {Array} [params=[]] - The parameters for the query.
   * @returns {Promise<object>} The result of the query.
   * @throws {Error} If the query execution fails.
   */
  async query (queryString, params = []) {
    if (!this.#connection) {
      throw new Error('Database connection is not initialized. Did connect() fail?')
    }

    /*Extra guard for closed connections*/
    if (this.#connection.connection?._closing) {
      throw new Error('Database connection is closing/closed.')
    }

    try {
      const [rows] = await this.#connection.execute(queryString, params)
      return rows
    } catch (error) {
      throw new Error(`Database error: ${error.message}`)
    }
  }

  /**
   * Close the database connection pool.
   *
   * @async
   */
  async closeConnection () {
    try {
      await this.#connection.end()
      console.log('Database connection closed.')
    } catch (err) {
      console.error('Error closing the database connection:', err.message)
      throw err
    }
  }
}

export default new DatabaseService()
