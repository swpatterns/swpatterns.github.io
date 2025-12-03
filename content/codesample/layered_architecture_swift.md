---
title: "Layered Architecture - Swift"
date: 2025-12-03T14:06:05.852-05:00
draft: false
pattern_usage: ["Layered Architecture"]
language: ["Swift"]
---
The Layered Architecture pattern organizes an application into distinct layers, each with a specific responsibility. This promotes separation of concerns, making the code more maintainable, testable, and adaptable to change. Common layers include Presentation (UI), Business Logic (Use Cases), Data Access (Repositories), and potentially Entity/Domain layers.

This Swift example demonstrates a simplified layered architecture for managing user data.  The `User` struct represents the domain entity. `UserRepository` handles data persistence (mocked here, but would interact with a database or API).  `UserUseCases` encapsulates the application's business rules relating to users (e.g., creating a user). Finally, a `UserViewController` (or similar) would represent the presentation layer, interacting only with the Use Cases.  The code uses protocols for dependency injection, aligning with Swift’s emphasis on design flexibility and testability.  Structs are used for data models, a common and performant Swift practice.

```swift
// MARK: - Entity Layer

struct User {
    let id: Int
    let name: String
    let email: String
}

// MARK: - Data Access Layer

protocol UserRepository {
    func getUser(withId id: Int) -> User?
    func saveUser(user: User)
}

struct MockUserRepository: UserRepository {
    private var users: [User] = []

    func getUser(withId id: Int) -> User? {
        return users.first { $0.id == id }
    }

    func saveUser(user: User) {
        users.append(user)
    }
}

// MARK: - Business Logic Layer

protocol UserUseCases {
    func createUser(name: String, email: String) -> User
    func getUserDetails(userId: Int) -> User?
}

struct DefaultUserUseCases: UserUseCases {
    private let userRepository: UserRepository

    init(userRepository: UserRepository) {
        self.userRepository = userRepository
    }

    func createUser(name: String, email: String) -> User {
        let newUser = User(id: Int.random(in: 1000...9999), name: name, email: email)
        userRepository.saveUser(user: newUser)
        return newUser
    }

    func getUserDetails(userId: Int) -> User? {
        return userRepository.getUser(withId: userId)
    }
}

// MARK: - Presentation Layer (Simplified)

class UserViewController {
    private let useCases: UserUseCases

    init(useCases: UserUseCases) {
        self.useCases = useCases
    }

    func createUser(name: String, email: String) -> User {
        return useCases.createUser(name: name, email: email)
    }

    func getUser(userId: Int) -> User? {
        return useCases.getUserDetails(userId: userId)
    }
}

// MARK: - Example Usage

let userRepository = MockUserRepository()
let userUseCases = DefaultUserUseCases(userRepository: userRepository)
let userViewController = UserViewController(useCases: userUseCases)

let newUser = userViewController.createUser(name: "Alice", email: "alice@example.com")
print("Created User: \(newUser)")

if let retrievedUser = userViewController.getUser(userId: newUser.id) {
    print("Retrieved User: \(retrievedUser)")
}
```