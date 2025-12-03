---
title: "Publish-Subscribe - Scala"
date: 2025-12-03T15:30:37.541-05:00
draft: false
pattern_usage: ["Publish-Subscribe"]
language: ["Scala"]
---
The Publish-Subscribe (Pub/Sub) pattern decouples message publishers from message subscribers. Publishers don't know who their subscribers are, and subscribers only know about the channels they're interested in, not the publishers. This promotes loose coupling and scalability. Our Scala implementation uses a `Subject` (or MessageBroker) which maintains a list of subscribers and is responsible for dispatching messages to them.  Subscribers register with the subject to receive messages on specific topics.  We leverage Scala’s case classes for message representation and immutable collections for thread-safety. The use of higher-order functions for subscription management is a functional and idiomatic approach.

```scala
// Publisher Subscriber (Pub/Sub) Pattern in Scala

// Define a simple message
case class Message(topic: String, content: String)

// Subject (Message Broker)
class Subject {
  private var subscribers: Map[String, Seq[String => Unit]] = Map.empty

  def subscribe(topic: String, callback: String => Unit): Unit = {
    subscribers = subscribers + (topic -> (callback +: subscribers.getOrElse(topic, Seq.empty)))
  }

  def unsubscribe(topic: String, callback: String => Unit): Unit = {
    val currentSubscribers = subscribers.getOrElse(topic, Seq.empty)
    subscribers = subscribers + (topic -> currentSubscribers.filter(_ != callback))
  }

  def publish(message: Message): Unit = {
    subscribers.get(message.topic).foreach { callbacks =>
      callbacks.foreach(callback => callback(message.content))
    }
  }
}

// Example Usage
object PubSubExample {
  def main(args: Array[String]): Unit = {
    val subject = new Subject()

    // Subscriber 1
    subject.subscribe("news", message => println(s"Subscriber 1 received: $message"))

    // Subscriber 2
    subject.subscribe("news", message => println(s"Subscriber 2 received: $message"))

    subject.subscribe("sports", message => println(s"Subscriber 3 received: $message"))

    // Publish messages
    subject.publish(Message("news", "Breaking news: Scala is awesome!"))
    subject.publish(Message("sports", "The home team won!"))

    // Unsubscribe Subscriber 1
    subject.unsubscribe("news", message => println(s"Subscriber 1 received: $message"))

    // Publish another message
    subject.publish(Message("news", "Another news update."))
  }
}
```