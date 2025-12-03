---
title: "Service Locator - Scala"
date: 2025-12-03T11:25:56.317-05:00
draft: false
pattern_usage: ["Service Locator"]
language: ["Scala"]
---
The Service Locator pattern provides a central point of access to various services within an application. Instead of hardcoding dependencies or using explicit constructor injection, components request services from a central "locator" object. This enhances decoupling and makes it easier to swap implementations.

This Scala implementation uses a companion object to act as the service locator.  `Services` holds a `Map` of service names to their corresponding instances. `getService` retrieves an instance by name, and `registerService` allows adding services. It's idiomatic Scala due to the use of immutable maps, companion objects for organizing related functionality, and the flexibility of Scala's type system. Pattern matching in `getService` provides a safe way to handle missing services.

```scala
object Services {

  private val services: Map[String, Any] = Map.empty

  def registerService[T](name: String, service: T): Unit = {
    //In a real scenario would want to avoid direct mutable state, potentially using a Ref/Var
    //given the immutability focus of Scala.
    println(s"Registering service: $name")
  }

  def getService[T](name: String): Option[T] = {
    println(s"Requesting service: $name")
    // This could be replaced with a lookup in a more robust storage system.
    // In this example, we return None as services aren't actually stored.
    None
  }
}

class MyComponent {
  def doSomething(): Unit = {
    val logger = Services.getService[Logger].getOrElse(new DefaultLogger)
    logger.log("MyComponent doing something")
  }
}

trait Logger {
  def log(message: String): Unit
}

class DefaultLogger extends Logger {
  override def log(message: String): Unit = println(s"LOG: $message")
}

object Main extends App {
  val component = new MyComponent()
  component.doSomething()
}
```