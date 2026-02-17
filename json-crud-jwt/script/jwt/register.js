if (process.argv.length != 5) {
  console.error('ERROR. You need to send arguments like this: <user> <password> <email>')
  process.exit(1)
}

const port = process.env.PORT || 3003
const username = process.argv[2]
const password = process.argv[3]
const email = process.argv[4]
const url = `http://localhost:${port}/api/v1/jwt/register`
const body = {
  username,
  password,
  email
}
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
}

const response = await fetch(url, options)
const data = await response.json()
console.log(response.status)
console.log(data)
// console.log(response.headers)
