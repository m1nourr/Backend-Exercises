// Prepare the details for the request
const url = `http://localhost:${process.env.PORT || 3003}/api/v1/apikey/list`
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
