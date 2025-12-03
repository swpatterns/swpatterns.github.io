---
title: "Object Pool - Scala"
date: 2025-12-03T11:15:23.740-05:00
draft: false
pattern_usage: ["Object Pool"]
language: ["Scala"]
---
The Object Pool pattern manages a pool of reusable objects to reduce the overhead of frequent creation and destruction, especially for expensive-to-create resources. This implementation uses a `Pool` class to hold a fixed-size collection of generic typed objects. `acquire` retrieves an object from the pool, and `release` returns it for reuse. A `reset` method is included to prepare an object for re-use.  The use of `mutable.Queue` for the pool and `synchronized` blocks for thread safety are idiomatic Scala approaches.  This avoids garbage collection pressure and improves performance when dealing with resource intensive operations.

```scala
import scala.collection.mutable

class Pool[T](private val create: () => T, private val maxSize: Int) {
  private val pool: mutable.Queue[T] = mutable.Queue()

  // Initialize the pool
  (0 until maxSize).foreach(_ => pool.enqueue(create()))

  def acquire(): T = synchronized {
    pool.dequeue()
  }

  def release(obj: T): Unit = synchronized {
    reset(obj)
    pool.enqueue(obj)
  }

  private def reset(obj: T): Unit = {
    // Perform any necessary reset operations on the object here
    // For example, reset internal state to default values.
    //This is a no-op for now; type-specific reset logic would go here.
  }
}

// Example usage (dummy ExpensiveObject)
case class ExpensiveObject(var value: Int = 0) {
  def doSomething(): Unit = {
    println(s"Doing something with value: $value")
  }
}

object ObjectPoolExample {
  def main(args: Array[String]): Unit = {
    val pool = new Pool(ExpensiveObject, 5)

    val obj1 = pool.acquire()
    obj1.value = 10
    obj1.doSomething()
    pool.release(obj1)

    val obj2 = pool.acquire()
    obj2.value = 20
    obj2.doSomething()
    pool.release(obj2)
  }
}
```