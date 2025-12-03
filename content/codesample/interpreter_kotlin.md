---
title: "Interpreter - Kotlin"
date: 2025-12-03T13:08:02.855-05:00
draft: false
pattern_usage: ["Interpreter"]
language: ["Kotlin"]
---
The Interpreter pattern defines a way to evaluate a language, defined by a grammar, using classes to represent the grammar’s rules. This example demonstrates interpreting simple arithmetic expressions with addition and subtraction. It defines abstract classes for Expression and implements concrete classes for Number and operations like Add and Subtract. The `evaluate()` method recursively processes the expression tree.  Kotlin's support for sealed classes and data classes makes defining the expression hierarchy concise and safe. Using functional-style evaluation within the `evaluate()` methods aligns with Kotlin's expressiveness.

```kotlin
// Expression interface
sealed interface Expression {
    fun evaluate(): Int
}

// Terminal expression: Number
data class Number(private val value: Int) : Expression {
    override fun evaluate(): Int = value
}

// Non-terminal expression: Add
class Add(private val left: Expression, private val right: Expression) : Expression {
    override fun evaluate(): Int = left.evaluate() + right.evaluate()
}

// Non-terminal expression: Subtract
class Subtract(private val left: Expression, private val right: Expression) : Expression {
    override fun evaluate(): Int = left.evaluate() - right.evaluate()
}

// Example Usage/Context
fun main() {
    val expression = Add(Subtract(Number(10), Number(5)), Number(2))
    val result = expression.evaluate()
    println("Result: $result") // Output: Result: 7
}
```