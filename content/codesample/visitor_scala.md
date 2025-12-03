---
title: "Visitor - Scala"
date: 2025-12-03T13:45:02.935-05:00
draft: false
pattern_usage: ["Visitor"]
language: ["Scala"]
---
The Visitor pattern allows you to define new operations on a hierarchy of objects without changing the classes of those objects. It's achieved by moving the operation's logic into a separate "visitor" class that knows how to handle each concrete element in the hierarchy. This promotes the Open/Closed Principle.

The Scala implementation uses algebraic data types (ADTs) to represent the element hierarchy and traits to define the visitor interface.  Each concrete visitor implements the trait, providing specific `visit` methods for each element type. Pattern matching within the `visit` methods handles the element-specific logic. This approach is idiomatic Scala due to its strong support for ADTs and traits, enabling concise and type-safe visitor implementations.  The `accept` method on each element type dispatches to the appropriate visitor method.

```scala
// Element interface
sealed trait Expression {
  def accept(visitor: ExpressionVisitor): Int
}

// Concrete elements
case class Number(value: Int) extends Expression {
  override def accept(visitor: ExpressionVisitor): Int = visitor.visit(this)
}

case class Add(left: Expression, right: Expression) extends Expression {
  override def accept(visitor: ExpressionVisitor): Int = visitor.visit(this)
}

case class Multiply(left: Expression, right: Expression) extends Expression {
  override def accept(visitor: ExpressionVisitor): Int = visitor.visit(this)
}

// Visitor interface
trait ExpressionVisitor {
  def visit(number: Number): Int
  def visit(add: Add): Int
  def visit(multiply: Multiply): Int
}

// Concrete visitor: Evaluator
class Evaluator extends ExpressionVisitor {
  override def visit(number: Number): Int = number.value
  override def visit(add: Add): Int = add.left.accept(this) + add.right.accept(this)
  override def visit(multiply: Multiply): Int = multiply.left.accept(this) * multiply.right.accept(this)
}

// Concrete visitor: Printer
class Printer extends ExpressionVisitor {
  override def visit(number: Number): Int = println(s"Number: ${number.value}").toInt
  override def visit(add: Add): Int = println("Add").toInt
  override def visit(multiply: Multiply): Int = println("Multiply").toInt
}

// Example usage
object Main {
  def main(args: Array[String]): Unit = {
    val expression = Add(Number(5), Multiply(Number(2), Number(3)))

    val evaluator = new Evaluator()
    val result = expression.accept(evaluator)
    println(s"Result of evaluation: $result") // Output: 11

    val printer = new Printer()
    expression.accept(printer) // Output: Add\nMultiply\nNumber: 2\nNumber: 3\nNumber: 5
  }
}
```