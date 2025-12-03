---
title: "Flyweight - Kotlin"
date: 2025-12-03T12:43:32.332-05:00
draft: false
pattern_usage: ["Flyweight"]
language: ["Kotlin"]
---
The Flyweight pattern aims to minimize memory usage by sharing objects that are similar. It separates the object's state into intrinsic (shared) and extrinsic (unique) parts.  Intrinsic state is stored in the flyweight object, while extrinsic state is passed as a parameter when the flyweight is used. This example demonstrates this with `Tree` objects.  `Leaf` represents the flyweight, storing a common color.  `Node` represents the context, holding the unique position (x, y) of each leaf.  Kotlin's data classes and immutability align well with the pattern's need for shared, unchanging state.

```kotlin
// Flyweight Interface
interface Leaf {
    fun display(x: Int, y: Int)
}

// Concrete Flyweight
data class SimpleLeaf(private val color: String) : Leaf {
    override fun display(x: Int, y: Int) {
        println("Leaf at ($x, $y) with color $color")
    }
}

// Flyweight Factory
object LeafFactory {
    private val leaves = mutableMapOf<String, Leaf>()

    fun getLeaf(color: String): Leaf {
        return leaves.getOrPut(color) { SimpleLeaf(color) }
    }
}

// Context
data class Node(val x: Int, val y: Int) {
    fun render(leaf: Leaf) {
        leaf.display(x, y)
    }
}

fun main() {
    val leaf1 = LeafFactory.getLeaf("red")
    val leaf2 = LeafFactory.getLeaf("green")
    val leaf3 = LeafFactory.getLeaf("red") // Reuses the existing "red" leaf

    val node1 = Node(10, 20)
    val node2 = Node(30, 40)
    val node3 = Node(15, 25)

    node1.render(leaf1)
    node2.render(leaf2)
    node3.render(leaf3)
}
```