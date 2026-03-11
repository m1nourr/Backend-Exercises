import { apikey } from '../model/apiKey.js'

export const controller = {}

/**
 * List all API keys.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
controller.list = (req, res) => {
  res.json(apikey.get())
}

/**
 * Protected route for valid API key.
 *
 * @param {object} req Express request object.
 * @param {object} res Express response object.
 */
controller.protected = (req, res) => {
  res.json({
    type: 'success',
    message: 'YES. You supplied a valid API key!'
  })
}