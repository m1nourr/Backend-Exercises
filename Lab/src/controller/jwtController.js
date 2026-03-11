import jwt from '../model/jwt.js'
import usersModel from '../model/UsersModel.js'

export const controller = {}

/**
 * Show the available hard-coded user.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
controller.user = (req, res) => {
  res.json(usersModel.getPublicUser())
}

/**
 * Perform login and generate a JWT token.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 * @param {object} next Express next function.
 */
controller.login = async (req, res, next) => {
  try {
    const username = req.body.username
    const password = req.body.password

    const jwtToken = await usersModel.login(username, password)

    res.json({
      type: 'success',
      message: 'The user was authenticated.',
      payload: jwt.decode(jwtToken),
      token: jwtToken
    })
  } catch (error) {
    res.status(401).json({
      type: 'failed',
      message: 'Wrong user or password!'
    })
  }
}

/**
 * Protected route for valid JWT token.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
controller.protected = (req, res) => {
  res.json({
    type: 'success',
    message: 'The JWT token was validated.',
    payload: res.locals.jwt
  })
}