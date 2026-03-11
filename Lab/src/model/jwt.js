import jwt from 'jsonwebtoken'

const model = {}
export default model

/**
 * Generate a JWT token.
 *
 * @param {string} username Username of the user.
 * @param {string} role Role of the user.
 * @param {string} email Email of the user.
 * @returns {string} JWT token.
 */
model.createJwtToken = (username, role, email) => {
  const payload = {
    iss: 'Lab 2',
    sub: username,
    username,
    email,
    role,
    permissions: ['read', 'write'],
    iat: Date.now()
  }

  const options = {
    expiresIn: '1h'
  }

  return jwt.sign(payload, process.env.JWT_SECRET, options)
}

/**
 * Decode a JWT token.
 *
 * @param {string} token JWT token.
 * @returns {object} Decoded payload.
 */
model.decode = (token) => {
  return jwt.decode(token)
}

/**
 * Verify a JWT token.
 *
 * @param {string} token JWT token.
 * @returns {object} Verified payload.
 */
model.verify = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}