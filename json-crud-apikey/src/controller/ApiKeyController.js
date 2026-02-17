import { apiKeys } from '../config/apiKeys.js'

class ApiKeyController {
  list(req, res) {
    res.json(apiKeys)
  }

  verifyQueryString(req, res) {
    res.json({ message: 'YES. You supplied a valid key through the query string!' })
  }

  verifyHeader(req, res) {
    res.json({ message: 'YES. You supplied a valid key through the header!' })
  }

  verifyBody(req, res) {
    res.json({ message: 'YES. You supplied a valid key through the body!' })
  }

  magicAnswer(req, res) {
    res.json({ message: 'YES. The magic answer is 42!' })
  }
}

export default new ApiKeyController()
