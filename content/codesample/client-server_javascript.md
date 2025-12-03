---
title: "Client-Server - JavaScript"
date: 2025-12-03T14:32:11.376-05:00
draft: false
pattern_usage: ["Client-Server"]
language: ["JavaScript"]
---
The Client-Server pattern separates application functionality into distinct roles: a client requesting services and a server providing them. This improves modularity, scalability, and maintainability. Here, a simple HTTP server using Node.js's built-in `http` module acts as the server. It listens for incoming requests and responds with a "Hello from Server!" message. A basic client script (included as a comment) makes a GET request to the server. This demonstrates asynchronous communication – a key aspect of client-server architecture in JavaScript, leveraging its event-loop model. Node.js's module system and `http`'s callback-based API are utilized for a standard and efficient JavaScript implementation.

```javascript
// Server (server.js)
const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello from Server!');
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

// Client (example usage - not runnable as-is, but illustrative)
/*
fetch('http://localhost:3000/')
  .then(response => response.text())
  .then(data => console.log(data)) // Output: Hello from Server!
  .catch(error => console.error('Error:', error));
*/
```