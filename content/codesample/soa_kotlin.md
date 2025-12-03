---
title: "SOA - Kotlin"
date: 2025-12-03T14:49:11.792-05:00
draft: false
pattern_usage: ["SOA"]
language: ["Kotlin"]
---
The Service-Oriented Architecture (SOA) pattern structures an application as a collection of loosely coupled, interoperable services. Each service encapsulates a specific business function and exposes it through a well-defined interface, typically a network call. This promotes modularity, reusability, and independent deployment.

This Kotlin example demonstrates a simplified SOA with two services: `UserService` and `OrderService`. They are defined as interfaces with concrete implementations. A `ServiceClient` is used to interact with these services.  Kotlin's use of interfaces and data classes aligns well with SOA's emphasis on contracts and data exchange. Dependency Injection (though not explicitly shown with a framework here for brevity) would be a natural extension for managing service dependencies in a larger application.  The use of `data class` for request/response objects is idiomatic Kotlin for concise data representation.

```kotlin
// Define service interfaces
interface UserService {
    data class User(val id: Int, val name: String)
    fun getUser(userId: Int): User?
}

interface OrderService {
    data class Order(val orderId: Int, val userId: Int, val amount: Double)
    fun getOrder(orderId: Int): Order?
}

// Implementations of the services
class UserServiceImpl : UserService {
    private val users = mapOf(
        1 to UserService.User(1, "Alice"),
        2 to UserService.User(2, "Bob")
    )

    override fun getUser(userId: Int): UserService.User? = users[userId]
}

class OrderServiceImpl : OrderService {
    private val orders = mapOf(
        101 to OrderService.Order(101, 1, 50.0),
        102 to OrderService.Order(102, 2, 100.0)
    )

    override fun getOrder(orderId: Int): OrderService.Order? = orders[orderId]
}

// Client to consume the services
class ServiceClient(private val userService: UserService, private val orderService: OrderService) {
    fun processOrder(userId: Int, orderId: Int): String {
        val user = userService.getUser(userId) ?: return "User not found"
        val order = orderService.getOrder(orderId) ?: return "Order not found"

        if (user.id != order.userId) {
            return "Order does not belong to the user"
        }

        return "Order processed for ${user.name}: Order ID ${order.orderId}, Amount ${order.amount}"
    }
}

// Example Usage
fun main() {
    val userService = UserServiceImpl()
    val orderService = OrderServiceImpl()
    val client = ServiceClient(userService, orderService)

    println(client.processOrder(1, 101))
    println(client.processOrder(2, 102))
    println(client.processOrder(1, 102)) // Order does not belong to the user
    println(client.processOrder(3, 101)) // User not found
}
```