// Get the API key as an argument sent to the script
if (process.argv.length != 3) {
  console.error('ERROR. You need to send one arguments like this: <API_KEY>')
  process.exit(1)
}
const API_KEY = process.argv[2]

// Prepare the details for the request
const url = `http://localhost:${process.env.PORT || 3003}/api/v1/apikey/try1?API_KEY=${API_KEY}`
const options = {
  method: 'GET'
}
console.log(url)

// Do the request and get the response
const response = await fetch(url, options)
const data = await response.json()

// Print the result from the request
console.log(response.status)
console.log(data)
// console.log(response.headers)
