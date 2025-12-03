---
title: "N-tier - Swift"
date: 2025-12-03T14:39:23.629-05:00
draft: false
pattern_usage: ["N-tier"]
language: ["Swift"]
---
The N-tier pattern organizes an application into distinct layers, each with a specific responsibility. This promotes separation of concerns, making the application more maintainable, testable, and scalable. A typical N-tier architecture includes a presentation tier (UI), a business logic tier, and a data access tier.

This Swift example demonstrates a simplified 3-tier architecture for managing user data. The `User` struct represents the data model. `UserService` encapsulates the business logic for user operations (e.g., fetching, creating). `UserRepository` handles the data access, simulating a database interaction.  The use of protocols for `UserRepository` allows for easy dependency injection and testing with mock data sources. This structure aligns with Swift's emphasis on clear separation of concerns and testability through protocols and structs.

```swift
// Model
struct User {
    let id: Int
    let name: String
    let email: String
}

// Data Access Tier (Repository)
protocol UserRepository {
    func getUser(byId id: Int) -> User?
    func saveUser(user: User)
}

class DefaultUserRepository: UserRepository {
    private var users: [User] = [
        User(id: 1, name: "Alice", email: "alice@example.com"),
        User(id: 2, name: "Bob", email: "bob@example.com")
    ]

    func getUser(byId id: Int) -> User? {
        return users.first { $0.id == id }
    }

    func saveUser(user: User) {
        users.append(user)
    }
}

// Business Logic Tier (Service)
class UserService {
    private let userRepository: UserRepository

    init(userRepository: UserRepository) {
        self.userRepository = userRepository
    }

    func getUserDetails(userId: Int) -> User? {
        return userRepository.getUser(byId: userId)
    }

    func createUser(name: String, email: String) -> User {
        let newUser = User(id: Int.random(in: 1000..=9999), name: name, email: email)
        userRepository.saveUser(user: newUser)
        return newUser
    }
}

// Presentation Tier (Example Usage)
let userRepository = DefaultUserRepository()
let userService = UserService(userRepository: userRepository)

if let alice = userService.getUserDetails(userId: 1) {
    print("User Name: \(alice.name), Email: \(alice.email)")
}

let newuser = userService.createUser(name: "Charlie", email: "charlie@example.com")
print("Created new user: \(newuser.name) with ID: \(newuser.id)")
```