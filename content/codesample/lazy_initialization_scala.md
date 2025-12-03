---
title: "Lazy Initialization - Scala"
date: 2025-12-03T11:18:36.590-05:00
draft: false
pattern_usage: ["Lazy Initialization"]
language: ["Scala"]
---
The Lazy Initialization pattern delays the creation of an object until its first use. This can improve performance if the object is expensive to create and not always needed. In Scala, this is naturally achieved using the `lazy` keyword. The `lazy` keyword ensures that the variable is only initialized once, when its value is first accessed.  The implementation below demonstrates a resource-intensive calculation only performed when `expensiveResource` is first called. This makes the code more efficient when the resource isn’t required for every execution path, fitting seamlessly with Scala’s functional and immutable nature.

```scala
object LazyInitializationExample {

  def time(a: => Any): Double = {
    val start = System.nanoTime
    val result = a
    val end = System.nanoTime
    (end - start) / 1e9 // Convert to seconds
  }

  // This resource is only created when first accessed.
  lazy val expensiveResource: String = {
    println("Initializing expensiveResource...")
    Thread.sleep(2000) // Simulate a time-consuming operation
    "Resource Initialized"
  }

  def main(args: Array[String]): Unit = {
    println("Starting...")

    // expensiveResource is NOT initialized here
    println("Before first access:")

    // expensiveResource is initialized when accessed here.
    val resourceValue = expensiveResource
    println(s"After first access: $resourceValue")
    println(s"Initialization time: ${time(expensiveResource)} seconds")

    // Accessing it again is fast because it's already initialized.
    val anotherValue = expensiveResource
    println(s"Second access: $anotherValue")
    println(s"Second access time: ${time(expensiveResource)} seconds")
  }
}
```