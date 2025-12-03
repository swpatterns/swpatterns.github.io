---
title: "Mediator - Scala"
date: 2025-12-03T13:17:47.029-05:00
draft: false
pattern_usage: ["Mediator"]
language: ["Scala"]
---
The Mediator pattern defines an object that encapsulates how a set of objects interact. This promotes loose coupling by preventing objects from referring to each other explicitly, and it lets you vary their interactions independently.  In this Scala example, `ChatMediator` mediates communication between `User` objects. Each user registers with the mediator and sends messages *to* the mediator, which then distributes them to the appropriate recipients.  Scala’s case classes and traits are well-suited for defining the components. Using an abstract `Mediator` allows flexibility for different mediation strategies, and is a common functional approach to structuring interactions.

```scala
trait Mediator {
  def sendMessage(message: String, user: User): Unit
}

case class User(name: String, mediator: Mediator) {
  def send(message: String): Unit = {
    mediator.sendMessage(message, this)
  }

  def receive(message: String): Unit = {
    println(s"${name} received: ${message}")
  }
}

class ChatMediator extends Mediator {
  private var users: List[User] = List.empty

  override def sendMessage(message: String, user: User): Unit = {
    println(s"${user.name} sends: ${message}")
    users.filter(_ != user).foreach(_.receive(message))
  }

  def addUser(user: User): Unit = {
    users = user :: users
  }
}

object MediatorExample extends App {
  val mediator = new ChatMediator()
  val alice = User("Alice", mediator)
  val bob = User("Bob", mediator)
  val charlie = User("Charlie", mediator)

  mediator.addUser(alice)
  mediator.addUser(bob)
  mediator.addUser(charlie)

  alice.send("Hello everyone!")
  bob.send("Hi Alice!")
  charlie.send("What's up?")
}
```