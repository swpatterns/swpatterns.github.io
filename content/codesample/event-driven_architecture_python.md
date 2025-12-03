---
title: "Event-Driven Architecture - Python"
date: 2025-12-03T14:51:25.477-05:00
draft: false
pattern_usage: ["Event-Driven Architecture"]
language: ["Python"]
---
The Event-Driven Architecture (EDA) decouples components by having them communicate through events. Components (event producers) emit events when something significant happens, and other components (event consumers) listen for specific events and react accordingly. This promotes scalability and flexibility.

This Python example uses a simple dictionary to represent an event bus. Producers publish events to the bus with an event type, and consumers register for specific event types. When an event is published, the bus iterates through registered consumers and calls their handler functions. This implementation leverages Python's first-class functions for event handling and dictionaries for efficient event dispatch, fitting Python's dynamic and flexible nature.

```python
class EventBus:
    def __init__(self):
        self.listeners = {}

    def subscribe(self, event_type, callback):
        if event_type not in self.listeners:
            self.listeners[event_type] = []
        self.listeners[event_type].append(callback)

    def publish(self, event_type, data=None):
        if event_type in self.listeners:
            for callback in self.listeners[event_type]:
                callback(data)

# Example Usage
def handle_user_created(user_data):
    print(f"User created: {user_data}")

def handle_order_placed(order_data):
    print(f"Order placed: {order_data}")

event_bus = EventBus()

# Subscribe consumers to events
event_bus.subscribe("user_created", handle_user_created)
event_bus.subscribe("order_placed", handle_order_placed)

# Producers publish events
event_bus.publish("user_created", {"user_id": 123, "username": "john.doe"})
event_bus.publish("order_placed", {"order_id": 456, "user_id": 123, "total": 100.00})
```