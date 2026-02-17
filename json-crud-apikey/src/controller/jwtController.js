/**
 * Controller actions for the JWT example.
 */
import jwt from '../model/jwt.js'
import users from '../model/UsersModel.js'

export const controller = {}

/**
 * Init the database table for the users.
 *
 * @async
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
controller.init = async (req, res) => {
  await users.initPasswords()
  res.json({ message: 'The database was initiated and passwords were populated.' })
}

/**
 * List all the users.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
controller.list = async (req, res) => {
  res.json(await users.getAllUsers())
}

/**
 * Register a new user.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
controller.register = async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const email = req.body.email
  const user = await users.getUser(username)

  if (user) {
    return res.status(409).json({
      type: 'failed',
      message: 'The user already exists and can not be registered!'
    })
  }

  await users.addUser(username, password, email)
  res.json({
    type: 'success',
    message: 'The user was registered.',
    user: {
      username
    }
  })
}

/**
 * Perform a login and generate a JWT.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
controller.login = async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  let jwtToken

  try {
    jwtToken = await users.login(username, password)
  } catch (err) {
    return res.status(401).json({
      type: 'failed',
      message: 'Wrong user or password!'
    })
  }

  res.json({
    type: 'success',
    message: 'The user was authenticated.',
    payload: jwt.decode(jwtToken),
    token: jwtToken
  })
}

/**
 * Get the details in the JWT token.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
controller.token = async (req, res) => {
  res.json({
    type: 'success',
    message: 'The JWT token was validated.',
    payload: res.locals.jwt
  })
}
