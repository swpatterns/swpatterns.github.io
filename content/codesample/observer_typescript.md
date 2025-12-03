---
title: "Observer - TypeScript"
date: 2025-12-03T13:24:20.050-05:00
draft: false
pattern_usage: ["Observer"]
language: ["TypeScript"]
---
The Observer pattern defines a one-to-many dependency between objects. A subject (observable) maintains a list of observers (dependents), and notifies them of any state changes. This promotes loose coupling, allowing subjects and observers to change independently.

This TypeScript implementation uses classes and interfaces to define the Subject and Observer roles. The `Subject` manages a list of `Observer`s and provides methods to attach, detach, and notify them.  Observers subscribe to the subject to receive updates.  The use of interfaces (`Observer`, `Subject`) enforces contracts and promotes type safety, common TypeScript practice.  The notification is done via a callback function (the `update` method) allowing observers to react to the change without knowing the subject's internals.  This pattern naturally fits TypeScript’s class-based structure and preference for type annotations.

```typescript
// Observer Interface
interface Observer {
  update(data: any): void;
}

// Subject Interface
interface Subject {
  register(observer: Observer): void;
  unregister(observer: Observer): void;
  notify(): void;
}

// Concrete Subject
class DataSubject implements Subject {
  private observers: Observer[] = [];
  private data: any;

  setData(newData: any): void {
    this.data = newData;
    this.notify();
  }

  getData(): any {
    return this.data;
  }

  register(observer: Observer): void {
    this.observers.push(observer);
  }

  unregister(observer: Observer): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(): void {
    this.observers.forEach(observer => observer.update(this.data));
  }
}

// Concrete Observer
class DataLogger implements Observer {
  update(data: any): void {
    console.log(`Data updated: ${data}`);
  }
}

class DataDisplay implements Observer {
  update(data: any): void {
    document.getElementById('dataDisplay')?. (textContent => `Displayed Data: ${data}`)(document.getElementById('dataDisplay').textContent);
  }
}

// Usage
const subject = new DataSubject();
const logger = new DataLogger();
const display = new DataDisplay();

subject.register(logger);
subject.register(display);

subject.setData("Hello, Observer!");
subject.setData(123);

subject.unregister(logger);
subject.setData("Goodbye, Logger!");
```