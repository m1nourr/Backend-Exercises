if (process.argv.length != 3) {
  console.error('ERROR. You need to send one argument like this: <jwt token>')
  process.exit(1)
}

const port = process.env.PORT || 3003
const jwtToken = process.argv[2]
const url = `http://localhost:${port}/api/v1/jwt/token`
const options = {
  method: 'GET',
  headers: {
    Authorization: jwtToken
  }
}

const response = await fetch(url, options)
const data = await response.json()
console.log(response.status)
console.log(data)
// console.log(response.headers)
