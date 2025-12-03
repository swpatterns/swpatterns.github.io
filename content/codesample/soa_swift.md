---
title: "SOA - Swift"
date: 2025-12-03T14:49:31.011-05:00
draft: false
pattern_usage: ["SOA"]
language: ["Swift"]
---
The Service-Oriented Architecture (SOA) pattern structures an application as a collection of loosely coupled, reusable services. Each service encapsulates a specific business function and communicates with others through well-defined interfaces (often network calls). This promotes modularity, maintainability, and scalability.

The Swift example demonstrates a simplified SOA with two services: `UserService` and `ProductService`.  They each have a protocol defining their interface, and concrete classes implementing that protocol. A `Client` class orchestrates calls to these services.  Using protocols allows for easy dependency injection and mocking for testing. The structure favors composition over inheritance, a core tenet of modern Swift development, and the use of classes aligns with the typical approach for encapsulating state and behavior in a service context.  Error handling is done via `throws` and `try/catch` for robustness.

```swift
// UserService.swift
protocol UserServiceProtocol {
    func getUser(id: Int) throws -> String
}

class UserService: UserServiceProtocol {
    func getUser(id: Int) throws -> String {
        // Simulate fetching user data
        if id == 1 {
            return "John Doe"
        } else {
            throw NSError(domain: "UserServiceError", code: 404, userInfo: [NSLocalizedDescriptionKey: "User not found"])
        }
    }
}

// ProductService.swift
protocol ProductServiceProtocol {
    func getProductDetails(productId: Int) throws -> String
}

class ProductService: ProductServiceProtocol {
    func getProductDetails(productId: Int) throws -> String {
        // Simulate fetching product details
        if productId == 101 {
            return "Awesome Product - Price: $99"
        } else {
            throw NSError(domain: "ProductServiceError", code: 404, userInfo: [NSLocalizedDescriptionKey: "Product not found"])
        }
    }
}

// Client.swift
class Client {
    private let userService: UserServiceProtocol
    private let productService: ProductServiceProtocol

    init(userService: UserServiceProtocol, productService: ProductServiceProtocol) {
        self.userService = userService
        self.productService = productService
    }

    func processOrder(userId: Int, productId: Int) {
        do {
            let userName = try userService.getUser(id: userId)
            let productDetails = try productService.getProductDetails(productId: productId)
            print("Processing order for \(userName): \(productDetails)")
        } catch {
            print("Error processing order: \(error.localizedDescription)")
        }
    }
}

// Usage
let userService = UserService()
let productService = ProductService()
let client = Client(userService: userService, productService: productService)

client.processOrder(userId: 1, productId: 101)
client.processOrder(userId: 2, productId: 101)
client.processOrder(userId: 1, productId: 102)
```