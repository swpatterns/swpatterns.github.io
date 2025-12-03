---
title: "Client-Server - Scala"
date: 2025-12-03T14:35:30.072-05:00
draft: false
pattern_usage: ["Client-Server"]
language: ["Scala"]
---
The Client-Server pattern establishes a relationship where one component (the client) requests services from another component (the server). The server provides resources or performs actions based on the client’s requests. This example uses Scala's `Future` to handle asynchronous communication, reflecting a common approach in Scala for concurrent operations and network interactions. We define a simple `Server` and `Client` where the server handles a string transformation and the client requests this service. The use of `Future` makes the client non-blocking while waiting for the server's response.  This aligns with Scala’s functional and concurrent-friendly nature.

```scala
import scala.concurrent.{Future, ExecutionContext}
import scala.util.{Success, Failure}

// Server Component
object Server {
  def processRequest(request: String)(implicit ec: ExecutionContext): Future[String] = {
    Future {
      // Simulate some processing time
      Thread.sleep(500)
      s"Server processed: ${request.toUpperCase}"
    }
  }
}

// Client Component
object Client {
  def sendRequest(request: String)(implicit ec: ExecutionContext): Unit = {
    Server.processRequest(request) onComplete {
      case Success(response) => println(s"Client received: $response")
      case Failure(exception) => println(s"Client error: ${exception.getMessage}")
    }
    println("Client sent request and is non-blocking...")
  }
}

// Main Program
object Main extends App {
  import scala.concurrent.ExecutionContext.Implicits.global
  Client.sendRequest("hello")
  Client.sendRequest("world")
  Thread.sleep(1000) // Allow futures to complete before exiting
}
```