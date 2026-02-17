import { apikey } from '../model/apikey.js'

export const controller = {}

/**
 * List all the API keys.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
controller.list = (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(apikey.get(), null, 2))
}

/**
 * Verify that the API key exists in the query string.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 * @param {function} next Express next object.
 */
controller.verifyQueryString = (req, res, next) => {
  const aKey = req.query.API_KEY || null

  if (!apikey.verifyKey(aKey)) {
    const err = new Error('You have not supplied a valid API key!')
    err.status = 403
    return next(err)
  }

  if (!apikey.verifyRate(aKey)) {
    const err = new Error('You have reached your usage rate!')
    err.status = 429
    return next(err)
  }

  res.status(200).json({
    type: 'success',
    message: 'API key is valid and within usage rate limits.'
  })
}

/**
 * Verify that the API key exists in the header.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 * @param {function} next Express next object.
 */
controller.verifyHeader = (req, res, next) => {
  const aKey = req.header('Authorization') || null

  if (!apikey.verifyKey(aKey)) {
    const err = new Error('You have not supplied a valid API key!')
    err.status = 403
    return next(err)
  }

  if (!apikey.verifyRate(aKey)) {
    const err = new Error('You have reached your usage rate!')
    err.status = 429
    return next(err)
  }

  res.json({
    message: 'YES. You supplied a valid key through the header!'
  })
}

/**
 * Verify that the API key exists in the body.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 * @param {function} next Express next object.
 */
controller.verifyBody = (req, res, next) => {
  const aKey = req.body.authorization || null

  if (!apikey.verifyKey(aKey)) {
    const err = new Error('You have not supplied a valid API key!')
    err.status = 403
    return next(err)
  }

  if (!apikey.verifyRate(aKey)) {
    const err = new Error('You have reached your usage rate!')
    err.status = 429
    return next(err)
  }

  res.json({
    message: 'YES. You supplied a valid key through the body!'
  })
}

/**
 * Provide a magic answer.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
controller.magicAnswer = (req, res) => {
  res.json({
    message: 'YES. The magic answer is 42!'
  })
}

export default controller
