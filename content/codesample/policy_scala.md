---
title: "Policy - Scala"
date: 2025-12-03T13:58:29.338-05:00
draft: false
pattern_usage: ["Policy"]
language: ["Scala"]
---
The Policy pattern allows you to encapsulate a set of business rules or constraints into separate, reusable policy objects. This promotes separation of concerns and makes it easier to modify or extend the rules without affecting the core logic.  The code defines a `ValidationPolicy` trait with a `validate` method. Concrete policies implement this trait to define specific validation rules. A `Validator` class takes a list of `ValidationPolicy` instances and applies them sequentially to an input. This approach is idiomatic Scala due to its use of traits for defining interfaces, higher-order functions for composition, and immutable data structures for representing policies.

```scala
trait ValidationPolicy {
  def validate(input: String): Option[String]
}

class LengthPolicy(maxLength: Int) extends ValidationPolicy {
  override def validate(input: String): Option[String] = {
    if (input.length > maxLength) Some(s"Input length exceeds $maxLength") else None
  }
}

class CharacterPolicy(allowedChars: Set[Char]) extends ValidationPolicy {
  override def validate(input: String): Option[String] = {
    if (input.exists(!allowedChars.contains(_))) Some("Invalid characters found") else None
  }
}

class Validator(policies: List[ValidationPolicy]) {
  def isValid(input: String): Boolean = {
    policies.forall(policy => policy.validate(input).isEmpty)
  }

  def validate(input: String): Option[String] = {
    policies.find(policy => policy.validate(input).isDefined).flatMap(_.validate(input))
  }
}

object PolicyExample extends App {
  val allowed = Set('a' to 'z', 'A' to 'Z', '0' to '9')
  val lengthPolicy = new LengthPolicy(10)
  val charPolicy = new CharacterPolicy(allowed)

  val validator = new Validator(List(lengthPolicy, charPolicy))

  val input1 = "validInput1"
  val input2 = "tooLongInput1234567890"
  val input3 = "invalid!Input"

  println(s"$input1 is valid: ${validator.isValid(input1)}")
  println(s"$input2 is valid: ${validator.isValid(input2)}")
  println(s"$input3 is valid: ${validator.isValid(input3)}")

  println(s"Validation error for $input2: ${validator.validate(input2)}")
  println(s"Validation error for $input3: ${validator.validate(input3)}")
}
```