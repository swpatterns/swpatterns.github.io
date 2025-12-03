---
title: "Monolith - Kotlin"
date: 2025-12-03T14:26:52.395-05:00
draft: false
pattern_usage: ["Monolith"]
language: ["Kotlin"]
---
The Monolith pattern represents a traditional software architecture where all components of an application are tightly coupled and deployed as a single unit. It's characterized by a unified codebase, often with shared libraries and data models. This example demonstrates a simplified monolith in Kotlin, representing a basic e-commerce application with `Product`, `Order`, and `Customer` functionalities all contained within the same project.  Kotlin's flexibility allows for both OOP and functional approaches within a monolith, and this example leans towards a relatively OOP structure to model the domain. The lack of explicit separation into microservices, with inter-component calls happening directly, embodies the monolithic nature.

```kotlin
// src/main/kotlin/ecommerce/EcommerceApp.kt

package ecommerce

import java.util.UUID

data class Product(val id: UUID, val name: String, val price: Double)
data class Customer(val id: UUID, val name: String, val email: String)
data class Order(val id: UUID, val customer: Customer, val products: List<Product>, val total: Double)

class Inventory {
    private val products = mutableListOf<Product>()

    fun addProduct(product: Product) {
        products.add(product)
    }

    fun getProductById(id: UUID): Product? {
        return products.find { it.id == id }
    }
}


class OrderService(private val inventory: Inventory, private val customerService: CustomerService) {
    fun createOrder(customerId: UUID, productIds: List<UUID>): Order? {
        val customer = customerService.getCustomerById(customerId) ?: return null
        val products = inventory.getProductByIds(productIds)
        if (products.isEmpty()) return null

        val total = products.sumOf { it.price }
        val order = Order(UUID.randomUUID(), customer, products, total)
        println("Order created: $order") //Simulating order persistence
        return order
    }

    fun getProductByIds(productIds: List<UUID>): List<Product> {
     return productIds.mapNotNull { inventory.getProductById(it) }
    }
}

class CustomerService {
    private val customers = mutableListOf<Customer>()

    fun addCustomer(customer: Customer) {
        customers.add(customer)
    }

    fun getCustomerById(id: UUID): Customer? {
        return customers.find { it.id == id }
    }
}

fun main() {
    val inventory = Inventory()
    val customerService = CustomerService()
    val orderService = OrderService(inventory, customerService)

    val product1 = Product(UUID.randomUUID(), "Laptop", 1200.0)
    val product2 = Product(UUID.randomUUID(), "Mouse", 25.0)
    inventory.addProduct(product1)
    inventory.addProduct(product2)

    val customer1 = Customer(UUID.randomUUID(), "Alice", "alice@example.com")
    customerService.addCustomer(customer1)

    orderService.createOrder(customer1.id, listOf(product1.id, product2.id))
}
```