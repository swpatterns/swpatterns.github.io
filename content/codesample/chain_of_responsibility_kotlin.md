---
title: "Chain of Responsibility - Kotlin"
date: 2025-12-03T12:58:17.879-05:00
draft: false
pattern_usage: ["Chain of Responsibility"]
language: ["Kotlin"]
---
The Chain of Responsibility is a behavioral pattern that allows you to pass a request along a chain of handlers. Each handler decides either to process the request or to pass it to the next handler in the chain. This decouples the sender of a request from its receivers, giving multiple objects the opportunity to handle it without the sender explicitly knowing who's handling it.

My Kotlin implementation uses an abstract `Handler` class with a `nextHandler` property. Concrete handlers (like `AuthHandler`, `LoggingHandler`, and `BusinessLogicHandler`) inherit from this, and either process the request if they can, or call `nextHandler?.handle(request)` to pass it along. An explicit chain is built in the `main` function. This approach leverages Kotlin's concise syntax, class delegation, and nullable types for a clean and type-safe implementation.

```kotlin
abstract class Handler {
    protected var nextHandler: Handler? = null

    abstract fun handle(request: String): String

    fun setNext(handler: Handler): Handler {
        nextHandler = handler
        return handler
    }
}

class AuthHandler : Handler() {
    override fun handle(request: String): String {
        if (request == "invalid") {
            return "Authentication failed"
        }
        return nextHandler?.handle(request) ?: request
    }
}

class LoggingHandler : Handler() {
    override fun handle(request: String): String {
        println("Logging request: $request")
        return nextHandler?.handle(request) ?: request
    }
}

class BusinessLogicHandler : Handler() {
    override fun handle(request: String): String {
        if (request.startsWith("process")) {
           return "Business logic processed: $request"
        }
        return nextHandler?.handle(request) ?: request
    }
}

fun main() {
    val chain = AuthHandler()
        .setNext(LoggingHandler())
        .setNext(BusinessLogicHandler())

    println(chain.handle("valid request"))
    println(chain.handle("invalid"))
    println(chain.handle("process data"))
    println(chain.handle("other request"))
}
```