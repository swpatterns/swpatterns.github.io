---
title: "Dependency Injection - Kotlin"
date: 2025-12-03T11:21:04.847-05:00
draft: false
pattern_usage: ["Dependency Injection"]
language: ["Kotlin"]
---
The Dependency Injection (DI) pattern decouples classes from their dependencies, promoting modularity, testability, and maintainability. Instead of a component creating its own dependencies, they are provided to it from an external source. This implementation uses Kotlin's constructor injection, a common and concise form of DI. We define interfaces for dependencies (like `UserRepository`) and then implementations. The `UserPresenter` receives an instance of `UserRepository` through its constructor, which is the "injection."  This is facilitated cleanly using Kotlin's type system and can be extended with DI frameworks like Dagger/Hilt for larger projects, but remains understandable without them. The focused nature of Kotlin enables a clear and efficient structural setup for dependency management.

```kotlin
// Define the dependency interface
interface UserRepository {
    fun getUser(userId: Int): User?
}

// Concrete implementation of the dependency
data class User(val id: Int, val name: String)

class DefaultUserRepository : UserRepository {
    private val users = mapOf(
        1 to User(1, "Alice"),
        2 to User(2, "Bob")
    )

    override fun getUser(userId: Int): User? {
        return users[userId]
    }
}

// Component that depends on the interface
class UserPresenter(private val userRepository: UserRepository) {
    fun presentUser(userId: Int): String? {
        val user = userRepository.getUser(userId)
        return user?.name ?: "User not found"
    }
}

// Usage (Injection happens here)
fun main() {
    val userRepository = DefaultUserRepository()
    val presenter = UserPresenter(userRepository)

    println(presenter.presentUser(1)) // Output: Alice
    println(presenter.presentUser(3)) // Output: User not found
}
```