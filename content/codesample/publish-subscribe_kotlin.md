---
title: "Publish-Subscribe - Kotlin"
date: 2025-12-03T15:29:39.382-05:00
draft: false
pattern_usage: ["Publish-Subscribe"]
language: ["Kotlin"]
---
The Publish-Subscribe (Pub/Sub) pattern decouples message publishers from message subscribers. Publishers don't know which subscribers exist, and subscribers only know about the messages they're interested in. A central message broker (often called an event bus or dispatcher) manages message delivery.

The Kotlin code below implements a simple Pub/Sub system using a `Topic` class as the message broker. Publishers `publish` messages to a topic, and subscribers `subscribe` to receive them.  We use Kotlin's functional programming capabilities with extension functions to offer a clean `subscribe` API.  The use of `MutableList` and `forEach` for subscribers aims for simplicity in this illustrative example; in a production environment, consider thread safety and more robust collection handling.  Data classes improve code conciseness.

```kotlin
data class Message(val topic: String, val content: Any)

class Topic {
    private val subscribers: MutableList<((Message) -> Unit)> = mutableListOf()

    fun subscribe(topic: String, callback: (Message) -> Unit): () -> Unit {
        subscribers.add { message ->
            if (message.topic == topic) {
                callback(message)
            }
        }
        return { subscribers.remove(callback) } // Return unsubscribe function
    }

    fun publish(message: Message) {
        subscribers.forEach { it(message) }
    }
}

fun Topic.subscribe(topic: String, block: (Any) -> Unit): () -> Unit {
    return this.subscribe(topic) { msg -> block(msg.content) }
}


fun main() {
    val topic = Topic()

    // Subscriber 1
    val unsubscribe1 = topic.subscribe("news") { content ->
        println("Subscriber 1 received news: $content")
    }

    // Subscriber 2
    topic.subscribe("sports") { content ->
        println("Subscriber 2 received sports: $content")
    }

    // Subscriber 3 (handles both news and sports)
    val unsubscribe3 = topic.subscribe("news") { content ->
        println("Subscriber 3 received news: $content")
    }
    topic.subscribe("sports") { content ->
        println("Subscriber 3 received sports: $content")
    }

    topic.publish(Message("news", "Kotlin is awesome!"))
    topic.publish(Message("sports", "Team A won the championship."))
    topic.publish(Message("weather", "It's sunny today.")) // No subscribers

    unsubscribe1() // Stop receiving news

    topic.publish(Message("news", "Another Kotlin update!")) // Only Subscriber 3 receives this
}
```