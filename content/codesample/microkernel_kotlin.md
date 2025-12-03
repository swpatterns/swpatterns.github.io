---
title: "Microkernel - Kotlin"
date: 2025-12-03T14:22:52.041-05:00
draft: false
pattern_usage: ["Microkernel"]
language: ["Kotlin"]
---
The Microkernel pattern aims to create a small, core system (the microkernel) and extend its functionality through plugins or modules. This promotes flexibility, maintainability, and easier extension without modifying the core.  In this Kotlin example, `Microkernel` is a minimal class that provides a central event bus.  `Plugin` is an interface that defines how extensions integrate. `NotificationPlugin` and `LoggingPlugin` represent example plugins. The `main` function demonstrates how plugins are registered and how events trigger the applicable plugin behavior. Kotlin's use of interfaces and extension functions lends itself well to this pattern, keeping the core concise and extension points clear.

```kotlin
// Microkernel.kt
interface Plugin {
    fun handleEvent(event: Any)
}

class Microkernel {
    private val plugins = mutableListOf<Plugin>()

    fun registerPlugin(plugin: Plugin) {
        plugins.add(plugin)
    }

    fun dispatchEvent(event: Any) {
        plugins.forEach { it.handleEvent(event) }
    }
}

// NotificationPlugin.kt
class NotificationPlugin : Plugin {
    override fun handleEvent(event: Any) {
        if (event is String) {
            println("Notification Plugin: Received message - $event")
        }
    }
}

// LoggingPlugin.kt
class LoggingPlugin : Plugin {
    override fun handleEvent(event: Any) {
        println("Logging Plugin: Event received - $event::${event::class.simpleName}")
    }
}

// main.kt
fun main() {
    val microkernel = Microkernel()
    microkernel.registerPlugin(NotificationPlugin())
    microkernel.registerPlugin(LoggingPlugin())

    microkernel.dispatchEvent("Hello, Microkernel!")
    microkernel.dispatchEvent(123) // Illustrate diff event types
}
```