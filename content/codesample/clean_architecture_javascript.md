---
title: "Clean Architecture - JavaScript"
date: 2025-12-03T14:16:55.437-05:00
draft: false
pattern_usage: ["Clean Architecture"]
language: ["JavaScript"]
---
The Clean Architecture pattern aims to create systems independent of frameworks, databases, UI, and any external agency. It achieves this through layers: Entities (core business logic), Use Cases (application logic), Interface Adapters (presenters, controllers), and Frameworks & Drivers (UI, databases). Dependencies point inwards – outer layers depend on inner layers, but never the reverse. This enhances testability, maintainability, and flexibility.

The JavaScript example demonstrates a simplified Clean Architecture.  `entities` define core data structures. `useCases` encapsulate application-specific business rules, operating on entities. `interfaceAdapters` (specifically a controller) translate external requests into use case inputs and format use case outputs for presentation.  This structure uses modules to enforce dependency direction. The use of ES module imports and exports keeps the code organized and adheres to modern JavaScript style. Testing is easier as use cases are isolated.

```javascript
// entities/product.js
export class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  applyDiscount(percentage) {
    this.price = this.price * (1 - percentage);
  }
}

// useCases/apply-discount.js
import { Product } from '../entities/product.js';

export function applyDiscountToProduct(productId, discountPercentage) {
  const product = new Product(productId, "Test Product", 100); //In reality, product retrieval would be a separate use case
  product.applyDiscount(discountPercentage);
  return product;
}

// interfaceAdapters/product-controller.js
import { applyDiscountToProduct } from '../useCases/apply-discount.js';

export async function handleApplyDiscount(req, res) {
  try {
    const productId = parseInt(req.query.productId);
    const discountPercentage = parseFloat(req.query.discountPercentage);

    if (isNaN(productId) || isNaN(discountPercentage)) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const discountedProduct = applyDiscountToProduct(productId, discountPercentage);
    res.json({
      id: discountedProduct.id,
      name: discountedProduct.name,
      price: discountedProduct.price,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Example usage (Frameworks & Drivers - hypothetical Express route)
// app.get('/apply-discount', handleApplyDiscount);
```