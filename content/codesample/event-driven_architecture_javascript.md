---
title: "Event-Driven Architecture - JavaScript"
date: 2025-12-03T14:51:42.704-05:00
draft: false
pattern_usage: ["Event-Driven Architecture"]
language: ["JavaScript"]
---
The Event-Driven Architecture (EDA) decouples software components by allowing them to communicate through events. Components (event producers) emit events without knowing who will handle them, and other components (event consumers) subscribe to events they're interested in. This promotes scalability and flexibility.

This JavaScript example uses a simple event emitter/listener pattern. The `EventEmitter` class manages event subscriptions and dispatches events.  `OrderService` acts as an event producer, emitting 'orderCreated' and 'orderShipped' events. `EmailService` and `InventoryService` are event consumers, subscribing to specific events and reacting accordingly. This approach is idiomatic JavaScript due to its reliance on callbacks and the flexibility of object-oriented programming, avoiding tight coupling between services.

```javascript
// event_emitter.js
class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(listener => {
        listener(data);
      });
    }
  }
}

// order_service.js
class OrderService {
  constructor(emitter) {
    this.emitter = emitter;
  }

  createOrder(order) {
    // Simulate order creation logic
    console.log(`Order created: ${order.id}`);
    this.emitter.emit('orderCreated', order);
  }

  shipOrder(order) {
    // Simulate order shipping logic
    console.log(`Order shipped: ${order.id}`);
    this.emitter.emit('orderShipped', order);
  }
}

// email_service.js
class EmailService {
  constructor(emitter) {
    this.emitter = emitter;
    this.emitter.on('orderCreated', this.handleOrderCreated.bind(this));
  }

  handleOrderCreated(order) {
    console.log(`Sending order confirmation email to ${order.customer}`);
  }
}

// inventory_service.js
class InventoryService {
  constructor(emitter) {
    this.emitter = emitter;
    this.emitter.on('orderShipped', this.handleOrderShipped.bind(this));
  }

  handleOrderShipped(order) {
    console.log(`Updating inventory for order: ${order.id}`);
  }
}

// main.js
const emitter = new EventEmitter();
const orderService = new OrderService(emitter);
const emailService = new EmailService(emitter);
const inventoryService = new InventoryService(emitter);

orderService.createOrder({ id: '123', customer: 'john.doe' });
orderService.shipOrder({ id: '123', customer: 'john.doe' });
```