---
title: "Hexagonal Architecture - Scala"
date: 2025-12-03T14:11:26.088-05:00
draft: false
pattern_usage: ["Hexagonal Architecture"]
language: ["Scala"]
---
The Hexagonal Architecture (also known as Ports and Adapters) aims to create loosely coupled application components by isolating the core application logic from external concerns like databases, UI, or messaging systems. This is achieved by defining *ports* (interfaces) that the core uses to interact with the outside world, and *adapters* that implement these ports to connect to specific technologies.  This allows for swapping implementations without modifying the core.

This Scala example demonstrates a simple Hexagonal Architecture for a user service. The core `UserService` interacts with a `UserRepository` port.  We provide an in-memory adapter (`InMemoryUserRepository`) for testing and a potential database adapter (commented out).  The `User` data class represents the domain.  The use of traits for ports and case classes/immutability aligns with Scala’s functional strengths and promotes clear interface separation.

```scala
trait UserRepository {
  def save(user: User): User
  def findById(id: String): Option[User]
}

case class User(id: String, name: String)

class UserService(userRepository: UserRepository) {
  def createUser(name: String): User = {
    val newUser = User(java.util.UUID.randomUUID().toString, name)
    userRepository.save(newUser)
  }

  def getUser(id: String): Option[User] = {
    userRepository.findById(id)
  }
}

// In-Memory Adapter (for testing)
class InMemoryUserRepository extends UserRepository {
  private var users: Map[String, User] = Map.empty

  override def save(user: User): User = {
    users = users + (user.id -> user)
    user
  }

  override def findById(id: String): Option[User] = {
    users.get(id)
  }
}

// Potential Database Adapter (implementation omitted for brevity)
// class DatabaseUserRepository extends UserRepository {
//   def save(user: User): User = ???
//   def findById(id: String): Option[User] = ???
// }

object Main extends App {
  val userRepository = new InMemoryUserRepository()
  val userService = new UserService(userRepository)

  val user1 = userService.createUser("Alice")
  val user2 = userService.createUser("Bob")

  println(s"Created user: $user1")
  println(s"Created user: $user2")

  println(s"User with id ${user1.id}: ${userService.getUser(user1.id)}")
  println(s"User with id ${user2.id}: ${userService.getUser(user2.id)}")
}
```