---
title: "Visitor - Kotlin"
date: 2025-12-03T13:43:43.583-05:00
draft: false
pattern_usage: ["Visitor"]
language: ["Kotlin"]
---
The Visitor pattern allows you to define a new operation without changing the classes of the objects on which it operates. It's achieved by moving the operation to a separate "visitor" class that accepts different object types as input. This is useful when you have a complex object structure and want to add functionality that depends on the specific types within that structure without modifying those types.

Here, we define a simple expression hierarchy (Expression, Number, Addition) and a `Visitor` interface with a `visit` method for each expression type. `ExpressionEvaluator` is a concrete visitor that evaluates the expression. The `accept` method in each expression class handles calling the correct `visit` method on the visitor, ensuring type-safe operation execution. This approach is idiomatic Kotlin due to its use of interfaces, sealed classes for a defined hierarchy, and extension functions for the visitor's operations.

```kotlin
// Expression hierarchy
sealed class Expression {
    abstract fun accept(visitor: Visitor)
}

data class Number(val value: Int) : Expression() {
    override fun accept(visitor: Visitor) {
        visitor.visit(this)
    }
}

data class Addition(val left: Expression, val right: Expression) : Expression() {
    override fun accept(visitor: Visitor) {
        visitor.visit(this)
    }
}

// Visitor interface
interface Visitor {
    fun visit(number: Number)
    fun visit(addition: Addition)
}

// Concrete visitor: Expression Evaluator
class ExpressionEvaluator : Visitor {
    fun evaluate(expression: Expression): Int {
        return expression.accept(this)
    }

    override fun visit(number: Number) = number.value

    override fun visit(addition: Addition) =
        visit(addition.left) + visit(addition.right)
}

// Example Usage
fun main() {
    val expression = Addition(Number(5), Addition(Number(2), Number(3)))
    val evaluator = ExpressionEvaluator()
    val result = evaluator.evaluate(expression)
    println("Result: $result") // Output: Result: 10
}
```