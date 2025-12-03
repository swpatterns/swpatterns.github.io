---
title: "Event-Driven Architecture - Scala"
date: 2025-12-03T14:55:22.029-05:00
draft: false
pattern_usage: ["Event-Driven Architecture"]
language: ["Scala"]
---
The Event-Driven Architecture (EDA) decouples system components by allowing them to communicate through events. Components (event producers) emit events without knowing who will handle them, and other components (event consumers) subscribe to events they're interested in. This promotes scalability, flexibility, and resilience.

This Scala implementation uses a simple `Event` trait and a `Publisher` class to broadcast events. `Subscriber`s register with the `Publisher` and receive events matching their interest.  We leverage Scala's functional programming capabilities with higher-order functions for event handling and immutable data structures for events.  The use of traits and classes aligns with Scala's OOP style, while the functional aspects keep the event handling concise and safe.  This approach avoids tight coupling and allows for dynamic addition/removal of subscribers.

```scala
trait Event {
  val timestamp: Long = System.currentTimeMillis()
}

case class MessageEvent(message: String) extends Event
case class UserCreatedEvent(userId: Int, username: String) extends Event

class Publisher {
  private var subscribers: List[Event => Unit] = List()

  def subscribe(subscriber: Event => Unit): Unit = {
    subscribers = subscriber :: subscribers
  }

  def unsubscribe(subscriber: Event => Unit): Unit = {
    subscribers = subscribers.filter(_ != subscriber)
  }

  def publish(event: Event): Unit = {
    subscribers.foreach(_(event))
  }
}

object EventDrivenExample {
  def main(args: Array[String]): Unit = {
    val publisher = new Publisher()

    val messageHandler: Event => Unit = event => {
      if (event.isInstanceOf[MessageEvent]) {
        val msgEvent = event.asInstanceOf[MessageEvent]
        println(s"Message Handler: Received message - ${msgEvent.message}")
      }
    }

    val userHandler: Event => Unit = event => {
      if (event.isInstanceOf[UserCreatedEvent]) {
        val userEvent = event.asInstanceOf[UserCreatedEvent]
        println(s"User Handler: User created - ${userEvent.username} (ID: ${userEvent.userId})")
      }
    }

    publisher.subscribe(messageHandler)
    publisher.subscribe(userHandler)

    publisher.publish(MessageEvent("Hello, EDA!"))
    publisher.publish(UserCreatedEvent(123, "Alice"))
    publisher.publish(MessageEvent("Another message."))

    publisher.unsubscribe(messageHandler)
    publisher.publish(MessageEvent("This won't be printed."))
  }
}
```