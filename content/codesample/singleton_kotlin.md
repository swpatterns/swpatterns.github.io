---
title: "Singleton - Kotlin"
date: 2025-12-03T11:06:43.956-05:00
draft: false
pattern_usage: ["Singleton"]
language: ["Kotlin"]
---
The Singleton pattern ensures a class has only one instance and provides a global point of access to it. This is useful for managing resources like database connections or configuration settings where multiple instances would be wasteful or problematic. In Kotlin, we achieve this using an `object` declaration.  `object`s are inherently singletons—Kotlin guarantees only one instance exists. This approach is concise and type-safe, leveraging Kotlin's language features to avoid the boilerplate often seen in other languages (like explicit private constructors and static instance holders). It’s a very idiomatic and preferred way to implement the Singleton pattern in Kotlin.

```kotlin
// SingletonLogger.kt

/**
 * A singleton class that provides logging functionality.
 */
object SingletonLogger {
    private val logs = mutableListOf<String>()

    /**
     * Adds a log message.
     * @param message The message to log.
     */
    fun log(message: String) {
        logs.add(message)
        println("LOG: $message")
    }

    /**
     * Retrieves all logged messages.
     * @return A list of log messages.
     */
    fun getAllLogs(): List<String> {
        return logs.toList() // Return a copy to prevent external modification
    }
}

fun main() {
    SingletonLogger.log("Application started")
    SingletonLogger.log("Processing data...")
    val allLogs = SingletonLogger.getAllLogs()
    println("All Logs: $allLogs")
}
```