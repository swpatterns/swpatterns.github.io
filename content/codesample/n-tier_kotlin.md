---
title: "N-tier - Kotlin"
date: 2025-12-03T14:39:04.403-05:00
draft: false
pattern_usage: ["N-tier"]
language: ["Kotlin"]
---
The N-tier pattern organizes an application into distinct layers, each with a specific responsibility. This improves maintainability, testability, and scalability by decoupling concerns. A typical N-tier architecture includes a Presentation Tier (UI), a Business Logic Tier (application logic), and a Data Access Tier (database interaction).  This Kotlin example demonstrates a simplified 3-tier structure.  We use classes to represent each tier and interfaces to define contracts between them.  Kotlin's data classes and concise syntax make defining data models and interactions clean and readable. Dependency Injection (though not explicitly using a framework here) is implied through constructor parameters, promoting loose coupling.

```kotlin
// Data Tier (Model & Data Access)
data class User(val id: Int, val name: String, val email: String)

interface UserRepository {
    fun getUserById(id: Int): User?
}

class InMemoryUserRepository : UserRepository {
    private val users = listOf(
        User(1, "Alice", "alice@example.com"),
        User(2, "Bob", "bob@example.com")
    )

    override fun getUserById(id: Int): User? = users.find { it.id == id }
}

// Business Logic Tier (Service)
class UserService(private val userRepository: UserRepository) {
    fun getUserName(id: Int): String? {
        val user = userRepository.getUserById(id)
        return user?.name
    }
}

// Presentation Tier (Controller/UI)
class UserController(private val userService: UserService) {
    fun handleGetUser(id: Int): String {
        return userService.getUserName(id) ?: "User not found"
    }
}

// Example Usage (Main)
fun main() {
    val userRepository = InMemoryUserRepository()
    val userService = UserService(userRepository)
    val userController = UserController(userService)

    println(userController.handleGetUser(1)) // Output: Alice
    println(userController.handleGetUser(3)) // Output: User not found
}
```