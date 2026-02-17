import http from 'http'
import { apikey } from '../model/apikey.js'

/**
 * Verify that the API key exists in the request.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 * @param {object} next Express next object.
 */
export function verifyApiKey (req, res, next) {
  const aKey = req.query.API_KEY ||
    req.header('Authorization') ||
    req.body?.authorization ||
    null

  if (!apikey.verifyKey(aKey)) {
    const err = new Error('You have not supplied a valid API key!')
    err.status = 403
    err.statusDescription = http.STATUS_CODES[err.status]
    return next(err)
  }

  if (!apikey.verifyRate(aKey)) {
    const err = new Error('You have reached your usage rate!')
    err.status = 429
    err.statusDescription = http.STATUS_CODES[err.status]
    return next(err)
  }

  return next()
}
