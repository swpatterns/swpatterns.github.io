---
title: "Monolith - JavaScript"
date: 2025-12-03T14:24:48.471-05:00
draft: false
pattern_usage: ["Monolith"]
language: ["JavaScript"]
---
The Monolith pattern, in its simplest form, is an architectural style where an application is built as a single, unified unit. All components and functionalities are tightly coupled and deployed as one. This contrasts with microservices, which break down an application into independent services. This example demonstrates a basic JavaScript monolith structuring an e-commerce application with product listing, cart management, and checkout within a single file. It utilizes straightforward function calls and shared state (the `cart` array) to represent this tight coupling, typical of the pattern. This approach is common in smaller JavaScript applications or quick prototypes, prioritizing simplicity over scalability and maintainability.

```javascript
// ecommerce-monolith.js

let products = [
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Mouse', price: 25 },
  { id: 3, name: 'Keyboard', price: 75 },
];

let cart = [];

function listProducts() {
  console.log('Available Products:');
  products.forEach(product => {
    console.log(`${product.name} - $${product.price}`);
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    console.log(`${product.name} added to cart.`);
  } else {
    console.log('Product not found.');
  }
}

function viewCart() {
  if (cart.length === 0) {
    console.log('Cart is empty.');
    return;
  }

  console.log('Your Cart:');
  let total = 0;
  cart.forEach(item => {
    console.log(`${item.name} - $${item.price}`);
    total += item.price;
  });
  console.log(`Total: $${total}`);
}

function checkout() {
  if (cart.length === 0) {
    console.log('Cannot checkout - cart is empty.');
    return;
  }

  let total = cart.reduce((sum, item) => sum + item.price, 0);
  console.log(`Checkout complete. Total amount: $${total}`);
  cart = []; // Empty the cart after checkout
}

// Example Usage:
listProducts();
addToCart(1);
addToCart(2);
viewCart();
checkout();
```