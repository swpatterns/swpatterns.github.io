---
title: "Client-Server - Kotlin"
date: 2025-12-03T14:34:33.028-05:00
draft: false
pattern_usage: ["Client-Server"]
language: ["Kotlin"]
---
The Client-Server pattern distributes applications into two parts: clients, which request resources or services, and servers, which provide those resources or services.  This example uses Kotlin Coroutines and Channels for asynchronous communication. The server listens on a channel for client requests (strings) and responds with processed results (also strings). The client sends requests to the server's channel and receives responses. This is idiomatic Kotlin due to its concise syntax, use of coroutines for lightweight concurrency, and reliance on channels for safe communication between concurrent routines. The use of `launch` creates concurrent scopes for both client and server, preventing blocking.

```kotlin
import kotlinx.coroutines.*
import kotlin.system.measureTimeMillis

// Server
fun server(channel: ReceiveChannel<String>, responseChannel: SendChannel<String>) = runBlocking {
    for (message in channel) {
        println("Server received: $message")
        val result = processMessage(message)
        responseChannel.send(result)
    }
}

fun processMessage(message: String): String {
    // Simulate some work
    Thread.sleep(500)
    return "Server processed: ${message.uppercase()}"
}

// Client
fun client(channel: SendChannel<String>, responseChannel: ReceiveChannel<String>) = runBlocking {
    val messages = listOf("hello", "world", "kotlin")
    val times = messages.map { message ->
        val time = measureTimeMillis {
            channel.send(message)
            val response = responseChannel.receive()
            println("Client received: $response")
        }
        time to message
    }
    println("Processing took: ${times.sumOf { it.first }}ms")
}

fun main() {
    val requestChannel = Channel<String>()
    val responseChannel = Channel<String>()

    val serverJob = CoroutineScope(Dispatchers.Default).launch {
        server(requestChannel, responseChannel)
    }

    val clientJob = CoroutineScope(Dispatchers.Default).launch {
        client(responseChannel, requestChannel)
    }


    runBlocking{ serverJob.join() }
    runBlocking{ clientJob.join() }

    requestChannel.close()
    responseChannel.close()
}
```