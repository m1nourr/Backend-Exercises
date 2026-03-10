const port = process.env.PORT || 3004
const url = `http://localhost:${port}/api/v1/jwt/init`
const options = {
  method: 'POST'
}

const response = await fetch(url, options)
const data = await response.json()
console.log(response.status)
console.log(data)
// console.log(response.headers)
