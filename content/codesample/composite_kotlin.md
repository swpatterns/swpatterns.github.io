---
title: "Composite - Kotlin"
date: 2025-12-03T11:36:44.962-05:00
draft: false
pattern_usage: ["Composite"]
language: ["Kotlin"]
---
The Composite pattern allows you to treat individual objects and compositions of objects uniformly. It defines a tree-like structure where each node can be either a leaf (representing a simple object) or a composite (representing a collection of objects). This enables operations to be performed on entire structures without knowing whether they are dealing with individual objects or groups of objects.

The Kotlin code defines an `Item` interface with a `getPrice()` method.  `LeafItem` represents individual items, while `CompositeItem` holds a list of `Item` instances. `CompositeItem` delegates the `getPrice()` call to its children, calculating the total cost. This is idiomatic Kotlin due to the use of interfaces for defining component types, data classes for simple items, and list manipulation for composition. The pattern avoids deep inheritance hierarchies and promotes code reuse.

```kotlin
interface Item {
    fun getPrice(): Double
}

data class LeafItem(val name: String, val price: Double) : Item {
    override fun getPrice(): Double = price
}

class CompositeItem(val name: String) : Item {
    private val children = mutableListOf<Item>()

    fun add(item: Item) {
        children.add(item)
    }

    fun remove(item: Item) {
        children.remove(item)
    }

    override fun getPrice(): Double = children.sumOf { it.getPrice() }
}

fun main() {
    val order = CompositeItem("Order")
    val book1 = LeafItem("Kotlin in Action", 49.99)
    val book2 = LeafItem("Programming Kotlin", 39.99)
    val package1 = CompositeItem("Book Package")
    package1.add(book1)
    package1.add(book2)
    val shipping = LeafItem("Shipping", 5.00)

    order.add(package1)
    order.add(shipping)

    println("Total order price: ${order.getPrice()}")
}
```