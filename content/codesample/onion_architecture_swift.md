---
title: "Onion Architecture - Swift"
date: 2025-12-03T14:14:53.284-05:00
draft: false
pattern_usage: ["Onion Architecture"]
language: ["Swift"]
---
The Onion Architecture organizes code into concentric layers, with core business logic at the center and infrastructure concerns at the outer layers. Dependencies point inwards – outer layers depend on inner layers, but inner layers have no knowledge of the outer ones. This promotes testability, maintainability, and flexibility.

This Swift implementation uses protocols to define layer boundaries. The `Core` layer contains entities and use cases (business logic). The `Interface` layer defines how other layers interact with the `Core`. The `Framework` layer (e.g., UIKit, networking) depends on the `Interface` and implements details. `Entity` is a simple struct, `UseCase` uses protocols for dependency injection, and `ViewController` (framework layer) uses the `UseCase` through its protocol. This strict dependency inversion is key to Onion Architecture and idiomatic Swift uses of protocols.

```swift
// Core - Entities
struct User {
    let id: Int
    let name: String
}

// Core - Use Cases
protocol UserRepository {
    func getUser(id: Int) -> User?
}

protocol GetUserProfileUseCase {
    func execute(userId: Int) -> String?
}

struct GetUserProfile: GetUserProfileUseCase {
    private let userRepository: UserRepository

    init(userRepository: UserRepository) {
        self.userRepository = userRepository
    }

    func execute(userId: Int) -> String? {
        guard let user = userRepository.getUser(id: userId) else {
            return nil
        }
        return "User Profile: \(user.name)"
    }
}

// Interface - Defines interaction with Core
protocol UserInterface {
    func displayUserProfile(profile: String?)
}

// Framework Layer (UIKit)
class ViewController: UIInterface (superclass), UserInterface {
    private let getUserProfileUseCase: GetUserProfileUseCase

    init(getUserProfileUseCase: GetUserProfileUseCase) {
        self.getUserProfileUseCase = getUserProfileUseCase
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        displayUserProfile(profile: getUserProfileUseCase.execute(userId: 1))
    }

    func displayUserProfile(profile: String?) {
        // Display the profile in a UILabel or similar
        print(profile ?? "User not found")
    }
}

// Framework - Concrete implementation (e.g., Data source)
class MockUserRepository: UserRepository {
    func getUser(id: Int) -> User? {
        if id == 1 {
            return User(id: 1, name: "John Doe")
        }
        return nil
    }
}

// Example Usage
let userRepository = MockUserRepository()
let getUserProfileUseCase = GetUserProfile(userRepository: userRepository)
let viewController = ViewController(getUserProfileUseCase: getUserProfileUseCase)

// When the view loads, it will print "User Profile: John Doe"
```