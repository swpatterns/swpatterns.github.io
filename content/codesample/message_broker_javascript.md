---
title: "Message Broker - JavaScript"
date: 2025-12-03T15:06:48.535-05:00
draft: false
pattern_usage: ["Message Broker"]
language: ["JavaScript"]
---
The Message Broker pattern decouples application components by enabling them to communicate through intermediary message queues. Components (producers) send messages to the broker without knowing who the consumers are, and consumers subscribe to specific message types to receive relevant updates. This promotes scalability, flexibility, and resilience.

This JavaScript implementation uses a simple object to represent the message broker. Producers publish messages to topics, and consumers subscribe to topics via a callback function. When a message is published, the broker iterates through the subscribers for that topic and invokes their callbacks.  This approach leverages JavaScript's first-class function capabilities and object-oriented nature for a clean and flexible design, avoiding tight coupling between components.  It's a common pattern for event-driven architectures in JavaScript, particularly in front-end frameworks and Node.js applications.

```javascript
class MessageBroker {
  constructor() {
    this.topics = {};
  }

  subscribe(topic, callback) {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }
    this.topics[topic].push(callback);
  }

  publish(topic, message) {
    if (this.topics[topic]) {
      this.topics[topic].forEach(callback => {
        callback(message);
      });
    }
  }
}

// Example Usage:
const broker = new MessageBroker();

// Subscriber 1
broker.subscribe('user.created', (user) => {
  console.log('User created:', user.name);
});

// Subscriber 2
broker.subscribe('user.created', (user) => {
  console.log('Sending welcome email to:', user.email);
});

// Subscriber 3 - different topic
broker.subscribe('order.placed', (order) => {
  console.log('Order placed:', order.id);
});

// Publishing messages
broker.publish('user.created', { name: 'Alice', email: 'alice@example.com' });
broker.publish('user.created', { name: 'Bob', email: 'bob@example.com' });
broker.publish('order.placed', { id: '12345' });
```