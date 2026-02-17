import crypto from 'node:crypto'

export const apikey = {}

const theApiKeys = [
  {
    description: 'Master key with unlimited usage',
    key: crypto.createHash('md5').update('moped').digest('hex'),
    rate: null,
    usage: 0
  },
  {
    description: 'Trial key with limited usage',
    key: crypto.createHash('md5').update('mumin').digest('hex'),
    rate: 3,
    usage: 0
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
    if (obj.key == aKey) {
      return true
    }
  }

  return false
}

/**
 * Verify that the API key has enough rate to be used and increase usage by one.
 *
 * @param {string} aKey The API key supplied, if any.
 * @returns {boolean} true or false.
 */
apikey.verifyRate = (aKey) => {
  for (const obj of theApiKeys) {
    if (obj.key == aKey) {
      obj.usage++
      if (obj.rate && obj.usage > obj.rate) {
        return false
      }
      return true
    }
  }
  return false
}
