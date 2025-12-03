---
title: "Iterator - Scala"
date: 2025-12-03T13:13:10.955-05:00
draft: false
pattern_usage: ["Iterator"]
language: ["Scala"]
---
The Iterator pattern is a behavioral design pattern that provides sequential access to a collection's elements without exposing its underlying representation. This allows traversing complex data structures without needing to know their internal workings. In Scala, the `Iterator` trait is built-in and extensively used, especially with collections.  My example demonstrates a custom iterator for a sequence of Fibonacci numbers. It implements `Iterator[Int]` by maintaining the current and next values and updating them in the `next()` method.  Using a trait and the `next()`/`hasNext()` methods is the standard Scala way to define an Iterator, seamlessly integrating with for comprehensions and other functional constructs.

```scala
trait FibonacciIterator extends Iterator[Int] {
  private var current: Int = 0
  private var nextVal: Int = 1

  def hasNext: Boolean = true

  def next(): Int = {
    val result = current
    val temp = current + nextVal
    current = nextVal
    nextVal = temp
    result
  }
}

object FibonacciSequence {
  def iterator: FibonacciIterator = new FibonacciIterator()

  def take(n: Int): Seq[Int] = iterator.take(n).toSeq

  def main(args: Array[String]): Unit = {
    println(take(10)) // Output: Seq(0, 1, 1, 2, 3, 5, 8, 13, 21, 34)
    
    //Using a for comprehension
    println("First 5 Fibonacci numbers:")
    for (fib <- iterator.take(5)) {
      println(fib)
    }
  }
}
```