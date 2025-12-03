---
title: "Microservices - Kotlin"
date: 2025-12-03T14:44:22.015-05:00
draft: false
pattern_usage: ["Microservices"]
language: ["Kotlin"]
---
The Microservices pattern structures an application as a collection of loosely coupled, independently deployable services, modeled around a business domain. Each service owns its data and communicates via lightweight mechanisms, often an HTTP REST API. This example demonstrates a simplified scenario with two microservices: `customer-service` and `product-service`.  Kotlin's concise syntax and support for both OOP and functional programming make it well-suited for building these services.  We use Ktor, a Kotlin-native framework, for creating lightweight REST APIs.  Data classes and immutability are favored for data transfer objects, aligning with functional principles and simplifying communication.

```kotlin
// customer-service/src/main/kotlin/CustomerService.kt
package customer

import io.ktor.application.*
import io.ktor.response.*
import io.ktor.routing.*
import kotlinx.serialization.Serializable

data class Customer(val id: Int, val name: String)

fun main(args: Array<String>): Unit {
    val customers = listOf(Customer(1, "Alice"), Customer(2, "Bob"))

    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {
    install(io.ktor.serialization.Serialization)
    routing {
        get("/customers/{id}") {
            val id = call.parameters["id"]?.toIntOrNull() ?: return@get call.respond(
                io.ktor.http.HttpStatusCode.BadRequest,
                "Invalid customer ID"
            )
            val customer = customers.find { it.id == id }
            if (customer != null) {
                call.respond(customer)
            } else {
                call.respond(io.ktor.http.HttpStatusCode.NotFound, "Customer not found")
            }
        }
    }
}

// product-service/src/main/kotlin/ProductService.kt
package product

import io.ktor.application.*
import io.ktor.response.*
import io.ktor.routing.*
import kotlinx.serialization.Serializable

data class Product(val id: Int, val name: String, val price: Double)

fun main(args: Array<String>): Unit {
    val products = listOf(Product(1, "Laptop", 1200.0), Product(2, "Mouse", 25.0))

    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {
    install(io.ktor.serialization.Serialization)
    routing {
        get("/products/{id}") {
            val id = call.parameters["id"]?.toIntOrNull() ?: return@get call.respond(
                io.ktor.http.HttpStatusCode.BadRequest,
                "Invalid product ID"
            )
            val product = products.find { it.id == id }
            if (product != null) {
                call.respond(product)
            } else {
                call.respond(io.ktor.http.HttpStatusCode.NotFound, "Product not found")
            }
        }
    }
}
```