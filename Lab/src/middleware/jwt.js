import jwt from '../model/jwt.js'

const middleware = {}
export { middleware as jwtMiddleware }

/**
 * Verify that the JWT token exists in the request.
 *
 * Accepts either:
 * - Authorization: <token>
 * - Authorization: Bearer <token>
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 * @param {object} next Express next object.
 */
middleware.jwtTokenIsValid = (req, res, next) => {
  const authHeader = req.header('Authorization') || null

  if (!authHeader) {
    const err = new Error('JWT token is missing.')
    err.status = 403
    return next(err)
  }

  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : authHeader

  try {
    res.locals.jwt = jwt.verify(token)
  } catch (error) {
    error.status = error.name === 'TokenExpiredError' ? 401 : 403
    return next(error)
  }

  next()
}