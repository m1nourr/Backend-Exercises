const middleware = {}
export { middleware as localsMiddleware }

/**
 * Extract details of the BASE_URL from the environment and inject it into 
 * response.locals to make it visible in the view files.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 * @param {object} next Express next object.
 */
middleware.injectBaseUrl = (req, res, next) => {
  // Pass the base URL to the views.
  res.locals.baseURL = process.env.BASE_URL || '/'

  next()
}

/**
 * Save the read once flash messages to res.locals to be used in the views and
 * then remove it from the session.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 * @param {object} next Express next object.
 */
middleware.flashMessage = (req, res, next) => {
  res.locals.flashMessage = req.session?.flashMessage
  req.session.flashMessage = null

  next()
}

/**
 * Check if user is authenticated and add to locals.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 * @param {object} next Express next object.
 */
middleware.authenticatedUser = (req, res, next) => {
  res.locals.authenticated = req.session?.authenticated
  next()
}
