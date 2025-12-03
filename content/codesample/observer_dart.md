---
title: "Observer - Dart"
date: 2025-12-03T13:27:29.208-05:00
draft: false
pattern_usage: ["Observer"]
language: ["Dart"]
---
The Observer pattern defines a one-to-many dependency between objects. A subject (observable) maintains a list of its dependents (observers) and notifies them of any state changes. This promotes loose coupling, allowing the subject to change without affecting observers, and vice-versa.

The Dart implementation uses streams (`StreamController`) as the observable subject and stream subscriptions as the observers.  Each time the subject's state changes, it emits a new value to the stream, automatically notifying all subscribers. Dart’s asynchronous stream handling makes this a natural and efficient fit for the observer pattern's event-based nature. Using `StreamController` combined with `Stream.listen` is highly idiomatic for reactive programming in Dart.

```dart
// observer.dart
import 'dart:async';

// Subject (Observable)
class Subject {
  final StreamController<int> _controller = StreamController<int>();

  Stream<int> get stream => _controller.stream;

  void set value(int newValue) {
    _controller.sink.add(newValue);
  }

  void dispose() {
    _controller.close();
  }
}

// Observer
class Observer {
  final String name;
  void Function(int) _callback;

  Observer(this.name, this. _callback);

  factory Observer.withFunction(String name, void Function(int) callback) {
    return Observer(name, callback);
  }

  void observe(Subject subject) {
    subject.stream.listen(_callback);
  }
}

void main() {
  final subject = Subject();
  final observer1 = Observer('Observer 1', (data) => print('$name received: $data'));
  final observer2 = Observer('Observer 2', (data) => print('$name received: $data'));

  observer1.observe(subject);
  observer2.observe(subject);

  subject.value = 1;
  subject.value = 2;
  subject.value = 3;

  subject.dispose(); // Important to free resources
}
```