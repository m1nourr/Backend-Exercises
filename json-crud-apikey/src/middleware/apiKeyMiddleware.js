import { apiKeys } from '../config/apiKeys.js'

/**
 * Extract API key from:
 * - query string: ?API_KEY=...
 * - header: Authorization: <key>
 * - body: { "authorization": "<key>" }
 */
function getApiKeyFromRequest(req) {
  return (
    req.query.API_KEY ||
    req.header('Authorization') ||
    req.body?.authorization ||
    null
  )
}

function forbidden(res) {
  return res.status(403).json({
    type: 'forbidden',
    message: 'You have not supplied a valid API key!'
  })
}

/**
 * Middleware that validates the API key and applies a simple usage/rate check.
 */
export function verifyApiKey(req, res, next) {
  const aKey = getApiKeyFromRequest(req)
  if (!aKey) {
    return forbidden(res)
  }

  const found = apiKeys.find(k => k.key === aKey)
  if (!found) {
    return forbidden(res)
  }

  // Rate limit: allow "rate" requests total (simple exercise version)
  if (found.rate !== null && found.usage >= found.rate) {
    return res.status(429).json({
      type: 'too_many_requests',
      message: 'Rate limit reached for this API key.'
    })
  }

  // Track usage
  found.usage += 1

  // Attach details for controller usage if needed
  req.apiKey = found

  next()
}
