---
title: "Dependency Injection - Scala"
date: 2025-12-03T11:22:00.359-05:00
draft: false
pattern_usage: ["Dependency Injection"]
language: ["Scala"]
---
Dependency Injection (DI) is a design pattern where components receive their dependencies from external sources rather than creating them themselves. This promotes loose coupling, making code more testable, maintainable, and reusable.  This Scala example uses constructor injection, a common DI approach, along with a simple container created using a companion object. The `Service` interface defines the dependency, and a concrete `EmailService` implementation is provided.  The `UserController` receives an instance of `Service` through its constructor. This is idiomatic Scala as it leverages immutability, interfaces (traits), and companion objects for clean containerization, avoiding unnecessary statefulness or complex factories.

```scala
trait Service {
  def send(message: String): Unit
}

class EmailService extends Service {
  override def send(message: String): Unit = {
    println(s"Sending email: $message")
  }
}

class UserController(service: Service) {
  def createUser(name: String): Unit = {
    service.send(s"User created: $name")
  }
}

object Container {
  lazy val service = new EmailService()
  lazy val userController = new UserController(service)
}

object Main extends App {
  Container.userController.createUser("Alice")
}
```