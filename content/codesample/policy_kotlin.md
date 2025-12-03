---
title: "Policy - Kotlin"
date: 2025-12-03T13:57:18.076-05:00
draft: false
pattern_usage: ["Policy"]
language: ["Kotlin"]
---
The Policy pattern allows you to encapsulate a non-functional requirement (like security, logging, or caching) into a separate, reusable component. This avoids scattering such logic throughout your core business logic, promoting separation of concerns and making it easier to modify or extend these policies without impacting the main functionality.

This Kotlin example demonstrates a simple `LoggingPolicy` that can be applied to any `OrderProcessor`. The `OrderProcessor` accepts a `LoggingPolicy` instance in its constructor and delegates the logging operation to it. This adheres to Kotlin's principles of dependency injection and using interfaces for loose coupling. The use of a functional interface (`LoggingPolicy`) is also idiomatic for Kotlin, allowing for concise lambda expressions when defining specific logging behaviors.

```kotlin
// Define the Policy interface
interface LoggingPolicy {
    fun log(message: String)
}

// Concrete implementation: Console Logging
class ConsoleLoggingPolicy : LoggingPolicy {
    override fun log(message: String) {
        println("LOG: $message")
    }
}

// Concrete implementation: File Logging (example)
class FileLoggingPolicy(private val filePath: String) : LoggingPolicy {
    override fun log(message: String) {
        // In a real implementation, write to the file
        println("FILE LOG: $message (would be written to $filePath)")
    }
}

// The core business logic component
class OrderProcessor(private val loggingPolicy: LoggingPolicy) {
    fun processOrder(orderId: String, amount: Double) {
        loggingPolicy.log("Processing order $orderId with amount $amount")
        // ... actual order processing logic ...
        loggingPolicy.log("Order $orderId processed successfully")
    }
}

// Usage
fun main() {
    val consoleLogger = ConsoleLoggingPolicy()
    val orderProcessorWithConsole = OrderProcessor(consoleLogger)
    orderProcessorWithConsole.processOrder("123", 50.0)

    val fileLogger = FileLoggingPolicy("order.log")
    val orderProcessorWithFile = OrderProcessor(fileLogger)
    orderProcessorWithFile.processOrder("456", 100.0)
}
```