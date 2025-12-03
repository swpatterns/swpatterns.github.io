---
title: "Clean Architecture - Swift"
date: 2025-12-03T14:19:06.319-05:00
draft: false
pattern_usage: ["Clean Architecture"]
language: ["Swift"]
---
Clean Architecture aims to create systems independent of frameworks, databases, UI, and external agencies. It achieves this through layered organization: Entities (core business logic), Use Cases (application-specific business rules), Interface Adapters (presenters, controllers, gateways), and Frameworks & Drivers (UI, databases). Dependencies point inwards – outer layers depend on inner layers, but inner layers have no knowledge of outer layers. This promotes testability, maintainability, and flexibility.

The example demonstrates a simplified Clean Architecture for fetching user data. `User` is the Entity. `GetUserUseCase` is the Use Case, relying on a `UserRepository` protocol.  `UserRepositoryImpl` adapts a hypothetical external source. `UserController` accepts input and presents the output, adhering to the presentation layer and depending on the Use Case. This structure uses protocols for dependency inversion, which is highly idiomatic in Swift, and allows for easy swapping of implementations (e.g. mock repositories for testing).

```swift
// MARK: - Entities
struct User {
    let id: Int
    let name: String
    let email: String
}

// MARK: - Use Cases
protocol GetUserUseCase {
    func getUser(id: Int) -> User?
}

struct DefaultGetUserUseCase: GetUserUseCase {
    private let userRepository: UserRepository

    init(userRepository: UserRepository) {
        self.userRepository = userRepository
    }
    
    func getUser(id: Int) -> User? {
        return userRepository.getUser(id: id)
    }
}

// MARK: - Interface Adapters
protocol UserRepository {
    func getUser(id: Int) -> User?
}

struct UserRepositoryImpl: UserRepository {
    // Simulating a data source (e.g., API or database)
    private let users: [User] = [
        User(id: 1, name: "Alice", email: "alice@example.com"),
        User(id: 2, name: "Bob", email: "bob@example.com")
    ]

    func getUser(id: Int) -> User? {
        return users.first { $0.id == id }
    }
}

// MARK: - Frameworks & Drivers
struct UserController {
    private let getUserUseCase: GetUserUseCase

    init(getUserUseCase: GetUserUseCase) {
        self.getUserUseCase = getUserUseCase
    }

    func getUser(id: Int) -> String {
        if let user = getUserUseCase.getUser(id: id) {
            return "User Name: \(user.name), Email: \(user.email)"
        } else {
            return "User not found."
        }
    }
}

// MARK: - Composition Root (Example Usage)
let userRepository = UserRepositoryImpl()
let getUserUseCase = DefaultGetUserUseCase(userRepository: userRepository)
let userController = UserController(getUserUseCase: getUserUseCase)

let user1Info = userController.getUser(id: 1)
print(user1Info)

let user3Info = userController.getUser(id: 3)
print(user3Info)
```