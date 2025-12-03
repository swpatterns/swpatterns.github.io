---
title: "Monolith - TypeScript"
date: 2025-12-03T14:25:04.300-05:00
draft: false
pattern_usage: ["Monolith"]
language: ["TypeScript"]
---
The Monolith pattern advocates for building a single, unified application.  All functionalities are bundled and deployed as a single unit. While often discussed negatively in modern microservices architecture, it offers simplicity in development, testing, and initial deployment. This TypeScript example showcases a basic monolithic structure. It avoids unnecessary modularization, placing all related logic (user management, product catalog, and order processing) within a single `app.ts` file and relying on straightforward function calls for interaction. This is typical of rapidly developed, smaller-scale TypeScript applications where the benefits of extensive modularity don’t yet outweigh the costs.

```typescript
// app.ts

interface User {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Order {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
}

let users: User[] = [];
let products: Product[] = [];
let orders: Order[] = [];

// User Management
function createUser(name: string): User {
  const id = users.length + 1;
  const newUser = { id, name };
  users.push(newUser);
  return newUser;
}

function getUser(id: number): User | undefined {
  return users.find(user => user.id === id);
}

// Product Catalog
function createProduct(name: string, price: number): Product {
  const id = products.length + 1;
  const newProduct = { id, name, price };
  products.push(newProduct);
  return newProduct;
}

function getProduct(id: number): Product | undefined {
  return products.find(product => product.id === id);
}

// Order Processing
function createOrder(userId: number, productId: number, quantity: number): Order {
  const id = orders.length + 1;
  const newOrder = { id, userId, productId, quantity };
  orders.push(newOrder);
  return newOrder;
}

function getOrder(id: number): Order | undefined {
  return orders.find(order => order.id === id);
}

// Example Usage
const user1 = createUser("Alice");
const product1 = createProduct("Laptop", 1200);
const order1 = createOrder(user1.id, product1.id, 2);

console.log("User:", user1);
console.log("Product:", product1);
console.log("Order:", order1);
```