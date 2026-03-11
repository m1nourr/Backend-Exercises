import tasksModel from '../model/TasksModel.js'

/**
 * Controller to perform CRUD for the tasks collection.
 *
 * @class
 */
class TasksController {
  /**
   * Middleware to verify the task ID.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {Function} next - The next middleware function.
   * @param {string} id - The task ID as a string.
   */
  verifyTaskId (req, res, next, id) {
    try {
      req.taskId = tasksModel.verifyTaskId(id)
      next()
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  /**
   * Convert possible completed values to boolean.
   *
   * @param {*} value - Incoming completed value.
   * @returns {boolean|undefined} Parsed boolean or undefined.
   */
  parseCompleted (value) {
    if (value === undefined) return undefined
    if (typeof value === 'boolean') return value
    if (value === 1 || value === '1' || value === 'true') return true
    if (value === 0 || value === '0' || value === 'false') return false
    return undefined
  }

  /**
   * Show all tasks.
   *
   * @async
   */
  async getTasks (req, res, next) {
    try {
      const tasks = await tasksModel.getAllTasks()
      res.json(tasks)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Show one task by ID.
   *
   * @async
   */
  async getTaskById (req, res, next) {
    try {
      const task = await tasksModel.getTaskById(req.taskId)

      if (!task) {
        return res.status(404).json({ error: 'Task not found' })
      }

      res.json(task)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Create a new task.
   *
   * @async
   */
  async createTask (req, res, next) {
    try {
      const title = req.body.title?.trim()
      const completed = this.parseCompleted(req.body.completed) ?? false

      if (!title) {
        return res.status(400).json({ error: 'Title is required' })
      }

      const task = await tasksModel.addTask(title, completed)
      res.status(201).json(task)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Partially update a task.
   *
   * @async
   */
  async updateTask (req, res, next) {
    try {
      const updates = {}

      if (req.body.title !== undefined) {
        updates.title = req.body.title.trim()
      }

      if (req.body.completed !== undefined) {
        const completed = this.parseCompleted(req.body.completed)
        if (completed === undefined) {
          return res.status(400).json({ error: 'Invalid completed value' })
        }
        updates.completed = completed
      }

      const task = await tasksModel.updateTask(req.taskId, updates)

      if (!task) {
        return res.status(404).json({ error: 'Task not found' })
      }

      res.json(task)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Replace a task completely.
   *
   * @async
   */
  async replaceTask (req, res, next) {
    try {
      const title = req.body.title?.trim()
      const completed = this.parseCompleted(req.body.completed)

      if (!title) {
        return res.status(400).json({ error: 'Title is required' })
      }

      if (completed === undefined) {
        return res.status(400).json({ error: 'Completed must be true or false' })
      }

      const task = await tasksModel.replaceTask(req.taskId, title, completed)

      if (!task) {
        return res.status(404).json({ error: 'Task not found' })
      }

      res.json(task)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Delete a task.
   *
   * @async
   */
  async deleteTask (req, res, next) {
    try {
      const success = await tasksModel.deleteTask(req.taskId)

      if (!success) {
        return res.status(404).json({ error: 'Task not found' })
      }

      res.status(204).end()
    } catch (error) {
      next(error)
    }
  }
}

export default new TasksController()