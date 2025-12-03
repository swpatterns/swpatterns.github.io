---
title: "SOA - Scala"
date: 2025-12-03T14:50:27.378-05:00
draft: false
pattern_usage: ["SOA"]
language: ["Scala"]
---
The Service-Oriented Architecture (SOA) pattern structures an application as a collection of loosely coupled, interoperable services. Each service encapsulates a specific business function and exposes it through a well-defined interface, typically a network protocol. This promotes modularity, reusability, and independent deployment.

This Scala example demonstrates a simplified SOA with two services: `UserService` and `OrderService`. They are defined as traits with concrete implementations. A `ServiceClient` interacts with these services via their interfaces.  Using traits allows for flexible composition and dependency injection. The `ServiceClient` doesn't need to know the concrete implementations, only the interfaces. This aligns with Scala's emphasis on immutability and functional programming principles, promoting clear separation of concerns and testability.  The use of case classes for data transfer objects (DTOs) is also idiomatic Scala.

```scala
// User Service
trait UserService {
  def getUser(userId: Int): Option[User]
}

case class User(id: Int, name: String, email: String)

class UserServiceImpl extends UserService {
  private val users = Map(
    1 -> User(1, "Alice", "alice@example.com"),
    2 -> User(2, "Bob", "bob@example.com")
  )

  override def getUser(userId: Int): Option[User] = users.get(userId)
}

// Order Service
trait OrderService {
  def createOrder(userId: Int, items: List[String]): Order
}

case class Order(orderId: Int, userId: Int, items: List[String])

class OrderServiceImpl extends OrderService {
  private var nextOrderId = 1

  override def createOrder(userId: Int, items: List[String]): Order = {
    val order = Order(nextOrderId, userId, items)
    nextOrderId += 1
    order
  }
}

// Service Client
class ServiceClient(userService: UserService, orderService: OrderService) {
  def processOrder(userId: Int, items: List[String]): Order = {
    userService.getUser(userId) match {
      case Some(user) =>
        println(s"Order for user: ${user.name}")
        orderService.createOrder(userId, items)
      case None =>
        println(s"User with ID $userId not found.")
        Order(0, 0, List.empty) // Return an empty order if user not found
    }
  }
}

// Example Usage
object Main {
  def main(args: Array[String]): Unit = {
    val userService = new UserServiceImpl()
    val orderService = new OrderServiceImpl()
    val client = new ServiceClient(userService, orderService)

    val order1 = client.processOrder(1, List("Book", "Pen"))
    println(s"Order 1: $order1")

    val order2 = client.processOrder(3, List("Laptop"))
    println(s"Order 2: $order2")
  }
}
```