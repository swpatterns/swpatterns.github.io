---
title: "Space-Based Architecture - TypeScript"
date: 2025-12-03T14:57:03.919-05:00
draft: false
pattern_usage: ["Space-Based Architecture"]
language: ["TypeScript"]
---
The Space-Based Architecture pattern organizes code into independent, self-contained "spaces" that communicate via well-defined interfaces (often events or messages). This promotes loose coupling, making the system more modular, testable, and easier to evolve. Each space encapsulates specific functionality and data, minimizing dependencies on other parts of the system.

This TypeScript implementation uses a simple event emitter pattern to define the spaces and their communication. `OrderService` represents one space, emitting 'order_placed' events. `InventoryService` subscribes to these events to update stock. `NotificationService` also subscribes to handle notifications.  TypeScript's type system and class-based structure naturally support encapsulation and interface definition, making it a good fit for this pattern.  The use of events avoids direct dependencies between services.

```typescript
// event-emitter.ts
class EventEmitter {
  listeners: { [event: string]: Function[] } = {};

  on(event: string, listener: Function) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(listener);
  }

  emit(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(listener => listener(data));
    }
  }
}

// order.service.ts
class OrderService {
  private emitter = new EventEmitter();

  placeOrder(order: { items: string[], quantity: number }) {
    console.log(`Order placed: ${JSON.stringify(order)}`);
    this.emitter.emit('order_placed', order);
  }

  onOrderPlaced(listener: (order: { items: string[], quantity: number }) => void) {
    this.emitter.on('order_placed', listener);
  }
}

// inventory.service.ts
class InventoryService {
  private stock: { [item: string]: number } = {};

  constructor() {
    this.stock = { 'widget': 100, 'gadget': 50 };
  }

  handleOrderPlaced(order: { items: string[], quantity: number }) {
    order.items.forEach(item => {
      if (this.stock[item]) {
        this.stock[item] -= order.quantity;
        console.log(`Inventory updated: ${item} - remaining: ${this.stock[item]}`);
      } else {
        console.warn(`Item not found in inventory: ${item}`);
      }
    });
  }
}

// notification.service.ts
class NotificationService {
  handleOrderPlaced(order: { items: string[], quantity: number }) {
    console.log(`Sending notification for order: ${JSON.stringify(order)}`);
    // Simulate sending a notification (e.g., email, SMS)
  }
}

// app.ts
const orderService = new OrderService();
const inventoryService = new InventoryService();
const notificationService = new NotificationService();

orderService.onOrderPlaced(inventoryService.handleOrderPlaced.bind(inventoryService));
orderService.onOrderPlaced(notificationService.handleOrderPlaced.bind(notificationService));

orderService.placeOrder({ items: ['widget'], quantity: 5 });
orderService.placeOrder({ items: ['gadget'], quantity: 10 });
```