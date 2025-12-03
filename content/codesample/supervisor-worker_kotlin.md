---
title: "Supervisor-Worker - Kotlin"
date: 2025-12-03T15:37:37.103-05:00
draft: false
pattern_usage: ["Supervisor-Worker"]
language: ["Kotlin"]
---
The Supervisor-Worker pattern manages a team of worker coroutines from a supervising coroutine. The supervisor ensures that if a worker fails, it’s restarted, and any child workers of the failed worker are cancelled. This prevents cascading failures and maintains application stability. The Kotlin implementation utilizes `supervisorScope` to create the supervising context. Each worker is launched as a `launch` coroutine within this scope. The supervising scope handles the cancellation and retry logic automatically when workers fail due to exceptions. This is idiomatic Kotlin because it leverages Kotlin’s coroutines for asynchronous task management and its built-in error handling capabilities while keeping the code concise and readable.

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    supervisorScope {
        val worker1 = launch {
            try {
                repeat(5) {
                    println("Worker 1: Doing work ${it + 1}")
                    delay(500)
                    if (it == 2) throw Exception("Worker 1 failed!")
                }
                println("Worker 1: Finished")
            } catch (e: Exception) {
                println("Worker 1: Error - ${e.message}")
            }
        }

        val worker2 = launch {
            println("Worker 2: Starting")
            delay(1000)
            println("Worker 2: Finished")
        }

        val worker3 = launch {
            try {
                repeat(3) {
                    println("Worker 3: Doing work ${it + 1}")
                    delay(750)
                }
                println("Worker 3: Finished")
            } catch (e: Exception) {
                println("Worker 3: Error - ${e.message}")
            }
        }

        worker1.join()
        worker2.join()
        worker3.join()
    }
    println("All workers completed (or supervisor finished handling failures).")
}
```