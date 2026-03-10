import usersModel from '../model/UsersModel.js'

/**
 * Controller to perform CRUD for the users collection.
 *
 * @class
 */
class UsersController {
  /**
   * Middleware to verify the user ID.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {Function} next - The next middleware function.
   * @param {string} id - The user ID as a string.
   */
  verifyUserId (req, res, next, id) {
    req.userId = usersModel.verifyUserId(id)
    next()
  }

  /**
   * Show all users by fetching data from the model and render the response.
   *
   * @param req
   * @param res
   * @param next
   * @async
   */
  async getAllUsers (req, res, next) {
    const data = {
      'users': await usersModel.getAllUsers()
    }
    res.render('users/view_all', data)
  }

  /**
   * Get details on one user.
   *
   * @param req
   * @param res
   * @param next
   * @async
   */
  async getUser (req, res, next) {
    const data = {
      'user': await usersModel.getUserById(req.userId)
    }
    res.render('users/view', data)
  }

  /**
   * Present a form to create a new user.
   *
   * @async
   * @param req
   * @param res
   * @param next
   */
  async createUser (req, res, next) {
    res.render('users/create')
  }

  /**
   * Handle submitted form to create a new user to the database.
   *
   * @async
   * @param req
   * @param res
   * @param next
   * @param {string} name - The name of the user.
   * @param {string} email - The email of the user.
   * @param {string} password - The password for the user.
   */
  async createUserPost (req, res, next) {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const id = await usersModel.addUser(username, password, email)

    req.session.flashMessage = `User with id: ${id} created.` 
    res.redirect(`./${id}`)
  }

  /**
   * Present a form to update an existing user in the database.
   *
   * @async
   * @param req
   * @param res
   * @param next
   */
  async updateUser (req, res, next) {
    const data = {
      'user': await usersModel.getUserById(req.userId)
    }
    res.render('users/update', data)
  }

  /**
   * Process submitted form and update user in database.
   *
   * @async
   * @param req
   * @param res
   * @param next
   * @param {string} email - The new email of the user.
   */
  async updateUserPost (req, res, next) {
    const email = req.body.email
    const success = await usersModel.updateUser(req.userId, email)
    if (success) {
      req.session.flashMessage = `User with id: ${req.userId} was updated.` 
      res.redirect('.')
    } else {
      throw new Error('User not found')
    }
  }

  /**
   * Present a form to delete a user from the database.
   *
   * @async
   * @param req
   * @param res
   * @param next
   */
  async deleteUser (req, res, next) {
    const data = {
      'user': await usersModel.getUserById(req.userId)
    }
    res.render('users/delete', data)
  }

  /**
   * Delete a user from the database.
   *
   * @async
   * @param req
   * @param res
   * @param next
   */
  async deleteUserPost (req, res, next) {
    const success = await usersModel.deleteUser(req.userId)
    if (success) {
      req.session.flashMessage = `User ${req.userId} deleted.` 
      res.redirect('..')
    } else {
      throw new Error('User not found')
    }
  }

  /**
   * Search for a user in the database.
   *
   * @async
   * @param req
   * @param res
   * @param next
   */
  async searchUser (req, res, next) {
    const search = req.query?.search 
    let users 

    if (search) {
      users = await usersModel.searchUser(search)
    }

    const data = {
      search,
      users
    }
    res.render('users/search', data)
  }
}

export default new UsersController()
