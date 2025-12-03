---
title: "Specification - Kotlin"
date: 2025-12-03T13:52:50.162-05:00
draft: false
pattern_usage: ["Specification"]
language: ["Kotlin"]
---
The Specification pattern is a behavioral pattern that defines a class for encapsulating business logic in a reusable way. It represents a condition that can be evaluated against an object to determine if it satisfies certain criteria. This promotes decoupling of the logic from the object itself, making the code more maintainable and testable.

The Kotlin example defines a `Specification` interface with a `matches` method. Concrete specifications like `IsPositive` and `IsLessThan` implement this interface to define specific criteria. A `Filter` function then uses these specifications to filter a list of integers, demonstrating how the pattern can be applied to data manipulation. This approach is idiomatic Kotlin due to its use of interfaces, functional programming concepts (like the `matches` method acting as a predicate), and concise syntax.

```kotlin
// Specification Pattern in Kotlin

interface Specification<T> {
    fun matches(item: T): Boolean
}

class IsPositive : Specification<Int> {
    override fun matches(item: Int): Boolean = item > 0
}

class IsLessThan(private val max: Int) : Specification<Int> {
    override fun matches(item: Int): Boolean = item < max
}

// Combining Specifications (optional)
operator fun <T> Specification<T>.and(other: Specification<T>): Specification<T> {
    return object : Specification<T> {
        override fun matches(item: T): Boolean = this@and.matches(item) && other.matches(item)
    }
}

// Example Usage
fun filterBySpecification(items: List<Int>, spec: Specification<Int>): List<Int> {
    return items.filter { spec.matches(it) }
}

fun main() {
    val numbers = listOf(1, -2, 3, 4, -5, 6)

    val positiveNumbers = filterBySpecification(numbers, IsPositive())
    println("Positive Numbers: $positiveNumbers") // Output: [1, 3, 4, 6]

    val lessThanFive = filterBySpecification(numbers, IsLessThan(5))
    println("Less than Five: $lessThanFive") // Output: [1, -2, 3, 4, -5]

    val positiveAndLessThanFive = filterBySpecification(numbers, IsPositive().and(IsLessThan(5)))
    println("Positive and Less than Five: $positiveAndLessThanFive") // Output: [1, 3, 4]
}
```