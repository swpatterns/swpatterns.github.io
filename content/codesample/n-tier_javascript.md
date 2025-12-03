---
title: "N-tier - JavaScript"
date: 2025-12-03T14:36:46.778-05:00
draft: false
pattern_usage: ["N-tier"]
language: ["JavaScript"]
---
The N-tier pattern organizes an application into distinct layers (tiers) – typically a presentation tier, a business logic tier, and a data access tier – each focusing on a specific aspect of the application. This separation promotes modularity, maintainability, and testability. Our JavaScript example utilizes this by defining separate modules for user interface (UI) interactions, core business rules related to product information, and data fetching from a simulated API, encapsulated within functions for clarity and reusability. This aligns with JavaScript's modularity through functions and modules, keeping concerns isolated and enhancing scalability. While JavaScript is often used client-side, the pattern applies equally well to server-side implementations.

```javascript
// data-tier.js - Data Access Layer
const productsData = [
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Mouse', price: 25 },
  { id: 3, name: 'Keyboard', price: 75 }
];

function getProducts() {
  return new Promise((resolve) => {
    setTimeout(() => { // Simulated API call delay
      resolve(productsData);
    }, 50);
  });
}

function getProductById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = productsData.find(p => p.id === id);
      resolve(product);
    }, 50);
  });
}

// business-tier.js - Business Logic Layer
function calculateTotalPrice(products, quantity) {
  return products.reduce((total, product) => total + product.price * quantity, 0);
}

function validateProduct(product) {
  return typeof product.name === 'string' && typeof product.price === 'number' && product.price > 0;
}


// presentation-tier.js - Presentation Layer (UI)
async function displayProducts() {
  const products = await getProducts();
  const productListElement = document.getElementById('product-list');
  products.forEach(product => {
    const listItem = document.createElement('li');
    listItem.textContent = `${product.name} - $${product.price}`;
    productListElement.appendChild(listItem);
  });
}

async function displayProductDetail(productId) {
    const product = await getProductById(productId);
    const detailElement = document.getElementById('product-detail');
    if(product) {
        detailElement.textContent = `Product ID: ${product.id}, Name: ${product.name}, Price: $${product.price}`;
    } else {
        detailElement.textContent = 'Product not found.';
    }
}

// Initialize (e.g., on page load)
document.addEventListener('DOMContentLoaded', () => {
  displayProducts();
  displayProductDetail(1); //Show details of product id 1
});
```