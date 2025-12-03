---
title: "Event-Driven Architecture - Kotlin"
date: 2025-12-03T14:54:09.866-05:00
draft: false
pattern_usage: ["Event-Driven Architecture"]
language: ["Kotlin"]
---
The Event-Driven Architecture (EDA) decouples components by allowing them to communicate through events. Components (event producers) emit events when something significant happens, and other components (event consumers) react to those events without knowing who produced them. This promotes scalability and flexibility.

This Kotlin example uses a simple `EventBus` class to manage event publishing and subscription. Events are represented as data classes.  Consumers register callbacks for specific event types. When an event is published, the `EventBus` iterates through the registered callbacks and invokes them.  Kotlin's data classes and functional programming features (higher-order functions for callbacks) make this implementation concise and readable, aligning with the language's emphasis on clarity and immutability.  The use of interfaces for events and listeners further enhances decoupling.

```kotlin
// Event Interface
interface Event
// Listener Interface
interface Listener<T : Event> {
    fun onEvent(event: T)
}

// Concrete Events
data class UserCreatedEvent(val userId: String, val username: String) : Event
data class UserUpdatedEvent(val userId: String, val newUsername: String) : Event

// Event Bus
class EventBus {
    private val listeners: MutableMap<Class<*>, MutableList<Listener<*>>> = mutableMapOf()

    fun <T : Event> subscribe(eventClass: Class<T>, listener: Listener<T>) {
        listeners.getOrPut(eventClass) { mutableListOf() } += listener
    }

    fun publish(event: Event) {
        listeners[event::class]?.forEach {
            @Suppress("UNCHECKED_CAST")
            (it as Listener<Event>).onEvent(event)
        }
    }
}

// Example Usage
fun main() {
    val eventBus = EventBus()

    // User Service (Producer)
    fun createUser(userId: String, username: String) {
        println("Creating user: $username")
        eventBus.publish(UserCreatedEvent(userId, username))
    }

    // Notification Service (Consumer)
    fun setupUserCreatedNotification() {
        eventBus.subscribe(UserCreatedEvent::class, object : Listener<UserCreatedEvent> {
            override fun onEvent(event: UserCreatedEvent) {
                println("Sending welcome email to: ${event.username}")
            }
        })
    }

    // Analytics Service (Consumer)
    fun setupUserCreatedAnalytics() {
        eventBus.subscribe(UserCreatedEvent::class, object : Listener<UserCreatedEvent> {
            override fun onEvent(event: UserCreatedEvent) {
                println("Logging user creation for analytics: ${event.username}")
            }
        })
    }

    setupUserCreatedNotification()
    setupUserCreatedAnalytics()

    createUser("123", "Alice")
    createUser("456", "Bob")
}
```