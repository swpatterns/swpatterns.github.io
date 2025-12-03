---
title: "Publish-Subscribe - TypeScript"
date: 2025-12-03T15:27:50.167-05:00
draft: false
pattern_usage: ["Publish-Subscribe"]
language: ["TypeScript"]
---
The Publish-Subscribe (PubSub) pattern decouples message publishers from message subscribers. Publishers (or *topics*) don't know who their subscribers are, and subscribers only know *about* topics they're interested in, not who is publishing.  This allows for loose coupling and scalability.

The code implements a simple PubSub system using a `Subject` class.  This subject maintains a list of subscribers (callbacks) associated with each topic (string).  `publish()` adds a message to all subscribers of a topic, and `subscribe()` and `unsubscribe()` manage the subscriber list.  TypeScript's type safety is leveraged through the use of function type definitions for subscribers, improving code reliability. This is fitting for TypeScript by promoting strong typing for event handlers.

```typescript
class PubSub {
  private subscribers: { [topic: string]: Function[] } = {};

  subscribe(topic: string, subscriber: Function): void {
    if (!this.subscribers[topic]) {
      this.subscribers[topic] = [];
    }
    this.subscribers[topic].push(subscriber);
  }

  unsubscribe(topic: string, subscriber: Function): void {
    this.subscribers[topic] = this.subscribers[topic]?.filter(
      (sub) => sub !== subscriber
    ) || [];
  }

  publish(topic: string, data: any): void {
    if (this.subscribers[topic]) {
      this.subscribers[topic].forEach((subscriber) => subscriber(data));
    }
  }
}

// Example Usage
const pubSub = new PubSub();

const newsFeedSubscriber = (news: string) => {
  console.log("News Feed:", news);
};

const weatherSubscriber = (weather: string) => {
  console.log("Weather Update:", weather);
};

pubSub.subscribe("news", newsFeedSubscriber);
pubSub.subscribe("weather", weatherSubscriber);

pubSub.publish("news", "Breaking: TypeScript 4.9 released!");
pubSub.publish("weather", "Sunny with a high of 75°F.");

pubSub.unsubscribe("news", newsFeedSubscriber);
pubSub.publish("news", "Another news item"); // Will not log.
```