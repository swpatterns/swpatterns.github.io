---
title: "Multiton - Scala"
date: 2025-12-03T11:11:12.386-05:00
draft: false
pattern_usage: ["Multiton"]
language: ["Scala"]
---
The Multiton pattern ensures that only a fixed number of instances of a class can be created. It's a relaxed version of the Singleton pattern. This implementation uses a `lazy val` collection to store the instances, creating them on demand up to the specified maximum.  The `apply` method provides access to these instances, cycling through them if the requested index is out of bounds. This approach leverages Scala's immutability and lazy initialization for thread safety and efficiency, fitting well with Scala's functional style while still utilizing object-oriented principles.

```scala
object Multiton {
  private val instances = (1 to 3).map(i => new MultitonInstance(i)).toList
  private var currentIndex = 0

  def apply(index: Int = 0): MultitonInstance = {
    val actualIndex = currentIndex % instances.length
    currentIndex += 1
    instances(actualIndex)
  }
}

class MultitonInstance(val id: Int) {
  def doSomething(): String = s"Multiton instance $id is doing something."
}

// Example Usage
object Main {
  def main(args: Array[String]): Unit = {
    val instance1 = Multiton()
    val instance2 = Multiton()
    val instance3 = Multiton()
    val instance4 = Multiton() // Cycles back to the first instance

    println(instance1.doSomething())
    println(instance2.doSomething())
    println(instance3.doSomething())
    println(instance4.doSomething())
  }
}
```