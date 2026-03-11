import databaseService from '../service/DatabaseService.js'

/**
 * Model to interact with the 'tasks' table in the database.
 *
 * @class
 */
class TasksModel {
  /**
   * Verify and convert task ID.
   *
   * @param {string} id - The task ID as a string.
   * @returns {number} - The verified task ID as an integer.
   * @throws {Error} - Throws an error if the ID format is invalid.
   */
  verifyTaskId (id) {
    const taskId = parseInt(id, 10)
    if (!Number.isInteger(taskId)) {
      throw new Error('Invalid ID format')
    }
    return taskId
  }

  /**
   * Normalize DB task row to API response shape.
   *
   * @param {object} task - Raw DB task row.
   * @returns {object} Normalized task object.
   */
  normalizeTask (task) {
    return {
      ...task,
      completed: Boolean(task.completed)
    }
  }

  /**
   * Get all tasks from the database.
   *
   * @async
   * @returns {Promise<Array>} An array of tasks.
   */
  async getAllTasks () {
    const query = 'SELECT * FROM tasks'
    const rows = await databaseService.query(query)
    return rows.map(task => this.normalizeTask(task))
  }

  /**
   * Get one task by ID.
   *
   * @async
   * @param {number} id - The task ID.
   * @returns {Promise<object|null>} Task or null.
   */
  async getTaskById (id) {
    const query = 'SELECT * FROM tasks WHERE id = ?'
    const rows = await databaseService.query(query, [id])
    return rows[0] ? this.normalizeTask(rows[0]) : null
  }

  /**
   * Add a new task.
   *
   * @async
   * @param {string} title - The task title.
   * @param {boolean} completed - Task completed state.
   * @returns {Promise<object>} The created task.
   */
  async addTask (title, completed = false) {
    const query = 'INSERT INTO tasks (title, completed) VALUES (?, ?)'
    const result = await databaseService.query(query, [title, completed ? 1 : 0])
    return await this.getTaskById(result.insertId)
  }

  /**
   * Partially update a task.
   *
   * @async
   * @param {number} id - The task ID.
   * @param {object} updates - The task fields to update.
   * @returns {Promise<object|null>} Updated task or null.
   */
  async updateTask (id, updates) {
    const fields = []
    const values = []

    if (updates.title !== undefined) {
      fields.push('title = ?')
      values.push(updates.title)
    }

    if (updates.completed !== undefined) {
      fields.push('completed = ?')
      values.push(updates.completed ? 1 : 0)
    }

    if (!fields.length) {
      return await this.getTaskById(id)
    }

    values.push(id)

    const query = `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`
    const result = await databaseService.query(query, values)

    if (result.affectedRows === 0) {
      return null
    }

    return await this.getTaskById(id)
  }

  /**
   * Replace a task completely.
   *
   * @async
   * @param {number} id - The task ID.
   * @param {string} title - The task title.
   * @param {boolean} completed - Task completed state.
   * @returns {Promise<object|null>} Replaced task or null.
   */
  async replaceTask (id, title, completed) {
    const query = 'UPDATE tasks SET title = ?, completed = ? WHERE id = ?'
    const result = await databaseService.query(query, [title, completed ? 1 : 0, id])

    if (result.affectedRows === 0) {
      return null
    }

    return await this.getTaskById(id)
  }

  /**
   * Delete a task.
   *
   * @async
   * @param {number} id - The task ID.
   * @returns {Promise<boolean>} True if deleted, false otherwise.
   */
  async deleteTask (id) {
    const query = 'DELETE FROM tasks WHERE id = ?'
    const result = await databaseService.query(query, [id])
    return result.affectedRows > 0
  }
}

export default new TasksModel()