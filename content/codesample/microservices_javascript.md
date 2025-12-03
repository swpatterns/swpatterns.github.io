---
title: "Microservices - JavaScript"
date: 2025-12-03T14:41:48.485-05:00
draft: false
pattern_usage: ["Microservices"]
language: ["JavaScript"]
---
The Microservices pattern structures an application as a collection of loosely coupled, independently deployable services, modeled around a business domain. Each service owns its data and communicates via lightweight mechanisms, often an HTTP resource API. This example simulates three microservices: `users`, `products`, and `orders`.  Each service exposes a simple API endpoint. A basic `api-gateway` orchestrates requests.  This implementation uses Node.js with Express to create simple HTTP servers for each service, demonstrating the independent deployability and communication aspects.  The use of separate files for each service and a gateway aligns with common JavaScript project structures and modularity principles.

```javascript
// api-gateway.js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('API Gateway');
});

app.get('/users', async (req, res) => {
  const userResponse = await fetch('http://localhost:3001/users');
  const users = await userResponse.json();
  res.json(users);
});

app.get('/products', async (req, res) => {
  const productResponse = await fetch('http://localhost:3002/products');
  const products = await productResponse.json();
  res.json(products);
});

app.get('/orders', async (req, res) => {
  const orderResponse = await fetch('http://localhost:3003/orders');
  const orders = await orderResponse.json();
  res.json(orders);
});

app.listen(port, () => {
  console.log(`API Gateway listening at http://localhost:${port}`);
});

// users.js
const express = require('express');
const app = express();
const port = 3001;

app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]);
});

app.listen(port, () => {
  console.log(`Users service listening at http://localhost:${port}`);
});

// products.js
const express = require('express');
const app = express();
const port = 3002;

app.get('/products', (req, res) => {
  res.json([
    { id: 101, name: 'Laptop' },
    { id: 102, name: 'Mouse' }
  ]);
});

app.listen(port, () => {
  console.log(`Products service listening at http://localhost:${port}`);
});

// orders.js
const express = require('express');
const app = express();
const port = 3003;

app.get('/orders', (req, res) => {
  res.json([
    { id: 201, userId: 1, productId: 101 },
    { id: 202, userId: 2, productId: 102 }
  ]);
});

app.listen(port, () => {
  console.log(`Orders service listening at http://localhost:${port}`);
});
```