import { apikey } from '../model/apiKey.js'

/**
 * Verify that the API key exists in the request.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 * @param {object} next Express next object.
 */
export function verifyApiKey (req, res, next) {
  const aKey =
    req.query.API_KEY ||
    req.header('Authorization') ||
    req.header('x-api-key') ||
    req.body?.authorization ||
    null

  if (!apikey.verifyKey(aKey)) {
    const err = new Error('You have not supplied a valid API key!')
    err.status = 403
    return next(err)
  }

  next()
}