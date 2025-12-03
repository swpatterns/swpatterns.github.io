---
title: "Event-Driven Architecture - Java"
date: 2025-12-03T14:51:10.295-05:00
draft: false
pattern_usage: ["Event-Driven Architecture"]
language: ["Java"]
---
The Event-Driven Architecture (EDA) decouples components by having them communicate through events. Components (event producers) emit events when something significant happens, and other components (event consumers) listen for these events and react accordingly, without needing direct knowledge of the producers. This promotes scalability and flexibility.

This Java example uses a simple `Observer` pattern as a foundation for EDA. An `Event` interface defines the event data. Concrete events like `OrderCreatedEvent` are created by producers.  `EventDispatcher` manages event registration and dispatch. Consumers register their interest via `EventDispatcher` and receive events through the `Observer` interface. This approach is idiomatic Java due to its reliance on interfaces for abstraction and the built-in `Observer` pattern for loosely coupled communication.  Using a dedicated `EventDispatcher` centralizes event management, improving maintainability.

```java
// Event Interface
interface Event {
    String getType();
}

// Concrete Event
class OrderCreatedEvent implements Event {
    private final String orderId;

    public OrderCreatedEvent(String orderId) {
        this.orderId = orderId;
    }

    public String getOrderId() {
        return orderId;
    }

    @Override
    public String getType() {
        return "order.created";
    }
}

// Observer Interface
interface EventListener {
    void onEvent(Event event);
}

// Event Dispatcher
class EventDispatcher {
    private final List<EventListener> listeners = new ArrayList<>();

    public void registerListener(EventListener listener) {
        listeners.add(listener);
    }

    public void dispatchEvent(Event event) {
        for (EventListener listener : listeners) {
            listener.onEvent(event);
        }
    }
}

// Event Consumer
class OrderService implements EventListener {
    private final EventDispatcher dispatcher;

    public OrderService(EventDispatcher dispatcher) {
        this.dispatcher = dispatcher;
        dispatcher.registerListener(this);
    }

    @Override
    public void onEvent(Event event) {
        if (event instanceof OrderCreatedEvent) {
            OrderCreatedEvent orderCreatedEvent = (OrderCreatedEvent) event;
            System.out.println("Order Service received OrderCreatedEvent: " + orderCreatedEvent.getOrderId());
            // Process the order
        }
    }
}

// Event Producer
class OrderProcessor {
    private final EventDispatcher dispatcher;

    public OrderProcessor(EventDispatcher dispatcher) {
        this.dispatcher = dispatcher;
    }

    public void createOrder(String orderId) {
        System.out.println("Creating order: " + orderId);
        // Create order logic here
        Event event = new OrderCreatedEvent(orderId);
        dispatcher.dispatchEvent(event);
    }
}

// Main Application
import java.util.ArrayList;
import java.util.List;

public class EventDrivenExample {
    public static void main(String[] args) {
        EventDispatcher dispatcher = new EventDispatcher();
        OrderService orderService = new OrderService(dispatcher);
        OrderProcessor orderProcessor = new OrderProcessor(dispatcher);

        orderProcessor.createOrder("123");
        orderProcessor.createOrder("456");
    }
}
```