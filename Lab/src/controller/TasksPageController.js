import tasksModel from '../model/TasksModel.js'

class TasksPageController {
  /**
   * Verify and store task ID.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Express next function.
   * @param {string} id Task ID.
   */
  verifyTaskId (req, res, next, id) {
    try {
      req.taskId = tasksModel.verifyTaskId(id)
      next()
    } catch (error) {
      next(error)
    }
  }

  /**
   * Render all tasks.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Express next function.
   */
  async getAllTasks (req, res, next) {
    try {
      const data = {
        tasks: await tasksModel.getAllTasks()
      }
      res.render('tasks/view_all', data)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Render one task.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Express next function.
   */
  async getTask (req, res, next) {
    try {
      const task = await tasksModel.getTaskById(req.taskId)

      if (!task) {
        const err = new Error('Task not found')
        err.status = 404
        throw err
      }

      res.render('tasks/view', { task })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Render create form.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   */
  createTask (req, res) {
    res.render('tasks/create')
  }

  /**
   * Handle create form.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Express next function.
   */
  async createTaskPost (req, res, next) {
    try {
      const title = req.body.title?.trim()
      const completed = req.body.completed === 'on'

      if (!title) {
        req.session.flashMessage = 'Title is required.'
        return res.redirect('/tasks/create')
      }

      const task = await tasksModel.addTask(title, completed)
      req.session.flashMessage = `Task with id ${task.id} created.`
      res.redirect(`/tasks/${task.id}`)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Render update form.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Express next function.
   */
  async updateTask (req, res, next) {
    try {
      const task = await tasksModel.getTaskById(req.taskId)

      if (!task) {
        const err = new Error('Task not found')
        err.status = 404
        throw err
      }

      res.render('tasks/update', { task })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Handle update form.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Express next function.
   */
  async updateTaskPost (req, res, next) {
    try {
      const title = req.body.title?.trim()
      const completed = req.body.completed === 'on'

      if (!title) {
        req.session.flashMessage = 'Title is required.'
        return res.redirect(`/tasks/${req.taskId}/update`)
      }

      const task = await tasksModel.updateTask(req.taskId, { title, completed })

      if (!task) {
        const err = new Error('Task not found')
        err.status = 404
        throw err
      }

      req.session.flashMessage = `Task with id ${req.taskId} was updated.`
      res.redirect(`/tasks/${req.taskId}`)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Render delete confirmation page.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Express next function.
   */
  async deleteTask (req, res, next) {
    try {
      const task = await tasksModel.getTaskById(req.taskId)

      if (!task) {
        const err = new Error('Task not found')
        err.status = 404
        throw err
      }

      res.render('tasks/delete', { task })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Handle delete form.
   *
   * @param {object} req Express request object.
   * @param {object} res Express response object.
   * @param {Function} next Express next function.
   */
  async deleteTaskPost (req, res, next) {
    try {
      const success = await tasksModel.deleteTask(req.taskId)

      if (!success) {
        const err = new Error('Task not found')
        err.status = 404
        throw err
      }

      req.session.flashMessage = `Task ${req.taskId} deleted.`
      res.redirect('/tasks')
    } catch (error) {
      next(error)
    }
  }
}

export default new TasksPageController()