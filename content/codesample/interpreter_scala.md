---
title: "Interpreter - Scala"
date: 2025-12-03T13:09:13.062-05:00
draft: false
pattern_usage: ["Interpreter"]
language: ["Scala"]
---
The Interpreter pattern defines a class to handle a set of commands, each of which is represented by an object. It allows you to dynamically assemble and interpret a program structure. This implementation uses a simple arithmetic expression grammar (addition and integers) and defines classes for `Expression`, `Number`, and `Add`. The `Interpreter` class then evaluates these expressions. This aligns with Scala’s functional programming strengths, utilizing pattern matching for expression evaluation and immutable data structures for the expression tree. The use of traits and case classes promotes conciseness and clarity.

```scala
trait Expression {
  def evaluate(): Int
}

case class Number(value: Int) extends Expression {
  override def evaluate(): Int = value
}

case class Add(left: Expression, right: Expression) extends Expression {
  override def evaluate(): Int = left.evaluate() + right.evaluate()
}

object Interpreter {
  def main(args: Array[String]): Unit = {
    // Example expression: (1 + 2) + 3
    val expression: Expression = Add(Add(Number(1), Number(2)), Number(3))
    val result = expression.evaluate()
    println(s"Result: $result") // Output: Result: 6
  }
}
```