---
title: "Lazy Initialization - Kotlin"
date: 2025-12-03T11:17:50.108-05:00
draft: false
pattern_usage: ["Lazy Initialization"]
language: ["Kotlin"]
---
The Lazy Initialization pattern delays the creation of an object until it's actually needed. This improves performance when object creation is expensive and the object isn't always used. Kotlin provides built-in support for lazy initialization using the `lazy` delegate.  The code defines a `ReportGenerator` class which requires significant setup to load data. Instead of initializing this object during class construction, the `reportGenerator` property is declared as `lazy`.  This ensures the `ReportGenerator` is only created when `reportGenerator.generate()` is called for the first time. This approach follows Kotlin's emphasis on conciseness and safety, leveraging the language features to avoid unnecessary computation.

```kotlin
class ReportGenerator(private val dataSource: String) {
    // Simulate expensive initialization
    init {
        println("ReportGenerator initializing with data source: $dataSource")
        Thread.sleep(2000) // Simulate a 2-second delay
        println("ReportGenerator initialized.")
    }

    fun generate(): String {
        // Placeholder for report generation logic
        return "Report generated from $dataSource"
    }
}

class ReportService {
    private val reportGenerator by lazy { ReportGenerator("Database Connection") }

    fun getReport(): String {
        return reportGenerator.generate()
    }
}

fun main() {
    val service = ReportService()
    println("Service created.")

    // Report generation is delayed until this point
    println("Generating report...")
    println(service.getReport())
}
```