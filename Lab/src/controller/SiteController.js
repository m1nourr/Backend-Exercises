export const controller = {}

/**
 * Render landing page.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
controller.home = (req, res) => {
  res.render('site/home')
}

/**
 * Render Friday page.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
controller.friday = (req, res) => {
  const queryDate = req.query.date
  let date = queryDate ? new Date(`${queryDate}T12:00:00`) : new Date()
  let usedQueryDate = Boolean(queryDate)

  if (Number.isNaN(date.getTime())) {
    date = new Date()
    usedQueryDate = false
  }

  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' })
  const dateString = date.toLocaleDateString('en-CA')
  const isFriday = weekday === 'Friday'

  res.render('site/friday', {
    weekday,
    dateString,
    isFriday,
    usedQueryDate
  })
}