import crypto from 'node:crypto'

export const apikey = {}

const theApiKeys = [
  {
    description: 'Master key',
    key: crypto.createHash('md5').update('moped').digest('hex')
  },
  {
    description: 'Trial key',
    key: crypto.createHash('md5').update('mumin').digest('hex')
  }
]

/**
 * Get details on the API keys.
 *
 * @returns {object} Details on the API keys.
 */
apikey.get = () => {
  return theApiKeys
}

/**
 * Verify that the API key is valid.
 *
 * @param {string} aKey The API key supplied, if any.
 * @returns {boolean} true or false.
 */
apikey.verifyKey = (aKey) => {
  for (const obj of theApiKeys) {
    if (obj.key === aKey) {
      return true
    }
  }

  return false
}