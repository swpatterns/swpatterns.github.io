---
title: "SOA - TypeScript"
date: 2025-12-03T14:47:10.834-05:00
draft: false
pattern_usage: ["SOA"]
language: ["TypeScript"]
---
The Service-Oriented Architecture (SOA) pattern structures an application as a collection of loosely coupled, independent services. Each service encapsulates a specific business capability and communicates with others through well-defined interfaces (often APIs). This promotes modularity, reusability, and independent deployment.

This TypeScript example demonstrates a simplified SOA with `UserService` and `ProductService`. Each service has a clear responsibility and exposes methods via interfaces (`IUserService`, `IProductService`).  A `Client` class orchestrates interactions between these services.  Using interfaces and classes aligns with TypeScript's strong typing and OOP capabilities, enhancing maintainability and scalability.  The services are designed to be independent, allowing for potential separate deployment and scaling.

```typescript
// Define service interfaces
interface IUserService {
  getUser(id: number): Promise<string>;
}

interface IProductService {
  getProductDetails(productId: number): Promise<string>;
}

// Implement UserService
class UserService implements IUserService {
  async getUser(id: number): Promise<string> {
    // Simulate fetching user data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`User with ID: ${id}`);
      }, 50);
    });
  }
}

// Implement ProductService
class ProductService implements IProductService {
  async getProductDetails(productId: number): Promise<string> {
    // Simulate fetching product details
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Product with ID: ${productId}`);
      }, 100);
    });
  }
}

// Client class to orchestrate service calls
class Client {
  private userService: IUserService;
  private productService: IProductService;

  constructor(userService: IUserService, productService: IProductService) {
    this.userService = userService;
    this.productService = productService;
  }

  async performTask(userId: number, productId: number): Promise<void> {
    const userDetails = await this.userService.getUser(userId);
    const productDetails = await this.productService.getProductDetails(productId);

    console.log(userDetails);
    console.log(productDetails);
  }
}

// Usage
const userService = new UserService();
const productService = new ProductService();
const client = new Client(userService, productService);

client.performTask(123, 456);
```