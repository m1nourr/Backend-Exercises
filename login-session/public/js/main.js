/**
 * To check that the tools are working.
 */
import Hello from './module/hello.js'

const output = document.querySelector('#output')

const helloMessage = Hello.hello()

output.textContent = helloMessage
console.log(helloMessage)
