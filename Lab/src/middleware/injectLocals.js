const middleware = {}
export { middleware as localsMiddleware }

/**
 * Inject BASE_URL into locals.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 * @param {object} next Express next object.
 */
middleware.injectBaseUrl = (req, res, next) => {
  res.locals.baseURL = process.env.BASE_URL || '/'
  next()
}

/**
 * Move flash message from session to locals, then clear it.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 * @param {object} next Express next object.
 */
middleware.flashMessage = (req, res, next) => {
  res.locals.flashMessage = req.session?.flashMessage ?? null
  req.session.flashMessage = null
  next()
}

/**
 * Expose authentication state to locals.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 * @param {object} next Express next object.
 */
middleware.authenticatedUser = (req, res, next) => {
  res.locals.authenticated = req.session?.authenticated ?? false
  next()
}