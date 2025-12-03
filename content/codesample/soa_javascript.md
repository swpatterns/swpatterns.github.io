---
title: "SOA - JavaScript"
date: 2025-12-03T14:46:52.462-05:00
draft: false
pattern_usage: ["SOA"]
language: ["JavaScript"]
---
The Service-Oriented Architecture (SOA) pattern structures an application as a collection of loosely coupled, interoperable services. Each service encapsulates a specific business function and communicates with others through well-defined interfaces (often APIs). This promotes modularity, reusability, and independent deployment.

This JavaScript example simulates a simple SOA with two services: `UserService` and `ProductService`.  They expose methods (acting as APIs) for retrieving user and product data, respectively. A `ServiceClient` orchestrates calls to these services.  Using modules and asynchronous functions (Promises) aligns with JavaScript's common practices for building scalable and maintainable applications.  The separation of concerns into distinct services is a core tenet of SOA.

```javascript
// userService.js
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

export function getUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => { // Simulate network latency
      const user = users.find(u => u.id === id);
      resolve(user);
    }, 50);
  });
}

// productService.js
const products = [
  { id: 101, name: 'Laptop' },
  { id: 102, name: 'Mouse' }
];

export function getProduct(id) {
  return new Promise((resolve) => {
    setTimeout(() => { // Simulate network latency
      const product = products.find(p => p.id === id);
      resolve(product);
    }, 50);
  });
}

// serviceClient.js
import { getUser } from './userService.js';
import { getProduct } from './productService.js';

export async function getOrderDetails(userId, productId) {
  const user = await getUser(userId);
  const product = await getProduct(productId);

  if (user && product) {
    return {
      user: user,
      product: product,
      orderDate: new Date()
    };
  } else {
    return null;
  }
}

// app.js
import { getOrderDetails } from './serviceClient.js';

async function main() {
  const order = await getOrderDetails(1, 101);
  if (order) {
    console.log('Order Details:', order);
  } else {
    console.log('Order not found.');
  }
}

main();
```