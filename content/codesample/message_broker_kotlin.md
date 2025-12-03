---
title: "Message Broker - Kotlin"
date: 2025-12-03T15:09:10.150-05:00
draft: false
pattern_usage: ["Message Broker"]
language: ["Kotlin"]
---
The Message Broker pattern decouples components of an application by allowing them to communicate through a central message bus. This promotes scalability and maintainability as components aren’t directly dependent on each other.  Here, we use Kotlin Coroutines and Channels to implement a simple in-memory message broker.  `MessageBroker` acts as the bus, with `publish` and `subscribe` functions.  `publish` sends messages to the channel, and `subscribe` creates a coroutine that receives messages.  Kotlin’s coroutines provide a concise way to handle asynchronous message consumption, and Channels are a type-safe conduit for communication. This approach leverages Kotlin’s concurrency features for a clean and efficient implementation.

```kotlin
import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

class MessageBroker {
    private val channel = Channel<String>()

    suspend fun publish(message: String) {
        channel.send(message)
    }

    fun subscribe(): ReceiveChannel<String> {
        return channel
    }
}

fun main() = runBlocking {
    val broker = MessageBroker()

    // Subscriber 1
    launch {
        broker.subscribe().collect { message ->
            println("Subscriber 1 received: $message")
        }
    }

    // Subscriber 2
    launch {
        broker.subscribe().collect { message ->
            println("Subscriber 2 received: $message")
        }
    }

    // Publisher
    coroutineScope {
        launch {
            broker.publish("Hello, Kotlin!")
            delay(500)
            broker.publish("Another message")
            delay(500)
            broker.publish("Last message")
        }
    }
}
```