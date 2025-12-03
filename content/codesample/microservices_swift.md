---
title: "Microservices - Swift"
date: 2025-12-03T14:44:42.711-05:00
draft: false
pattern_usage: ["Microservices"]
language: ["Swift"]
---
The Microservices pattern structures an application as a collection of loosely coupled, independently deployable services, modeled around a business domain. Each service owns its data and communicates via lightweight mechanisms, often a RESTful API. This example demonstrates a simplified implementation with two services: `UserService` and `OrderService`. They communicate through a shared `User` model and a basic API client.  Swift's protocol-oriented programming and strong typing lend themselves well to defining clear service interfaces.  Using `Codable` for data transfer is idiomatic for handling JSON in Swift.  The structure favors composition over inheritance, aligning with microservice principles.

```swift
// Shared Model
struct User: Codable {
    let id: Int
    let name: String
}

// UserService
protocol UserService {
    func getUser(id: Int) async throws -> User
}

class UserServiceImpl: UserService {
    func getUser(id: Int) async throws -> User {
        // Simulate database call
        if id == 1 {
            return User(id: 1, name: "Alice")
        } else {
            throw NSError(domain: "UserService", code: 404, userInfo: [NSLocalizedDescriptionKey: "User not found"])
        }
    }
}

// OrderService
protocol OrderService {
    func createOrder(userId: Int) async throws -> String
}

class OrderServiceImpl: OrderService {
    private let userService: UserService

    init(userService: UserService) {
        self.userService = userService
    }

    func createOrder(userId: Int) async throws -> String {
        let user = try await userService.getUser(id: userId)
        // Simulate order creation
        let orderId = UUID().uuidString
        return "Order \(orderId) created for \(user.name)"
    }
}

// API Client (Simplified)
actor APIClient {
    private let userService: UserService
    private let orderService: OrderService

    init(userService: UserService, orderService: OrderService) {
        self.userService = userService
        self.orderService = orderService
    }

    func getUserName(userId: Int) async throws -> String {
        let user = try await userService.getUser(id: userId)
        return user.name
    }

    func placeOrder(userId: Int) async throws -> String {
        return try await orderService.createOrder(userId: userId)
    }
}

// Example Usage
func main() async {
    let userService = UserServiceImpl()
    let orderService = OrderServiceImpl(userService: userService)
    let apiClient = APIClient(userService: userService, orderService: orderService)

    do {
        let userName = try await apiClient.getUserName(userId: 1)
        print("User name: \(userName)")

        let orderConfirmation = try await apiClient.placeOrder(userId: 1)
        print(orderConfirmation)
    } catch {
        print("Error: \(error)")
    }
}

Task {
    await main()
}
```