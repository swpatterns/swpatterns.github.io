
---
title: Publish-Subscribe
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "messaging"]
wikipedia: "https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern"
diagramtype: "class"
diagram: "[Publisher] --|> [Event] : publishes\n[Broker] --|> [Event] : receives\n[Broker] --|> [Subscriber] : dispatches\n[Subscriber] --|> [Event] : receives\n[note: Subscribers register with the Broker {bg:lightblue}]"
code: true
---

The Publish-Subscribe pattern defines one-to-many dependencies between objects.  A publisher (or event source) doesn’t know about its subscribers. Instead, it publishes events to a broker (or message queue), and subscribers express interest in specific events by registering with the broker.  When an event occurs, the broker efficiently delivers it to all registered subscribers.

## Usage

The Publish-Subscribe pattern is frequently used in scenarios requiring loose coupling and event-driven architectures. Common use cases include:

*   **Real-time updates:**  Applications needing to react immediately to changes (e.g., stock tickers, news feeds).
*   **Event logging and monitoring:**  Capturing and distributing system events for analysis and auditing.
*   **Decoupled microservices:**  Allowing services to communicate without direct dependencies.
*   **GUI frameworks:**  Notifying UI elements when underlying data changes.
*   **Messaging systems:** Implementing asynchronous communication between applications and components.

## Examples

1.  **Node.js `EventEmitter`:**  Node.js's core `EventEmitter` class implements the Publish-Subscribe pattern.  Modules can emit named events, and other modules can listen for those events using the `on()` method. The EventEmitter acts as the broker.

    javascript
    const emitter = new EventEmitter();

    // Subscriber
    emitter.on('data', (data) => {
      console.log("Received data:", data);
    });

    // Publisher
    emitter.emit('data', {message: 'Hello, world!'});
    

2.  **RxJS (Reactive Extensions for JavaScript):**  RxJS provides a powerful and flexible way to implement reactive programming, heavily based on the Publish-Subscribe pattern using Observables and Observers.  Observables are the publishers, and Observers are the subscribers.

    javascript
    import { Observable } from 'rxjs';

    // Publisher (Observable)
    const observable = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.complete();
    });

    // Subscriber (Observer)
    observable.subscribe(
      value => console.log('value:', value),
      error => console.log('error:', error),
      () => console.log('completed')
    );
    