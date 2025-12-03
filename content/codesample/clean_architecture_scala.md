---
title: "Clean Architecture - Scala"
date: 2025-12-03T14:19:53.523-05:00
draft: false
pattern_usage: ["Clean Architecture"]
language: ["Scala"]
---
The Clean Architecture pattern separates an application into concentric layers: Entities, Use Cases, Interface Adapters, and Frameworks & Drivers. Inner layers are independent of outer ones, promoting testability, maintainability, and flexibility. This example demonstrates a simplified version focused on the core separation of Use Cases from its dependencies.  The `Core` project defines Entities and Use Cases, independent of any framework.  The `Application` project adapts the use cases to a specific implementation (e.g., using a repository for data access).  This leverages Scala's strong typing and immutability for clear dependency injection and testability. The use of traits allows for easy extension and swapping of implementations without affecting core business logic.

```scala
// Core project (independent of frameworks)
// entities/User.scala
package core.entities

case class User(id: Int, name: String)

// usecases/UserUseCase.scala
package core.usecases

import core.entities.User

trait UserUseCase {
  def getUser(id: Int): Option[User]
}

// Application project (framework/driver specific)
// repositories/UserRepository.scala
package application.repositories

import core.entities.User

trait UserRepository {
  def getById(id: Int): Option[User]
}

class InMemoryUserRepository extends UserRepository {
  private val users: Map[Int, User] = Map(
    1 -> User(1, "Alice"),
    2 -> User(2, "Bob")
  )

  override def getById(id: Int): Option[User] = users.get(id)
}

// usecaseimpl/UserUseCaseImpl.scala
package application.usecaseimpl

import core.usecases.UserUseCase
import application.repositories.UserRepository

class UserUseCaseImpl(userRepository: UserRepository) extends UserUseCase {
  override def getUser(id: Int): Option[User] = userRepository.getById(id)
}

// main.scala (entry point)
package application

import application.usecaseimpl.UserUseCaseImpl
import application.repositories.InMemoryUserRepository

object Main extends App {
  val userRepository = new InMemoryUserRepository()
  val userUseCase = new UserUseCaseImpl(userRepository)

  val alice = userUseCase.getUser(1)
  println(alice) // Output: Some(User(1,Alice))

  val charlie = userUseCase.getUser(3)
  println(charlie) // Output: None
}
```