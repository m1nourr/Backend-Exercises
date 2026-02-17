const url = `http://localhost:${process.env.PORT || 3002}/api/v1/apikey/try4`
const options = {
  method: 'GET'
}

console.log(url)

const response = await fetch(url, options)
const data = await response.json()

console.log(response.status)
console.log(data)
// console.log(response.headers)
