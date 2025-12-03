---
title: "Layered Architecture - Scala"
date: 2025-12-03T14:06:58.085-05:00
draft: false
pattern_usage: ["Layered Architecture"]
language: ["Scala"]
---
The Layered Architecture pattern organizes an application into distinct layers, each with a specific responsibility. This promotes separation of concerns, making the application easier to maintain and test. Common layers include Presentation (UI), Business Logic (application core), and Data Access (persistence).  My Scala example models a simple order processing system. The `OrderService` layer encapsulates order creation and validation logic. The `OrderRepository` handles persistence (in this case, a simple in-memory map).  The `OrderController` acts as the presentation layer, receiving input and orchestrating operations.  Using traits for layers and dependency injection allows for flexible testing and potential future swapping of implementations – a hallmark of functional Scala design.

```scala
// Domain Layer: Represents the business entities
case class Order(id: Int, items: List[String], total: Double)

// Data Access Layer: Handles persistence
trait OrderRepository {
  def save(order: Order): Unit
  def get(id: Int): Option[Order]
  def getAll: List[Order]
}

class InMemoryOrderRepository extends OrderRepository {
  private var orders: Map[Int, Order] = Map()
  var nextId = 1

  override def save(order: Order): Unit = {
    orders = orders + (order.id -> order)
    nextId += 1
  }

  override def get(id: Int): Option[Order] = orders.get(id)

  override def getAll: List[Order] = orders.values.toList
}

// Business Logic Layer: Contains the core application logic
trait OrderService {
  def createOrder(items: List[String]): Order
  def getOrder(id: Int): Option[Order]
  def getAllOrders: List[Order]
}

class DefaultOrderService(orderRepository: OrderRepository) extends OrderService {
  override def createOrder(items: List[String]): Order = {
    val total = items.size * 10.0 // Simplified price calculation
    val order = Order(orderRepository.getAll.size + 1, items, total)
    orderRepository.save(order)
    order
  }

  override def getOrder(id: Int): Option[Order] = orderRepository.get(id)

  override def getAllOrders: List[Order] = orderRepository.getAll
}

// Presentation Layer: Handles user interaction
trait OrderController {
  def createOrder(items: List[String]): Order
  def getOrder(id: Int): Option[Order]
  def getAllOrders: List[Order]
}

class OrderControllerImpl(orderService: OrderService) extends OrderController {
  override def createOrder(items: List[String]): Order = orderService.createOrder(items)
  override def getOrder(id: Int): Option[Order] = orderService.getOrder(id)
  override def getAllOrders: List[Order] = orderService.getAllOrders
}


// Main Application (Illustrative)
object Main extends App {
  val repository = new InMemoryOrderRepository()
  val service = new DefaultOrderService(repository)
  val controller = new OrderControllerImpl(service)

  val order1 = controller.createOrder(List("apple", "banana"))
  val order2 = controller.createOrder(List("orange", "grape", "kiwi"))

  println(s"Order 1: $order1")
  println(s"Order 2: ${controller.getOrder(2)}")
  println(s"All Orders: ${controller.getAllOrders}")
}
```