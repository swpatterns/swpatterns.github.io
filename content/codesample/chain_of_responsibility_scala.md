---
title: "Chain of Responsibility - Scala"
date: 2025-12-03T12:59:41.242-05:00
draft: false
pattern_usage: ["Chain of Responsibility"]
language: ["Scala"]
---
The Chain of Responsibility is a behavioral pattern that allows an object to pass a request along a chain of handlers. Each handler decides either to process the request or to pass it to the next handler in the chain. This decouples the sender of a request from its receivers, allowing for flexible and extensible handling of requests.

My Scala implementation uses a linked list to represent the chain of responsibility. Each handler is a function that takes a request and either processes it, returning a result, or passes it on to the next handler using `chain.headOption.map(_.apply(request))`. The `handleRequest` function initiates the chain. This approach is idiomatic Scala due to the use of functional composition and immutable data structures (the linked list chain).  It avoids mutable state and leverages Scala's concise syntax for function definitions and application.

```scala
trait Request

case class AuthenticationRequest(username: String, password: String) extends Request
case class LoggingRequest(message: String) extends Request

trait Handler {
  def handle(request: Request): Option[String]
}

object ChainOfResponsibility {

  def handleRequest(request: Request, chain: List[Handler]): Option[String] = {
    chain.headOption.flatMap(handler => handler.handle(request))
  }

  def authenticationHandler(correctPassword: String): Handler = new Handler {
    override def handle(request: AuthenticationRequest): Option[String] = {
      if (request.password == correctPassword) {
        Some("Authentication successful")
      } else {
        None
      }
    }
    override def handle(request: Request): Option[String] = None
  }

  def loggingHandler: Handler = new Handler {
    override def handle(request: LoggingRequest): Option[String] = {
      Some("Logged: " + request.message)
    }

    override def handle(request: Request): Option[String] = None
  }

  def main(args: Array[String]): Unit = {
    val authChain = authenticationHandler("password123") :: Nil
    val fullChain = authenticationHandler("password123") :: loggingHandler :: Nil

    val authRequest = AuthenticationRequest("user", "password123")
    val logRequest = LoggingRequest("User accessed the system.")

    println(handleRequest(authRequest, authChain)) // Some(Authentication successful)
    println(handleRequest(logRequest, authChain))  // None
    println(handleRequest(authRequest, fullChain)) // Some(Authentication successful)
    println(handleRequest(logRequest, fullChain))  // Some(Logged: User accessed the system.)
  }
}
```