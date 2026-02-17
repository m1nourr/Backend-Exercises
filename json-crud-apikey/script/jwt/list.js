const port = process.env.PORT || 3002
const url = `http://localhost:${port}/api/v1/jwt/list`
const options = {
  method: 'GET'
}

const response = await fetch(url, options)
const data = await response.json()
console.log(response.status)
console.table(data)
// console.log(response.headers)
