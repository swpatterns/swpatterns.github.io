---
title: "Multiton - Kotlin"
date: 2025-12-03T11:10:14.943-05:00
draft: false
pattern_usage: ["Multiton"]
language: ["Kotlin"]
---
The Multiton pattern ensures that only a fixed number of instances of a class can exist. It's a variation of the Singleton pattern, where rather than a single instance, you allow a limited, pre-defined number. This can be useful for managing resources like database connections or limited-license software access.  This Kotlin implementation uses a companion object to hold a fixed-size list of instances, created only when accessed for the first time. It leverages `mutableListOf` for the instance storage and synchronization is handled implicitly by Kotlin's thread-safety features within the companion object initialization. This approach is concise and idiomatic for Kotlin, avoiding explicit locking mechanisms.

```kotlin
class Multiton(val id: Int) {
    companion object {
        private val maxInstances = 3
        private val instances = mutableListOf<Multiton>()
        private var instanceCounter = 0

        fun getInstance(): Multiton {
            return synchronized(this) {
                if (instances.size < maxInstances) {
                    val newInstance = Multiton(instanceCounter++)
                    instances.add(newInstance)
                    newInstance
                } else {
                    // Return an existing instance randomly
                    instances.random()
                }
            }
        }
    }
}

fun main() {
    val instance1 = Multiton.getInstance()
    val instance2 = Multiton.getInstance()
    val instance3 = Multiton.getInstance()
    val instance4 = Multiton.getInstance() // Will return one of the existing instances

    println("Instance 1 ID: ${instance1.id}")
    println("Instance 2 ID: ${instance2.id}")
    println("Instance 3 ID: ${instance3.id}")
    println("Instance 4 ID: ${instance4.id}")

    println("Number of instances created: ${Multiton.instances.size}")
}
```