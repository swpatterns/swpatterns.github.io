---
title: "Service Locator - Kotlin"
date: 2025-12-03T11:24:54.448-05:00
draft: false
pattern_usage: ["Service Locator"]
language: ["Kotlin"]
---
The Service Locator pattern provides a centralized way to obtain dependencies (services) without tightly coupling a client to concrete implementations. Instead of injecting dependencies directly, clients ask a central "locator" for the service they need, identified by a key or name. This allows for configuration changes and service swapping without modifying the client code.

The Kotlin implementation uses a simple `ServiceLocator` object as the central registry. Services are stored in a `mutableMapOf` using a `String` key for identification.  `getService()` retrieves a service, and `registerService()` adds one.  Kotlin’s object declarations and concise syntax fit well with this pattern, making it easy to create and use the locator.  This approach favors simplicity and doesn't require complex dependency injection frameworks for basic scenarios.

```kotlin
// ServiceLocator.kt
object ServiceLocator {
    private val services = mutableMapOf<String, Any>()

    fun <T> getService(key: String): T? {
        return services[key] as? T
    }

    fun <T> registerService(key: String, service: T) {
        services[key] = service
    }
}

// Define some services
interface Logger {
    fun log(message: String)
}

class ConsoleLogger : Logger {
    override fun log(message: String) {
        println("Console: $message")
    }
}

class FileLogger(private val filename: String) : Logger {
    override fun log(message: String) {
        println("File: $message (logging to $filename)")
    }
}

// Client code
fun main() {
    // Register services
    ServiceLocator.registerService("consoleLogger", ConsoleLogger())
    ServiceLocator.registerService("fileLogger", FileLogger("app.log"))

    // Get and use services
    val consoleLogger = ServiceLocator.getService<Logger>("consoleLogger")
    consoleLogger?.log("This is a console log message.")

    val fileLogger = ServiceLocator.getService<Logger>("fileLogger")
    fileLogger?.log("This is a file log message.")

    //Demonstrate handling missing service
    val missingLogger = ServiceLocator.getService<Logger>("unknownLogger")
    println("Missing logger: $missingLogger") // Prints "Missing logger: null"
}
```