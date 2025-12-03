---
title: "Layered Architecture - Kotlin"
date: 2025-12-03T14:05:47.702-05:00
draft: false
pattern_usage: ["Layered Architecture"]
language: ["Kotlin"]
---
The Layered Architecture pattern organizes an application into distinct layers, each with a specific role and responsibility. This promotes separation of concerns, making the application more maintainable, testable, and adaptable to change.  Common layers include Presentation, Business Logic, and Data Access. My Kotlin example demonstrates this with `UserInterface`, `UserService`, and `UserRepository`. `UserService` orchestrates data processing, calling `UserRepository` for data persistence and potentially other services.  The `UserInterface` (here, a simple function) interacts *only* with `UserService`, effectively isolating it from direct database interaction. This aligns with Kotlin's preference for concise code and functional decomposition where appropriate, while still allowing object-oriented structuring of concerns.

```kotlin
// Domain layer: Data class representing a user
data class User(val id: Int, val name: String, val email: String)

// Business Logic Layer: Handles user-related operations
class UserService {
    private val userRepository = UserRepository()

    fun getUserById(id: Int): User? {
        return userRepository.getUserById(id)
    }

    fun createUser(name: String, email: String): User {
        val newUser = User(0, name, email)
        return userRepository.createUser(newUser)
    }
}

// Data Access Layer: Interacts with the data source (e.g., database)
class UserRepository {
    // In a real application, this would interact with a database.
    private val users = mutableListOf<User>()
    private var nextId = 1

    fun getUserById(id: Int): User? {
        return users.find { it.id == id }
    }

    fun createUser(user: User): User {
        val newUser = user.copy(id = nextId++)
        users.add(newUser)
        return newUser
    }
}

// Presentation Layer: Exposes the application's functionality
fun main() {
    val userService = UserService()

    // Create a user
    val newUser = userService.createUser("Alice", "alice@example.com")
    println("Created user: $newUser")

    // Get the user by ID
    val retrievedUser = userService.getUserById(newUser.id)
    println("Retrieved user: $retrievedUser")
}
```