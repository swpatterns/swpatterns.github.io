---
title: "Clean Architecture - Kotlin"
date: 2025-12-03T14:18:47.249-05:00
draft: false
pattern_usage: ["Clean Architecture"]
language: ["Kotlin"]
---
The Clean Architecture pattern aims to create systems independent of frameworks, databases, UI, and any external agency. It achieves this by dividing the application into concentric layers: Entities (business rules), Use Cases (application logic), Interface Adapters (presenters, controllers), and Frameworks & Drivers (UI, database). Dependencies point inwards – outer layers depend on inner layers, but not vice versa. This promotes testability, maintainability, and flexibility.

This Kotlin example focuses on the core layers – Entities, Use Cases, and a basic Interface Adapter. The `User` data class represents an Entity.  `GetUserUseCase` demonstrates application logic, operating on Entities.  `UserController` acts as an Interface Adapter, receiving input (e.g., from a web framework) and orchestrating the Use Case. Kotlin's data classes, concise function definitions, and use of interfaces fit the pattern well, favouring immutability and clear separation of concerns. Dependency Injection (although not explicitly shown in this minimal implementation) would be used heavily in a real-world application.

```kotlin
// Entities
data class User(val id: Int, val name: String, val email: String)

// Use Cases
interface UserRepository {
    fun getUser(id: Int): User?
}

class GetUserUseCase(private val userRepository: UserRepository) {
    fun execute(userId: Int): User? {
        return userRepository.getUser(userId)
    }
}

// Interface Adapters
class UserController(private val getUserUseCase: GetUserUseCase) {
    fun getUser(userId: Int): String {
        val user = getUserUseCase.execute(userId)
        return user?.let { "User: ${it.name}, Email: ${it.email}" } ?: "User not found"
    }
}

// Frameworks & Drivers (Example - a simple in-memory repository)
class InMemoryUserRepository : UserRepository {
    private val users = listOf(
        User(1, "Alice", "alice@example.com"),
        User(2, "Bob", "bob@example.com")
    )

    override fun getUser(id: Int): User? {
        return users.firstOrNull { it.id == id }
    }
}

fun main() {
    val userRepository = InMemoryUserRepository()
    val getUserUseCase = GetUserUseCase(userRepository)
    val userController = UserController(getUserUseCase)

    println(userController.getUser(1)) // Output: User: Alice, Email: alice@example.com
    println(userController.getUser(3)) // Output: User not found
}
```