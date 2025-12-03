---
title: "Null Object - Scala"
date: 2025-12-03T13:49:04.999-05:00
draft: false
pattern_usage: ["Null Object"]
language: ["Scala"]
---
The Null Object pattern provides a substitute for a null reference. Instead of checking for nulls, you request a null object, which behaves in a harmless way. This simplifies code by removing conditional statements for null checks and can improve readability.

This Scala example implements the Null Object pattern for a `Customer` class.  `Customer` has a method `getDiscount()`.  Instead of returning `null` when a customer doesn't qualify for a discount, `NoDiscountCustomer` is returned. This class implements the same `Customer` interface and provides a default discount of 0.  The client code can then safely call `getDiscount()` without null checks. Scala's case classes and traits make this pattern concise and type-safe, aligning with its functional and object-oriented nature.

```scala
trait Customer {
  def getName: String
  def getDiscount: Int
}

case class RegularCustomer(name: String, discount: Int) extends Customer {
  override def getName: String = name
  override def getDiscount: Int = discount
}

case class NoDiscountCustomer(name: String) extends Customer {
  override def getName: String = name
  override def getDiscount: Int = 0
}

object CustomerFactory {
  def createCustomer(name: String, discountEligibility: Boolean): Customer = {
    if (discountEligibility) {
      RegularCustomer(name, 10)
    } else {
      NoDiscountCustomer(name)
    }
  }
}

object Main extends App {
  val customer1 = CustomerFactory.createCustomer("Alice", true)
  val customer2 = CustomerFactory.createCustomer("Bob", false)

  println(s"${customer1.getName} discount: ${customer1.getDiscount}")
  println(s"${customer2.getName} discount: ${customer2.getDiscount}")
}
```