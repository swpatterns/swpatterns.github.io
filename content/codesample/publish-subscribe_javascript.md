---
title: "Publish-Subscribe - JavaScript"
date: 2025-12-03T15:27:34.481-05:00
draft: false
pattern_usage: ["Publish-Subscribe"]
language: ["JavaScript"]
---
The Publish-Subscribe (Pub/Sub) pattern enables decoupling of message producers (publishers) from message consumers (subscribers). Publishers emit events without knowing who, if anyone, is listening. Subscribers express interest in specific events and receive notifications when those events occur. This promotes loose coupling and scalability.

This JavaScript implementation uses a simple object to manage topics and subscriptions. Publishers call `publish` with a topic and data. Subscribers call `subscribe` with a topic and a callback function. The `publish` function iterates through the subscribers for the given topic and invokes their callbacks with the provided data. This approach is idiomatic JavaScript due to its reliance on first-class functions and flexible object structure, avoiding the need for complex class hierarchies.

```javascript
class PubSub {
  constructor() {
    this.topics = {};
  }

  subscribe(topic, callback) {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }
    this.topics[topic].push(callback);
    return () => { // Return an unsubscribe function
      this.topics[topic] = this.topics[topic].filter(cb => cb !== callback);
    };
  }

  publish(topic, data) {
    if (!this.topics[topic] || this.topics[topic].length === 0) {
      return;
    }
    this.topics[topic].forEach(callback => {
      callback(data);
    });
  }
}

// Example Usage
const pubSub = new PubSub();

const logData = (data) => {
  console.log('Log:', data);
};

const alertData = (data) => {
  alert('Alert: ' + data);
};

const unsubscribeLog = pubSub.subscribe('data', logData);
pubSub.subscribe('data', alertData);

pubSub.publish('data', 'Hello, world!');

unsubscribeLog(); // Stop logging

pubSub.publish('data', 'Another message!'); // Only alerts will be shown
```