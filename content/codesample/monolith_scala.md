---
title: "Monolith - Scala"
date: 2025-12-03T14:27:47.835-05:00
draft: false
pattern_usage: ["Monolith"]
language: ["Scala"]
---
The Monolith pattern represents a tightly coupled, single-tier software application built as a unified unit. While often criticized for scaling and deployment challenges, it simplifies initial development and can be performant for smaller applications.  This Scala example shows a basic blueprint for a monolithic application. It combines data handling, business logic, and presentation (via simple println statements) all within a single object, simulating a classic monolith structure. This approach reflects Scala's capability for concise, object-oriented programs where application logic resides within objects.  No explicit interfaces or loose coupling techniques are used, demonstrating the tightly-integrated nature of a monolith.

```scala
object Monolith {

  // Data Model
  case class User(id: Int, name: String, email: String)

  // Data Store (in-memory for simplicity)
  private var users: List[User] = List.empty

  // Business Logic
  def createUser(name: String, email: String): User = {
    val id = users.length + 1
    val newUser = User(id, name, email)
    users = newUser :: users
    newUser
  }

  def getUserById(id: Int): Option[User] = {
    users.find(_.id == id)
  }

  def getAllUsers(): List[User] = {
    users
  }

  // Presentation Layer (Console Output)
  def main(args: Array[String]): Unit = {
    val user1 = createUser("Alice", "alice@example.com")
    val user2 = createUser("Bob", "bob@example.com")

    println(s"Created user: $user1")
    println(s"Created user: $user2")

    println(s"User with ID 1: ${getUserById(1)}")
    println(s"All Users: ${getAllUsers()}")
  }
}
```