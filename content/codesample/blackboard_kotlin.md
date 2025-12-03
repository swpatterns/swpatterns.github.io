---
title: "Blackboard - Kotlin"
date: 2025-12-03T15:25:25.084-05:00
draft: false
pattern_usage: ["Blackboard"]
language: ["Kotlin"]
---
The Blackboard pattern is a computational architecture for solving complex problems by allowing multiple knowledge sources (agents) to interact through a shared data repository (the blackboard). Agents independently examine the blackboard and contribute information when they detect relevant data. This promotes loose coupling and allows agents to be added or removed without impacting others. 

This Kotlin example creates a simplified Blackboard system for recognizing "patterns" in strings. The `Blackboard` holds the `data` (input string) and `knowledge` (recognized patterns). `Agent`s define `condition` (when to act) and `action` (what to contribute).  The `run` function simulates the processing loop, where agents check and update the blackboard until a termination condition is met, or a maximum number of iterations is reached. Kotlin’s functional approach with lambda expressions cleanly defines the agent’s logic, and data classes promote immutability and clarity, fitting the language’s style.

```kotlin
data class Blackboard(var data: String, var knowledge: MutableList<String> = mutableListOf())

interface Agent {
    val condition: (Blackboard) -> Boolean
    val action: (Blackboard) -> Unit
}

fun runBlackboard(initialData: String, agents: List<Agent>, maxIterations: Int = 10): Blackboard {
    val blackboard = Blackboard(initialData)
    var iteration = 0

    while (iteration < maxIterations && blackboard.knowledge.isEmpty()) {
        for (agent in agents) {
            if (agent.condition(blackboard)) {
                agent.action(blackboard)
            }
        }
        iteration++
    }

    return blackboard
}

fun main() {
    val blackboard = runBlackboard("hello world") {
        val agents = listOf(
            object : Agent {
                override val condition: (Blackboard) -> Boolean = { it.data.contains("hello") }
                override val action: (Blackboard) -> Unit = { it.knowledge.add("Greeting detected") }
            },
            object : Agent {
                override val condition: (Blackboard) -> Boolean = { it.data.contains("world") }
                override val action: (Blackboard) -> Unit = { it.knowledge.add("World detected") }
            }
        )
        runBlackboard("hello world", agents)
    }

    println("Data: ${blackboard.data}")
    println("Knowledge: ${blackboard.knowledge}")
}
```