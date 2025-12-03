---
title: "Specification - Scala"
date: 2025-12-03T13:54:00.714-05:00
draft: false
pattern_usage: ["Specification"]
language: ["Scala"]
---
The Specification pattern is a way to define complex business rules or constraints as objects. These objects encapsulate the logic for checking if a given data object meets the criteria. This promotes reusability, composability, and testability of rules.

The Scala code defines a `Specification` trait with a `isSatisfiedBy` method. Concrete specifications are created by extending this trait and implementing the `isSatisfiedBy` method to define the specific rule.  The example demonstrates combining specifications using `and` and `or` to create more complex rules. Scala's functional nature and support for traits make it a natural fit for this pattern, allowing for concise and composable rule definitions. Immutability is also leveraged for thread safety and predictable behavior.

```scala
trait Specification[T] {
  def isSatisfiedBy(item: T): Boolean

  def and(other: Specification[T]): Specification[T] =
    new Specification[T] {
      def isSatisfiedBy(item: T): Boolean =
        Specification.this.isSatisfiedBy(item) && other.isSatisfiedBy(item)
    }

  def or(other: Specification[T]): Specification[T] =
    new Specification[T] {
      def isSatisfiedBy(item: T): Boolean =
        Specification.this.isSatisfiedBy(item) || other.isSatisfiedBy(item)
    }
}

case class Person(age: Int, name: String)

object SpecificationExamples {
  def main(args: Array[String]): Unit = {
    val adult = new Specification[Person] {
      def isSatisfiedBy(person: Person): Boolean = person.age >= 18
    }

    val namedBob = new Specification[Person] {
      def isSatisfiedBy(person: Person): Boolean = person.name == "Bob"
    }

    val bobAndAdult = adult and namedBob
    val person1 = Person(20, "Bob")
    val person2 = Person(15, "Bob")
    val person3 = Person(20, "Alice")

    println(s"Person 1 satisfies adult and Bob: ${bobAndAdult.isSatisfiedBy(person1)}") // true
    println(s"Person 2 satisfies adult and Bob: ${bobAndAdult.isSatisfiedBy(person2)}") // false
    println(s"Person 3 satisfies adult and Bob: ${bobAndAdult.isSatisfiedBy(person3)}") // false

    val adultOrBob = adult or namedBob
    println(s"Person 1 satisfies adult or Bob: ${adultOrBob.isSatisfiedBy(person1)}") // true
    println(s"Person 2 satisfies adult or Bob: ${adultOrBob.isSatisfiedBy(person2)}") // true
    println(s"Person 3 satisfies adult or Bob: ${adultOrBob.isSatisfiedBy(person3)}") // true
  }
}
```