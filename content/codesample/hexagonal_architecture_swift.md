---
title: "Hexagonal Architecture - Swift"
date: 2025-12-03T14:10:30.422-05:00
draft: false
pattern_usage: ["Hexagonal Architecture"]
language: ["Swift"]
---
The Hexagonal Architecture (Ports and Adapters) aims to create loosely coupled software, isolating the core business logic from external concerns like UI, databases, and external services. This is achieved through defining *ports* (interfaces defining interactions with the core) and *adapters* (implementations of those ports for specific technologies). Our example focuses on a simple user management domain. The core (UserManager) interacts with UserRepository (a port).  Concrete implementations (InMemoryUserAdapter & DatabaseUserAdapter) act as adapters. This promotes testability and allows swapping infrastructure details without modifying core logic. The Swift implementation utilizes protocols for ports, adhering to Swift’s strong typing and interface-oriented approach, allowing for dependency injection and clear separation of concerns.

```swift
// MARK: - Core (Domain Logic)

protocol UserRepository {
    func getUser(id: String) -> User?
    func createUser(user: User)
}

struct User {
    let id: String
    let name: String
}

class UserManager {
    private let userRepository: UserRepository

    init(userRepository: UserRepository) {
        self.userRepository = userRepository
    }

    func getUserName(id: String) -> String? {
        return userRepository.getUser(id: id)?.name
    }

    func registerUser(name: String) {
        let newUser = User(id: UUID().uuidString, name: name)
        userRepository.createUser(user: newUser)
    }
}

// MARK: - Adapters (Infrastructure)

class InMemoryUserAdapter: UserRepository {
    private var users: [String: User] = [:]

    func getUser(id: String) -> User? {
        return users[id]
    }

    func createUser(user: User) {
        users[user.id] = user
    }
}

class DatabaseUserAdapter: UserRepository {
    // Mock database interaction
    func getUser(id: String) -> User? {
        // Simulate fetching from a database
        if id == "123" {
            return User(id: "123", name: "Database User")
        }
        return nil
    }

    func createUser(user: User) {
        // Simulate saving to a database
        print("Saving user to database: \(user.name)")
    }
}

// MARK: - Client (Application)

// Example Usage
let inMemoryAdapter = InMemoryUserAdapter()
let databaseAdapter = DatabaseUserAdapter()

let userManagerInMemory = UserManager(userRepository: inMemoryAdapter)
userManagerInMemory.registerUser(name: "John Doe")
print(userManagerInMemory.getUserName(id: userManagerInMemory.getUser(id: "any").map { $0.id } ?? "no id"))

let userManagerDatabase = UserManager(userRepository: databaseAdapter)
print(userManagerDatabase.getUserName(id: "123"))
print(userManagerDatabase.getUserName(id: "456"))
```