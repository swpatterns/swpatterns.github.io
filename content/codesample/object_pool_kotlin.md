---
title: "Object Pool - Kotlin"
date: 2025-12-03T11:14:18.316-05:00
draft: false
pattern_usage: ["Object Pool"]
language: ["Kotlin"]
---
The Object Pool pattern manages a pool of reusable objects to reduce the overhead of frequent object creation and destruction. This is particularly useful for expensive-to-create objects. The pattern involves a pool that holds available objects, and clients request objects from the pool instead of creating new ones. When an object is no longer needed, it’s returned to the pool for reuse.

Our Kotlin implementation uses a thread-safe `ArrayBlockingQueue` to store and retrieve pooled objects. `PooledObject` represents the reusable resource. The `ObjectPool` handles creating initial objects and providing/receiving them on demand. The `use` function ensures objects are returned to the pool after use, simplifying resource management and preventing leaks.  Kotlin's conciseness blends well with the pattern, making the pool management logic compact and readable.

```kotlin
import java.util.concurrent.ArrayBlockingQueue

class PooledObject {
    var data: String = ""

    fun reset() {
        data = "" // Reset the object to a clean state
    }
}

class ObjectPool(private val poolSize: Int) {

    private val pool: ArrayBlockingQueue<PooledObject> = ArrayBlockingQueue(poolSize)

    init {
        // Initialize the pool with pre-created objects
        for (i in 0 until poolSize) {
            pool.put(PooledObject())
        }
    }

    fun acquire(): PooledObject {
        return pool.take()
    }

    fun release(obj: PooledObject) {
        obj.reset()
        pool.put(obj)
    }
}

fun main() {
    val pool = ObjectPool(5)

    fun withPooledObject(block: (PooledObject) -> Unit) {
        val obj = pool.acquire()
        try {
            block(obj)
        } finally {
            pool.release(obj)
        }
    }


    repeat(10) {
        withPooledObject { pooledObj ->
            pooledObj.data = "Object $it"
            println("Using object with data: ${pooledObj.data}")
        }
    }
}
```