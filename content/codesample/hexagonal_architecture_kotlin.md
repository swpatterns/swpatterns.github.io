---
title: "Hexagonal Architecture - Kotlin"
date: 2025-12-03T14:10:12.391-05:00
draft: false
pattern_usage: ["Hexagonal Architecture"]
language: ["Kotlin"]
---
The Hexagonal Architecture (also known as Ports and Adapters) aims to create loosely coupled software by separating the core business logic from external concerns like databases, UI, or external services. The core logic interacts with the outside world only through well-defined ports (interfaces). Adapters then implement these ports to translate between the core and the specific external technology. This allows for easy swapping of technologies without impacting the core application.

This Kotlin example showcases a simple Hexagonal Architecture for a user service.  The `UserService` defines the core logic and operates through the `UserRepository` port.  `InMemoryUserAdapter` and `ConsoleOutputPort` are adapters. `InMemoryUserAdapter` provides a concrete implementation for user data storage, and `ConsoleOutputPort` adapts the core’s output to the console. The implementation utilizes Kotlin's concise syntax, data classes, and interface-based programming, all common idiomatic practices.

```kotlin
// Core
interface UserRepository {
    fun getUserById(id: String): User?
    fun saveUser(user: User)
}

data class User(val id: String, val name: String, val email: String)

interface OutputPort {
    fun displayUser(user: User)
}

class UserService(private val userRepository: UserRepository, private val outputPort: OutputPort) {
    fun getUserAndDisplay(id: String) {
        val user = userRepository.getUserById(id)
        user?.let { outputPort.displayUser(it) } ?: run { outputPort.displayUser(User("","","User Not Found")) }
    }

    fun createUser(user: User) {
        userRepository.saveUser(user)
    }
}

// Adapters
class InMemoryUserAdapter : UserRepository {
    private val users = mutableMapOf<String, User>()

    override fun getUserById(id: String): User? = users[id]
    override fun saveUser(user: User) { users[user.id] = user }
}

class ConsoleOutputPort : OutputPort {
    override fun displayUser(user: User) {
        println("User ID: ${user.id}, Name: ${user.name}, Email: ${user.email}")
    }
}

// Application
fun main() {
    val userRepository = InMemoryUserAdapter()
    val outputPort = ConsoleOutputPort()
    val userService = UserService(userRepository, outputPort)

    val newUser = User("123", "Alice", "alice@example.com")
    userService.createUser(newUser)

    userService.getUserAndDisplay("123")
    userService.getUserAndDisplay("456")
}
```