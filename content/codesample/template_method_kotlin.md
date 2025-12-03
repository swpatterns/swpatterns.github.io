---
title: "Template Method - Kotlin"
date: 2025-12-03T13:39:11.938-05:00
draft: false
pattern_usage: ["Template Method"]
language: ["Kotlin"]
---
The Template Method pattern defines the skeleton of an algorithm in a base class, deferring some steps to subclasses. It allows subclasses to redefine certain steps of an algorithm without changing the algorithm's structure. This promotes code reuse and avoids duplication.

The Kotlin example defines an abstract `Game` class with a `play()` method representing the algorithm's skeleton.  `initialize()`, `start()`, `run()` and `end()` are abstract methods that subclasses must implement, providing the specific steps.  Concrete game classes like `Cricket` and `Football` inherit from `Game` and provide their own implementations for these steps, while the overall `play()` sequence remains consistent. Kotlin's abstract classes and methods naturally support this pattern, and the use of concise function definitions aligns with Kotlin's style.

```kotlin
abstract class Game {
    abstract fun initialize()
    abstract fun start()
    abstract fun run()
    abstract fun end()

    fun play() {
        println("Game: Starting...")
        initialize()
        start()
        run()
        end()
        println("Game: Finished.")
    }
}

class Cricket : Game() {
    override fun initialize() {
        println("Cricket: Initializing the game...")
    }

    override fun start() {
        println("Cricket: Starting the match...")
    }

    override fun run() {
        println("Cricket: Playing the innings...")
    }

    override fun end() {
        println("Cricket: Match ended.")
    }
}

class Football : Game() {
    override fun initialize() {
        println("Football: Preparing the field...")
    }

    override fun start() {
        println("Football: Kickoff!")
    }

    override fun run() {
        println("Football: Playing two halves...")
    }

    override fun end() {
        println("Football: Game over.")
    }
}

fun main() {
    val cricketGame = Cricket()
    cricketGame.play()

    println("\n--- Next Game ---\n")

    val footballGame = Football()
    footballGame.play()
}
```