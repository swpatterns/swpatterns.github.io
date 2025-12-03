---
title: "Onion Architecture - Kotlin"
date: 2025-12-03T14:14:37.932-05:00
draft: false
pattern_usage: ["Onion Architecture"]
language: ["Kotlin"]
---
The Onion Architecture is a design pattern focused on separation of concerns, aiming to create a loosely coupled, testable, and maintainable system. The core business logic (Entities and Use Cases) resides in the innermost layers, independent of external frameworks or databases. Outer layers represent mechanisms like interfaces, controllers, and data persistence. Dependencies always point inwards – meaning inner layers know nothing about outer layers.

This Kotlin example demonstrates a simplified Onion Architecture. `entities` define the core data. `usecases` contain application-specific business rules using those entities.  `interfaces` define ports for interacting with the use cases (e.g., a `UserRepositoryPort`). `controllers` (rest) expose endpoints, and `adapters` (repositories) implement the interfaces, connecting to external systems like a mock database.  Kotlin's data classes, interfaces, and concise syntax support this separation well, enhancing readability and testability. Dependency Injection (DI) is assumed for wiring up components in a real app.

```kotlin
// Entities (Innermost Layer)
data class User(val id: Int, val name: String)

// Use Cases (Application Layer)
interface UserService {
    fun getUserById(id: Int): User?
    fun createUser(name: String): User
}

class DefaultUserService(private val userRepository: UserRepositoryPort) : UserService {
    override fun getUserById(id: Int): User? = userRepository.getUserById(id)
    override fun createUser(name: String): User = userRepository.createUser(name)
}

// Interfaces (Domain Layer - Ports)
interface UserRepositoryPort {
    fun getUserById(id: Int): User?
    fun createUser(name: String): User
}

// Adapters (Infrastructure Layer)
class InMemoryUserRepository : UserRepositoryPort {
    private val users = mutableListOf<User>()
    override fun getUserById(id: Int): User? = users.find { it.id == id }
    override fun createUser(name: String): User {
        val newUser = User(users.size + 1, name)
        users.add(newUser)
        return newUser
    }
}

// Controllers (Presentation Layer)
// (Simple example - in a real app, use a framework like Spring Boot or Ktor)
object UserController {
    private val userService = DefaultUserService(InMemoryUserRepository())

    fun getUser(id: Int): String {
        val user = userService.getUserById(id) ?: return "User not found"
        return "User: ${user.name}"
    }

    fun createUser(name: String): String {
        val user = userService.createUser(name)
        return "User created: ${user.name}"
    }
}

// Example Usage
fun main() {
    println(UserController.createUser("Alice"))
    println(UserController.getUser(1))
    println(UserController.getUser(2))
}
```