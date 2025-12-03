---
title: "Self-contained Systems - Kotlin"
date: 2025-12-03T14:30:18.632-05:00
draft: false
pattern_usage: ["Self-contained Systems"]
language: ["Kotlin"]
---
The Self-Contained Systems pattern focuses on creating modules that have everything required to function – dependencies are minimized or explicitly provided, and the module exports only necessary functionality. This promotes independence, testability, and resilience to external changes. The Kotlin example below demonstrates this through a `ReportGenerator` class that accepts data and formatting logic as input, avoiding reliance on external, globally accessible state or services.  Kotlin’s data classes and function-first approach align well with this by enabling declarative data structures and easy dependency injection via function arguments. The use of immutable data classes is key, contributing to the system's predictability.

```kotlin
// ReportGenerator.kt

data class ReportData(val title: String, val content: String)

interface ReportFormatter {
    fun format(data: ReportData): String
}

class MarkdownFormatter : ReportFormatter {
    override fun format(data: ReportData): String {
        return "# ${data.title}\n\n${data.content}"
    }
}

class ReportGenerator(private val formatter: ReportFormatter) {
    fun generateReport(data: ReportData): String {
        return formatter.format(data)
    }
}

fun main() {
    val reportData = ReportData("My Report", "This is the content of my report.")
    val markdownFormatter = MarkdownFormatter()
    val reportGenerator = ReportGenerator(markdownFormatter)

    val report = reportGenerator.generateReport(reportData)
    println(report)
}
```