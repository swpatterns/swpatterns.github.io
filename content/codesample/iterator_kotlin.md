---
title: "Iterator - Kotlin"
date: 2025-12-03T13:12:15.329-05:00
draft: false
pattern_usage: ["Iterator"]
language: ["Kotlin"]
---
The Iterator pattern provides a way to access the elements of an aggregate object sequentially without exposing the underlying representation. It defines a standard interface for creating iterators, allowing clients to traverse a collection without knowing its specific implementation. This promotes loose coupling and flexibility.

In Kotlin, we leverage the built-in `iterator()` function available for all collections, which automatically provides an efficient and idiomatic implementation of the Iterator pattern. This example creates a simple `TaskList` class and uses Kotlin's standard `Iterator` functionality to iterate through the tasks. The code directly utilizes `for...in` loops, which implicitly call the `iterator()` function, showcasing Kotlin's concise and functional approach to iteration.

```kotlin
// TaskList.kt
data class Task(val description: String)

class TaskList {
    private val tasks = mutableListOf<Task>()

    fun addTask(task: Task) {
        tasks.add(task)
    }

    fun getTasks(): List<Task> {
        return tasks
    }

    // Kotlin's Iterable interface provides iterator() by default for List.
    // No explicit Iterator implementation needed for basic iteration.
}

fun main() {
    val taskList = TaskList()
    taskList.addTask(Task("Grocery Shopping"))
    taskList.addTask(Task("Laundry"))
    taskList.addTask(Task("Code Review"))

    println("Tasks:")
    for (task in taskList.getTasks()) {
        println("- ${task.description}")
    }

    println("\nUsing an explicit iterator:")
    val iterator = taskList.getTasks().iterator()
    while (iterator.hasNext()) {
        val task = iterator.next()
        println("- ${task.description}")
    }
}
```