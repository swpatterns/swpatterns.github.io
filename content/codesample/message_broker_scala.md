---
title: "Message Broker - Scala"
date: 2025-12-03T15:10:23.138-05:00
draft: false
pattern_usage: ["Message Broker"]
language: ["Scala"]
---
The Message Broker pattern decouples system components by enabling asynchronous communication through a central message bus.  Components don't directly interact; instead, they publish messages to topics/queues, and other components subscribe to those topics/queues to receive and process messages. This promotes loose coupling, scalability, and resilience.  Here, we simulate a simple broker using `actors` in Scala, providing topic-based publishing and subscription. `Actors` naturally handle asynchronous messaging, making them a good fit. Using `case classes` for messages ensures type safety and a concise message format, typical of Scala.

```scala
import akka.actor._
import scala.collection.mutable

object MessageBroker {
  // Messages
  sealed trait BrokerMessage
  case class Subscribe(topic: String, subscriber: ActorRef) extends BrokerMessage
  case class Publish(topic: String, message: String) extends BrokerMessage

  // Actor definition
  class Broker extends Actor {
    private val subscribers = mutable.Map[String, Set[ActorRef]]()

    override def receive: Receive = {
      case Subscribe(topic, subscriber) =>
        subscribers.getOrElseUpdate(topic, Set.empty) += subscriber
        println(s"Subscriber $subscriber registered for topic: $topic")

      case Publish(topic, message) =>
        subscribers.get(topic) match {
          case Some(subs) =>
            subs.foreach(_ ! message)
            println(s"Published message '$message' to topic: $topic")
          case None =>
            println(s"No subscribers for topic: $topic")
        }
    }
  }

  // Example Subscribers
  class Subscriber(topic: String, broker: ActorRef) extends Actor {
    broker ! Subscribe(topic, self)

    override def receive: Receive = {
      case message: String =>
        println(s"$self received message: $message from topic: $topic")
    }
  }

  def main(args: Array[String]): Unit = {
    val system = ActorSystem("MessageBrokerSystem")
    val broker = system.actorOf(Props[Broker], "messageBroker")

    val subscriber1 = system.actorOf(Props(new Subscriber("news", broker)), "subscriber1")
    val subscriber2 = system.actorOf(Props(new Subscriber("sports", broker)), "subscriber2")
    val subscriber3 = system.actorOf(Props(new Subscriber("news", broker)), "subscriber3")

    broker ! Publish("news", "Breaking news: Scala is amazing!")
    broker ! Publish("sports", "Local team wins championship!")
    broker ! Publish("politics", "No subscribers here!")

    system.terminate()
  }
}
```