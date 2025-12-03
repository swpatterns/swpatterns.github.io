---
title: "Observer - JavaScript"
date: 2025-12-03T13:24:01.641-05:00
draft: false
pattern_usage: ["Observer"]
language: ["JavaScript"]
---
The Observer pattern defines a one-to-many dependency between objects. A subject (observable) maintains a list of its dependent observers and automatically notifies them of any state changes. This promotes loose coupling, as observers don't need to know the subject's specifics, only how to react to changes.

This JavaScript implementation uses a simple array to store observers. The `Subject` class has methods to `subscribe`, `unsubscribe`, and `notify`. When the subject's data changes (via `setData`), it iterates through the observers and calls their update methods.  This leverages JavaScript's first-class functions, making it easy to add and remove observer functions.  It is a common and efficient approach for implementing event handling and reactive systems in JavaScript.

```javascript
/**
 * Observer Pattern in JavaScript
 */

class Subject {
  constructor() {
    this.observers = [];
    this.data = null;
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  setData(newData) {
    this.data = newData;
    this.notify();
  }

  getData() {
    return this.data;
  }

  notify() {
    this.observers.forEach(observer => observer.update(this.data));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  update(data) {
    console.log(`${this.name} received update: ${data}`);
  }
}

// Usage
const subject = new Subject();

const observer1 = new Observer("Observer 1");
const observer2 = new Observer("Observer 2");

subject.subscribe(observer1);
subject.subscribe(observer2);

subject.setData("Initial Data");
subject.setData("New Data");

subject.unsubscribe(observer1);

subject.setData("Even Newer Data");
```