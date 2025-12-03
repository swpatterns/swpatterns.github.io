---
title: "Peer-to-Peer - Kotlin"
date: 2025-12-03T06:25:59.259-05:00
draft: false
pattern_usage: ["Peer-to-Peer"]
language: ["Kotlin"]
---
The Peer-to-Peer (P2P) pattern enables direct communication and data exchange between independent entities (peers) without relying on a central server. Each peer acts as both client and server. This Kotlin example uses Kotlin Coroutines and Channels to simulate a simple P2P network. Peers broadcast messages to each other, and each peer listens for incoming messages to process. The implementation employs `ReceiveChannel` and `SendChannel` for asynchronous communication and `launch` for concurrent message handling, aligning with Kotlin's concurrency model.  The use of data classes for message representation illustrates Kotlin's conciseness and readability.

```kotlin
import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

data class Message(val sender: String, val content: String)

class Peer(val name: String, val peers: MutableList<Peer>) {
    private val incomingMessages = Channel<Message>()

    fun startListening() = CoroutineScope(Dispatchers.Default).launch {
        for (message in incomingMessages) {
            println("$name received: ${message.sender} -> ${message.content}")
        }
    }

    fun sendMessage(content: String) {
        val message = Message(name, content)
        for (peer in peers) {
            if (peer != this) {
                peer.incomingMessages.send(message)
            }
        }
    }

    fun receiveChannel(): ReceiveChannel<Message> = incomingMessages
}

fun main() {
    val peer1 = Peer("Alice", mutableListOf())
    val peer2 = Peer("Bob", mutableListOf())
    val peer3 = Peer("Charlie", mutableListOf())

    peer1.peers.addAll(listOf(peer2, peer3))
    peer2.peers.addAll(listOf(peer1, peer3))
    peer3.peers.addAll(listOf(peer1, peer2))

    val aliceListener = peer1.startListening()
    val bobListener = peer2.startListening()
    val charlieListener = peer3.startListening()

    peer1.sendMessage("Hello, everyone!")
    peer2.sendMessage("Hi Alice!")
    peer3.sendMessage("Greetings from Charlie.")

    Thread.sleep(1000) // Allow time for messages to propagate

    aliceListener.cancel()
    bobListener.cancel()
    charlieListener.cancel()
}
```