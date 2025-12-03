---
title: "Lazy Initialization - Java"
date: 2025-12-03T11:15:50.487-05:00
draft: false
pattern_usage: ["Lazy Initialization"]
language: ["Java"]
---
The Lazy Initialization pattern delays the creation of an object until its first use. This can improve performance if the object is expensive to create and not always needed. The provided Java code demonstrates this using a static inner class to hold the instance. The instance is only created when `getInstance()` is called for the first time.  This approach is thread-safe without requiring explicit synchronization, leveraging the Java memory model. Using a static inner class ensures that initialization occurs only when needed, and only once, even in a multi-threaded environment, fitting Java's common approach to singleton-like patterns and resource management.

```java
// LazyInitialization.java
public class LazyInitialization {

    private LazyInitialization() {
        // Prevent instantiation from outside
        System.out.println("LazyInitialization instance created.");
    }

    private static class InstanceHolder {
        private static final LazyInitialization instance = new LazyInitialization();
    }

    public static LazyInitialization getInstance() {
        return InstanceHolder.instance;
    }

    public void doSomething() {
        System.out.println("LazyInitialization instance is doing something.");
    }

    public static void main(String[] args) {
        // The instance is not created here
        System.out.println("Before getInstance call");

        // Instance is created when getInstance() is called
        LazyInitialization instance = getInstance();
        instance.doSomething();

        // Subsequent calls return the same instance
        LazyInitialization anotherInstance = getInstance();
        System.out.println(instance == anotherInstance); // true
    }
}
```