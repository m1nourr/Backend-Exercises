if (process.argv.length != 3) {
  console.error('ERROR. You need to send one arguments like this: <API_KEY>')
  process.exit(1)
}

const API_KEY = process.argv[2]

const url = `http://localhost:${process.env.PORT || 3003}/api/v1/apikey/try5`
const options = {
  method: 'GET',
  headers: {
    Authorization: API_KEY
  }
}

console.log(url)

const response = await fetch(url, options)
const data = await response.json()

console.log(response.status)
console.log(data)
// console.log(response.headers)
