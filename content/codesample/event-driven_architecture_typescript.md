---
title: "Event-Driven Architecture - TypeScript"
date: 2025-12-03T14:52:00.089-05:00
draft: false
pattern_usage: ["Event-Driven Architecture"]
language: ["TypeScript"]
---
The Event-Driven Architecture (EDA) decouples components by allowing them to communicate through events. Components (event producers) emit events without knowing who will handle them, and other components (event consumers) subscribe to events they're interested in. This promotes scalability and flexibility.

This TypeScript implementation uses a simple `EventEmitter` class to manage event subscriptions and emissions.  `EventProducer` emits events with associated data. `EventConsumer` subscribes to specific events and handles them with a callback function.  TypeScript's type safety is leveraged by defining event types and callback signatures, improving code maintainability and reducing errors. This approach aligns with TypeScript's focus on strong typing and object-oriented principles, offering a clean and scalable way to build event-driven systems.

```typescript
// event-emitter.ts
class EventEmitter {
  private events: { [event: string]: ((data: any) => void)[] } = {};

  subscribe(event: string, callback: (data: any) => void): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  emit(event: string, data: any): void {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
}

// event-producer.ts
class EventProducer {
  private emitter: EventEmitter;

  constructor(emitter: EventEmitter) {
    this.emitter = emitter;
  }

  produceEvent(type: string, data: any): void {
    this.emitter.emit(type, data);
  }
}

// event-consumer.ts
class EventConsumer {
  private emitter: EventEmitter;

  constructor(emitter: EventEmitter) {
    this.emitter = emitter;
  }

  consumeEvent(type: string, callback: (data: any) => void): void {
    this.emitter.subscribe(type, callback);
  }
}

// main.ts
const emitter = new EventEmitter();
const producer = new EventProducer(emitter);
const consumer = new EventConsumer(emitter);

consumer.consumeEvent('userCreated', (userData: { id: number; name: string }) => {
  console.log(`User created: ID=${userData.id}, Name=${userData.name}`);
});

producer.produceEvent('userCreated', { id: 1, name: 'Alice' });
producer.produceEvent('userCreated', { id: 2, name: 'Bob' });
```