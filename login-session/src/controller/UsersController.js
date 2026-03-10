import usersModel from '../model/UsersModel.js'

/**
 * Controller to perform CRUD for the users collection.
 * @class
 */
class UsersController {
  /**
   * Middleware to verify the user ID.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {function} next - The next middleware function.
   * @param {string} id - The user ID as a string.
   */
  verifyUserId (req, res, next, id) {
    try {
      req.userId = usersModel.verifyUserId(id)
      next()
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  /**
   * Show all users by fetching data from the model and return the json response.
   * @async
   */
  async getAllUsers(req, res, next) {
    try {
      /*ptional filtering via query string (?search=alice)*/
      const searchString = req.query.search || ''
      const users = searchString
        ? await usersModel.getUsersBySearchString(searchString)
        : await usersModel.getAllUsers()

      res.json(users)
    } catch (error) {
      next(error)
    }
  }

  /*Get a single user by id*/
  async getUserById(req, res, next) {
    try {
      const user = await usersModel.getUserById(req.userId)

      if (user) {
        res.json(user)
      } else {
        res.status(404).json({ error: 'User not found' })
      }
    } catch (error) {
      next(error)
    }
  }

  /**
   * Add a new user to the database.
   * @async
   * @param {string} name - The name of the user.
   * @param {string} email - The email of the user.
   * @param {string} password - The password for the user.
   */
  async addUser(req, res, next) {
    try {
      const user = req.body
      const id = await usersModel.addUser(user)
      res.status(201).json(id)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Update an existing user in the database.
   * @async
   * @param {number} id - The ID of the user to update.
   * @param {string} name - The new name of the user.
   * @param {string} email - The new email of the user.
   */
  async updateUser(req, res, next) {
    try {
      const user = req.body
      const success = await usersModel.updateUser(req.userId, user)
      if (success) {
        res.json(user)
      } else {
        res.status(404).json({ error: 'User not found' })
      }
    } catch (error) {
      next(error)
    }
  }

  /**
   * Delete a user from the database.
   * @async
   * @param {number} id - The ID of the user to delete.
   */
  async deleteUser(req, res, next) {
    try {
      const success = await usersModel.deleteUser(req.userId)
      if (success) {
        res.json({ result: 'User deleted' })
      } else {
        res.status(404).json({ error: 'User not found' })
      }
    } catch (error) {
      next(error)
    }
  }

  /*Delete all users*/
  async deleteAllUsers(req, res, next) {
    try {
      const deleted = await usersModel.deleteAllUsers()
      res.json({ result: 'Users deleted', deleted })
    } catch (error) {
      next(error)
    }
  }
}

export default new UsersController()
