---
title: "Master-Slave - Kotlin"
date: 2025-12-03T15:33:16.448-05:00
draft: false
pattern_usage: ["Master-Slave"]
language: ["Kotlin"]
---
The Master-Slave pattern involves one object (the Master) controlling and coordinating the actions of one or more other objects (the Slaves). The Master delegates tasks to the Slaves and may aggregate their results. This implementation uses Kotlin's data classes for simplicity and a functional approach for task delegation. The `Master` holds a list of `Slave` objects and distributes work via a higher-order function `executeTasks`. This leverages Kotlin's concise function syntax and immutability where appropriate, fitting the language's modern, expressive style. The `Slave` interface defines a single `execute` method, promoting loose coupling.

```kotlin
// Slave interface
interface Slave {
    fun execute(task: String): String
}

// Concrete Slave implementation
data class WorkerSlave(private val id: Int) : Slave {
    override fun execute(task: String): String {
        return "Worker $id executing: $task"
    }
}

// Master class
class Master(private val slaves: List<Slave>) {
    fun executeTasks(tasks: List<String>): List<String> {
        return slaves.map { slave ->
            tasks.map { task -> slave.execute(task) }
        }.flatten()
    }
}

// Example Usage
fun main() {
    val slave1 = WorkerSlave(1)
    val slave2 = WorkerSlave(2)
    val master = Master(listOf(slave1, slave2))

    val tasks = listOf("Task A", "Task B", "Task C")
    val results = master.executeTasks(tasks)

    results.forEach(println)
}
```