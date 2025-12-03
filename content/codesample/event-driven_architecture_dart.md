---
title: "Event-Driven Architecture - Dart"
date: 2025-12-03T14:55:38.462-05:00
draft: false
pattern_usage: ["Event-Driven Architecture"]
language: ["Dart"]
---
The Event-Driven Architecture (EDA) decouples components by having them communicate through events. Components (event producers) emit events when something significant happens, and other components (event consumers) react to those events without needing direct knowledge of the producers. This promotes flexibility and scalability.

This Dart implementation uses `StreamController` to manage event streams. The `EventBus` class acts as a central hub for publishing and subscribing to events.  Producers call `publish()` with an event object. Consumers subscribe to specific event types using `stream.listen()`.  Dart's asynchronous stream handling with `StreamController` and `Stream` is a natural fit for EDA, allowing for non-blocking event processing. The use of a dedicated `EventBus` class encapsulates the event management logic, keeping components clean and focused.

```dart
// event_bus.dart
import 'dart:async';

class EventBus {
  final _controller = StreamController<dynamic>();

  Stream<T> stream<T>() {
    return _controller.stream.map((event) => event as T);
  }

  void publish<T>(T event) {
    _controller.add(event);
  }

  void close() {
    _controller.close();
  }
}

// main.dart
import 'event_bus.dart';

class Counter {
  int _count = 0;

  void increment() {
    _count++;
    eventBus.publish(CounterIncrementedEvent(_count));
  }

  int get count => _count;
}

class CounterIncrementedEvent {
  final int newCount;
  CounterIncrementedEvent(this.newCount);
}

void main() {
  final eventBus = EventBus();

  final counter = Counter();

  eventBus.stream<CounterIncrementedEvent>().listen((event) {
    print('Counter incremented to: ${event.newCount}');
  });

  counter.increment();
  counter.increment();

  eventBus.close();
}
```