if (process.argv.length != 4) {
  console.error('ERROR. You need to send two arguments like this: <user> <password>')
  process.exit(1)
}

const port = process.env.PORT || 3004
const username = process.argv[2]
const password = process.argv[3]
const url = `http://localhost:${port}/api/v1/jwt/login`
const body = {
  username,
  password
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
