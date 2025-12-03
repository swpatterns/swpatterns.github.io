---
title: "Space-Based Architecture - Scala"
date: 2025-12-03T15:00:18.813-05:00
draft: false
pattern_usage: ["Space-Based Architecture"]
language: ["Scala"]
---
The Space-Based Architecture pattern decouples components of a system by using a message-based communication system, often referred to as a "space." Components interact by sending and receiving messages without direct knowledge of each other. This promotes scalability, fault tolerance, and flexibility. In Scala, Akka's Actors provide a natural implementation of this pattern. Each actor represents a component and communicates via asynchronous messages. This example demonstrates a simple order processing system with an `OrderService` and a `PaymentService` communicating through messages. The use of immutable data and `pattern matching` on messages is idiomatic Scala and enhances the clarity and safety of the interaction.

```scala
import akka.actor.{Actor, ActorSystem, Props}

// Messages
sealed trait OrderEvent
case class CreateOrder(orderId: String, amount: Double) extends OrderEvent
case object OrderCreated extends OrderEvent
case object PaymentProcessed extends OrderEvent
case class PaymentFailed(orderId: String, reason: String) extends OrderEvent

// Order Service Actor
class OrderService extends Actor {
  override def receive: Receive = {
    case CreateOrder(orderId, amount) =>
      println(s"Order Service: Received CreateOrder for $orderId, amount $amount")
      // Simulate order creation
      sender() ! OrderCreated
    case OrderCreated =>
      println("Order Service: Order created.  Requesting Payment.")
      context.actorFor("PaymentService") ! CreateOrder(orderId = "123", amount = 100.0) // Hardcoded for simplicity
    case PaymentProcessed =>
      println("Order Service: Payment processed successfully.")
    case PaymentFailed(orderId, reason) =>
      println(s"Order Service: Payment failed for $orderId, reason: $reason")
  }
}

// Payment Service Actor
class PaymentService extends Actor {
  override def receive: Receive = {
    case CreateOrder(orderId, amount) =>
      println(s"Payment Service: Received CreateOrder for $orderId, amount $amount")
      // Simulate payment processing
      if (amount > 50) {
        sender() ! PaymentProcessed
      } else {
        sender() ! PaymentFailed(orderId, "Amount too low")
      }
  }
}

// Main Application
object SpaceBasedArchitecture extends App {
  val system = ActorSystem("SpaceBasedSystem")

  val orderService = system.actorOf(Props[OrderService], "OrderService")
  val paymentService = system.actorOf(Props[PaymentService], "PaymentService")

  orderService ! CreateOrder("456", 75.0)

  Thread.sleep(1000) // Allow messages to be processed
  system.terminate()
}
```