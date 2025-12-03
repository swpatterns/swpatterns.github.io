---
title: "Builder - Kotlin"
date: 2025-12-03T10:54:57.446-05:00
draft: false
pattern_usage: ["Builder"]
language: ["Kotlin"]
---
The Builder pattern is a creational design pattern that lets you construct complex objects step-by-step. It allows for creating different representations of an object using the same construction process. This is particularly useful when an object has many optional parameters.

The Kotlin code implements the Builder pattern for a `Computer` object.  A separate `ComputerBuilder` class handles the construction process, allowing setting components like CPU, RAM, and storage individually. The `build()` method then assembles the final `Computer` instance.  Kotlin's concise syntax and data classes make this pattern particularly elegant, avoiding excessive boilerplate often found in other languages. The use of named and default arguments further enhances readability and flexibility.

```kotlin
data class Computer(
    val cpu: String,
    val ram: Int,
    val storage: String = "SSD",
    val graphicsCard: String? = null,
    val operatingSystem: String = "Linux"
)

class ComputerBuilder {
    private var cpu: String = ""
    private var ram: Int = 0
    private var storage: String = "SSD"
    private var graphicsCard: String? = null
    private var operatingSystem: String = "Linux"

    fun withCpu(cpu: String): ComputerBuilder {
        this.cpu = cpu
        return this
    }

    fun withRam(ram: Int): ComputerBuilder {
        this.ram = ram
        return this
    }

    fun withStorage(storage: String): ComputerBuilder {
        this.storage = storage
        return this
    }

    fun withGraphicsCard(graphicsCard: String?): ComputerBuilder {
        this.graphicsCard = graphicsCard
        return this
    }

    fun withOperatingSystem(operatingSystem: String): ComputerBuilder {
        this.operatingSystem = operatingSystem
        return this
    }

    fun build(): Computer {
        return Computer(cpu, ram, storage, graphicsCard, operatingSystem)
    }
}

fun main() {
    val gamingComputer = ComputerBuilder()
        .withCpu("Intel i9")
        .withRam(32)
        .withGraphicsCard("Nvidia RTX 4090")
        .build()

    val basicComputer = ComputerBuilder()
        .withCpu("AMD Ryzen 5")
        .withRam(16)
        .build()

    println(gamingComputer)
    println(basicComputer)
}
```