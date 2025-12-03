---
title: "Facade - Kotlin"
date: 2025-12-03T11:44:21.164-05:00
draft: false
pattern_usage: ["Facade"]
language: ["Kotlin"]
---
The Facade pattern provides a simplified interface to a complex subsystem. It defines a high-level interface that hides the intricacies of the underlying components. This makes the subsystem easier to use for clients who don't need to know the details.

The Kotlin code demonstrates a `Computer` facade that encapsulates the complexities of starting up a computer (CPU, Memory, HardDrive, etc.).  The client interacts solely with the `Computer` class, calling a single `start()` method instead of managing individual component initialization. This approach promotes loose coupling and simplifies client code. Kotlin's concise syntax and class-based structure naturally lend themselves to the Facade pattern, allowing for a clean and readable implementation. The use of private constructors within the components further enforces encapsulation.

```kotlin
// Subsystem components
private class CPU {
    fun freeze() {
        println("CPU freezing...")
    }

    fun jump(position: Long) {
        println("CPU jumping to position $position")
    }

    fun execute() {
        println("CPU executing...")
    }
}

private class Memory {
    fun load(address: Long) {
        println("Memory loading from address $address")
    }
}

private class HardDrive {
    fun read(sector: Int) {
        println("Hard Drive reading sector $sector")
    }
}

// Facade
class Computer {
    private val cpu = CPU()
    private val memory = Memory()
    private val hardDrive = HardDrive()

    fun start() {
        println("Starting Computer...")
        hardDrive.read(1)
        memory.load(1024)
        cpu.freeze()
        cpu.jump(1000)
        cpu.execute()
        println("Computer started.")
    }
}

// Client
fun main() {
    val computer = Computer()
    computer.start()
}
```