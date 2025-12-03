---
title: "Object Pool - Java"
date: 2025-12-03T11:11:42.840-05:00
draft: false
pattern_usage: ["Object Pool"]
language: ["Java"]
---
The Object Pool pattern manages a pool of reusable objects to avoid the expensive operation of repeatedly creating and destroying them. This is particularly useful for objects that are resource-intensive to initialize. The code demonstrates a simple generic Object Pool using a `java.util.concurrent.ArrayBlockingQueue` to store available objects.  `acquireObject()` blocks if no object is available, and `releaseObject()` returns an object to the pool.  The `PooledObjectFactory` interface allows for custom object creation. This implementation leverages Java's generics for type safety and uses a blocking queue for thread-safe access, fitting idiomatic Java concurrency practices.

```java
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

interface PooledObjectFactory<T> {
    T createObject();
}

public class ObjectPool<T> {

    private final BlockingQueue<T> pool;
    private final PooledObjectFactory<T> factory;
    private final int poolSize;

    public ObjectPool(int poolSize, PooledObjectFactory<T> factory) {
        this.poolSize = poolSize;
        this.factory = factory;
        this.pool = new ArrayBlockingQueue<>(poolSize);

        // Pre-populate the pool
        for (int i = 0; i < poolSize; i++) {
            pool.add(factory.createObject());
        }
    }

    public T acquireObject() throws InterruptedException {
        return pool.take(); // Blocks until an object is available
    }

    public void releaseObject(T obj) {
        if (pool.offer(obj)) {
            // Object added back to the pool successfully
        } else {
            // Pool is full, potentially log or handle the situation
            System.err.println("Pool is full. Object discarded.");
        }
    }

    public int getPoolSize() {
        return poolSize;
    }

    public int getAvailableObjects() {
        return pool.size();
    }

    public static void main(String[] args) throws InterruptedException {
        // Example Usage with a simple object
        ObjectPool<String> stringPool = new ObjectPool<>(5, String::new);

        System.out.println("Available objects: " + stringPool.getAvailableObjects());

        String obj1 = stringPool.acquireObject();
        obj1 = "Hello";
        System.out.println("Acquired object: " + obj1);
        System.out.println("Available objects: " + stringPool.getAvailableObjects());

        stringPool.releaseObject(obj1);
        System.out.println("Released object. Available objects: " + stringPool.getAvailableObjects());
    }
}
```