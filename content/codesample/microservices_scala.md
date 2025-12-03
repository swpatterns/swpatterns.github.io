---
title: "Microservices - Scala"
date: 2025-12-03T14:45:37.134-05:00
draft: false
pattern_usage: ["Microservices"]
language: ["Scala"]
---
The Microservices pattern structures an application as a collection of loosely coupled, independently deployable services, modeled around a business domain. Each service owns its data and communicates via lightweight mechanisms, often a REST API. This example demonstrates a simplified scenario with two microservices: `UserService` and `OrderService`. They communicate using HTTP requests. Scala’s functional nature and Akka toolkit (though not fully utilized here for brevity) make it well-suited for building resilient and concurrent microservices. The use of case classes for data transfer and simple HTTP routes with `http4s` aligns with Scala’s concise and expressive style.

```scala
// UserService.scala
import http4s._
import http4s.dsl.http4s._
import http4s.server.blaze._
import scala.concurrent.ExecutionContext

case class User(id: Int, name: String)

object UserService extends HttpApp(ExecutionContext.global) {
  val users = Map(1 -> User(1, "Alice"), 2 -> User(2, "Bob"))

  val httpRoutes: HttpRoutes[IO] = HttpRoutes.of[IO] {
    case GET -> Root / "users" / idStr =>
      users.get(idStr.toInt) match {
        case Some(user) => Ok(user)
        case None => NotFound()
      }
  }

  override def server(args: RequestParser): Server[IO] = {
    BlazeServerBuilder[IO](ExecutionContext.global)
      .bindHttp(8081)
      .mountService(httpRoutes)
      .resource
  }
}

// OrderService.scala
import http4s._
import http4s.dsl.http4s._
import http4s.server.blaze._
import scala.concurrent.ExecutionContext
import scala.io.Source

case class Order(userId: Int, productId: String)

object OrderService extends HttpApp(ExecutionContext.global) {

  val httpRoutes: HttpRoutes[IO] = HttpRoutes.of[IO] {
    case GET -> Root / "orders" / userIdStr =>
      // Simulate fetching orders.  In a real system, this would query a database.
      val orders = List(Order(userIdStr.toInt, "ProductA"), Order(userIdStr.toInt, "ProductB"))
      IO.pure(Ok(orders))
  }

  override def server(args: RequestParser): Server[IO] = {
    BlazeServerBuilder[IO](ExecutionContext.global)
      .bindHttp(8082)
      .mountService(httpRoutes)
      .resource
  }
}
```