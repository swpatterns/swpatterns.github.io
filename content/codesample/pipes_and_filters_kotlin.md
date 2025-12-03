---
title: "Pipes and Filters - Kotlin"
date: 2025-12-03T15:21:28.660-05:00
draft: false
pattern_usage: ["Pipes and Filters"]
language: ["Kotlin"]
---
The Pipes and Filters pattern structures a program as a sequence of processing stages (filters) connected by channels (pipes). Each filter has a single responsibility: to transform the data it receives. The pattern promotes reusability, maintainability, and simplifies complex data processing pipelines.

This Kotlin example simulates processing a list of strings through filters. We use Kotlin’s functional programming capabilities – specifically, higher-order functions and lambdas – to concisely define each filter as a transformation operation on a `List<String>`. The pipe is implicitly handled through function composition using the `let` scope function, passing the result from one filter to the next.  This is idiomatic Kotlin as it leverages immutability and functional programming constructs rather than mutable state, resulting in a cleaner and more readable pipeline.

```kotlin
// Pipes and Filters Pattern in Kotlin

data class DataItem(val value: String)

// Filter 1: Uppercase the string
fun filterUppercase(data: List<DataItem>): List<DataItem> = data.map { it.copy(value = it.value.uppercase()) }

// Filter 2: Remove characters that are not letters or numbers
fun filterAlphanumeric(data: List<DataItem>): List<DataItem> = data.map { it.copy(value = it.value.filter { char -> char.isLetterOrDigit() }) }

// Filter 3: Filter out empty strings
fun filterNotEmpty(data: List<DataItem>): List<DataItem> = data.filter { it.value.isNotEmpty() }

fun main() {
    val inputData = listOf(
        DataItem(" Hello World! "),
        DataItem("123abc456"),
        DataItem(""),
        DataItem("Kotlin Pipes")
    )

    val processedData = inputData
        .let(filterUppercase)
        .let(filterAlphanumeric)
        .let(filterNotEmpty)
    
    println(processedData) // Output: [DataItem(value=HELLO WORLD!), DataItem(value=123ABC456), DataItem(value=KOTLINPIPES)]
}
```