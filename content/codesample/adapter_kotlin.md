---
title: "Adapter - Kotlin"
date: 2025-12-03T11:28:39.789-05:00
draft: false
pattern_usage: ["Adapter"]
language: ["Kotlin"]
---
The Adapter pattern converts the interface of a class into another interface clients expect. It lets classes work together that couldn't otherwise because of incompatible interfaces. This implementation uses Kotlin’s interface delegation and object expressions to adapt a `LegacyPrinter` class (providing a specific printing method) to a common `Printer` interface. This design keeps the code concise and leverages Kotlin's functional capabilities.  The `LegacyPrinterAdapter` effectively "wraps" the `LegacyPrinter` and provides a standardized interface for modern use. Kotlin’s `by` keyword simplifies the adaptation process.

```kotlin
// Target interface: What clients expect
interface Printer {
    fun print(document: String)
}

// Adaptee: The legacy class with a different interface
class LegacyPrinter {
    fun oldPrint(data: String) {
        println("Legacy Printing: $data")
    }
}

// Adapter: Converts LegacyPrinter to Printer
class LegacyPrinterAdapter(private val legacyPrinter: LegacyPrinter) : Printer by legacyPrinter {
    override fun print(document: String){
        legacyPrinter.oldPrint(document)
    }
}

// Client code
fun main() {
    val legacyPrinter = LegacyPrinter()
    val adapter = LegacyPrinterAdapter(legacyPrinter)

    adapter.print("Hello, Adapted World!")
}
```