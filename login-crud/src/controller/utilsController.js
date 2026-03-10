export const controller = {}

/**
 * Show the content of the session.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
controller.session = (req, res) => {
  const data = {
    session: req.session
  }
  res.render('utils/session', data)
}

/**
 * Clear the content of the session.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
controller.sessionDestroy = async (req, res) => {
  await req.session.destroy()
  res.redirect('../session')
}

/**
 * Show the content of the session.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
controller.locals = (req, res) => {
  const data = {
    session: req.session
  }
  res.render('utils/locals', data)
}
