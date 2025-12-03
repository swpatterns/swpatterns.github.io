---
title: "Module - Kotlin"
date: 2025-12-03T12:50:53.420-05:00
draft: false
pattern_usage: ["Module"]
language: ["Kotlin"]
---
The Module pattern creates an isolated execution scope, encapsulating internal state and exposing a public API. This prevents global namespace pollution and allows for better organization and maintainability. In Kotlin, this is naturally achieved using object declarations, which are singletons with a defined interface. The code defines an `OrderProcessor` object that holds order-related data and provides methods for adding items, calculating totals, and processing the order.  The internal `MutableList<String>` is hidden, and access is only granted through the public API. This approach aligns with Kotlin's emphasis on immutability and concise syntax, leveraging objects for straightforward encapsulation.

```kotlin
// OrderProcessor.kt

object OrderProcessor {
    private val items = mutableListOf<String>()

    fun addItem(item: String) {
        items.add(item)
    }

    fun getTotal(): Int {
        return items.size // Simplified total calculation for demonstration
    }

    fun processOrder(): String {
        if (items.isEmpty()) {
            return "Order is empty."
        }
        return "Processing order with ${items.joinToString(", ")}."
    }

    fun getItems(): List<String> {
        return items.toList() // Return a copy to prevent external modification
    }
}

fun main() {
    OrderProcessor.addItem("Shirt")
    OrderProcessor.addItem("Pants")
    println("Total items: ${OrderProcessor.getTotal()}")
    println(OrderProcessor.processOrder())
    println("Items in order: ${OrderProcessor.getItems()}")
}
```