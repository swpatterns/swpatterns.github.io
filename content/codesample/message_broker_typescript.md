---
title: "Message Broker - TypeScript"
date: 2025-12-03T15:07:06.521-05:00
draft: false
pattern_usage: ["Message Broker"]
language: ["TypeScript"]
---
The Message Broker pattern decouples application components by enabling them to communicate via messages. Components don't need to know about each other directly; they interact through a central message broker. This promotes scalability, flexibility, and resilience.

This TypeScript implementation uses a simple `MessageBroker` class to manage message channels (topics).  Components `subscribe` to channels and `publish` messages to them. Subscribers receive messages via a callback function.  The use of a `Map` to store subscribers per channel is efficient for lookup.  TypeScript's type safety is leveraged to ensure messages are handled correctly, and the asynchronous nature of callbacks aligns with TypeScript's modern asynchronous programming style.  This avoids tight coupling and allows for dynamic addition/removal of subscribers.

```typescript
// message-broker.ts
type SubscriberCallback = (message: any) => void;

class MessageBroker {
  private subscribers: Map<string, SubscriberCallback[]> = new Map();

  subscribe(channel: string, callback: SubscriberCallback): void {
    if (!this.subscribers.has(channel)) {
      this.subscribers.set(channel, []);
    }
    this.subscribers.get(channel)!.push(callback);
  }

  publish(channel: string, message: any): void {
    if (this.subscribers.has(channel)) {
      const callbacks = this.subscribers.get(channel)!;
      callbacks.forEach(callback => callback(message));
    }
  }
}

// Example Usage
const broker = new MessageBroker();

// Subscriber 1
broker.subscribe('news', (message) => {
  console.log('Subscriber 1 received news:', message);
});

// Subscriber 2
broker.subscribe('news', (message) => {
  console.log('Subscriber 2 received news:', message);
});

// Subscriber to a different channel
broker.subscribe('alerts', (message) => {
  console.log('Alerts Subscriber received:', message);
});

// Publishing messages
broker.publish('news', { headline: 'TypeScript is awesome!', content: 'This is a great language.' });
broker.publish('alerts', { type: 'warning', message: 'Low disk space!' });
```