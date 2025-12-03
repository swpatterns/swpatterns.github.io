---
title: "Onion Architecture - Scala"
date: 2025-12-03T14:15:46.339-05:00
draft: false
pattern_usage: ["Onion Architecture"]
language: ["Scala"]
---
The Onion Architecture aims for loose coupling and improved testability by organizing code into concentric layers. The innermost layer represents the domain/business logic, independent of any infrastructure concerns. Surrounding layers represent use cases, interfaces (ports), and finally, the infrastructure (databases, UI, etc.). Dependencies point inwards – inner layers define what outer layers *need*, but are unaware of *how* those needs are met.  This promotes a clean separation of concerns.

Here, we model a simple order processing system. The `Domain` layer defines core entities like `Order`. The `UseCases` layer contains logic for creating and processing orders, depending on `Domain` entities but not infrastructure. The `Ports` (interfaces) define how use cases interact with external concerns. Finally, `Infrastructure` provides concrete implementations (like a dummy repository). Notice dependencies flow inwards via interfaces.

```scala
// Domain Layer (Innermost)
package domain

case class Order(id: Int, items: List[String], totalAmount: Double)

// Use Cases Layer
package usecases

import domain.Order

trait OrderService {
  def createOrder(items: List[String]): Order
  def processOrder(orderId: Int): Order
}

class DefaultOrderService(orderRepository: OrderRepository) extends OrderService {
  override def createOrder(items: List[String]): Order = {
    val total = items.size * 10.0 // Simple pricing
    val order = Order(1, items, total)
    orderRepository.save(order)
    order
  }

  override def processOrder(orderId: Int): Order = {
    // Business logic to process order
    val order = orderRepository.findById(orderId)
    order.copy(status = "Processed") //Assume Order has a status field
  }
}

trait OrderRepository {
  def save(order: Order): Order
  def findById(orderId: Int): Order
}

// Ports Layer (Interfaces) - defined within Use Cases since these are what the use cases require

// Infrastructure Layer (Outermost)
package infrastructure

import usecases.OrderRepository
import domain.Order

class InMemoryOrderRepository extends OrderRepository {
  private var orders: Map[Int, Order] = Map.empty

  override def save(order: Order): Order = {
    orders = orders + (order.id -> order)
    order
  }

  override def findById(orderId: Int): Order = {
    orders.get(orderId).getOrElse(throw new NoSuchElementException(s"Order with id $orderId not found"))
  }
}

// Entry Point / Application
object Main extends App {
  val repository = new InMemoryOrderRepository()
  val orderService = new DefaultOrderService(repository)

  val newOrder = orderService.createOrder(List("ItemA", "ItemB"))
  println(s"Created order: $newOrder")

  val processedOrder = orderService.processOrder(newOrder.id)
  println(s"Processed order: $processedOrder")
}
```