---
title: "Client-Server - TypeScript"
date: 2025-12-03T14:32:23.807-05:00
draft: false
pattern_usage: ["Client-Server"]
language: ["TypeScript"]
---
The Client-Server pattern decouples an application into two distinct parts: a client requesting resources or services, and a server providing them. This promotes scalability, maintainability, and allows for independent evolution of each component.  The code exemplifies this by creating a simple server using Node.js and Express that exposes an endpoint `/greet`.  A client-side function then calls this endpoint using `fetch` to retrieve and display a greeting. TypeScript's static typing enhances code reliability by ensuring data consistency between client requests and server responses.  The asynchronous nature of `fetch` and Node.js's event loop aligns with TypeScript's `async/await` for clean, non-blocking I/O operations.

```typescript
// server.ts
import express from 'express';

const app = express();
const port = 3000;

app.get('/greet', (req, res) => {
  const name = req.query.name || 'World';
  res.json({ message: `Hello, ${name}!` });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// client.ts
async function greetServer(name: string) {
  try {
    const response = await fetch(`http://localhost:3000/greet?name=${name}`);
    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error('Error fetching greeting:', error);
  }
}

greetServer('TypeScript');
```