---
title: "Master-Slave - Dart"
date: 2025-12-03T15:34:33.310-05:00
draft: false
pattern_usage: ["Master-Slave"]
language: ["Dart"]
---
The Master-Slave pattern (also known as Leader-Follower) involves one object (the Master) holding the primary data and control, while other objects (the Slaves) synchronize their state with the Master. Changes are made to the Master, and these changes are then propagated to the Slaves. This ensures data consistency across multiple instances.

The Dart implementation uses a `Subject` class as the Master, holding the data and a list of `Observer` (Slave) instances. The `Subject` notifies its observers whenever its state changes using a simple callback mechanism. This approach leverages Dart's support for functional programming with the use of functions as first-class citizens, making the observer list and notification process concise and readable.  The use of a `StreamController` provides a more robust and reactive approach for larger, more complex scenarios.

```dart
// subject.dart
import 'dart:async';

class Subject {
  String _data = '';
  final StreamController<String> _controller = StreamController();

  String get data => _data;

  void setData(String newData) {
    _data = newData;
    _controller.sink.add(_data);
  }

  void addObserver(Observer observer) {
    _controller.stream.listen(observer.update);
  }
}

// observer.dart
abstract class Observer {
  void update(String data);
}

// main.dart
import 'subject.dart';
import 'observer.dart';

void main() {
  final subject = Subject();

  final observer1 = ObserverImplementation(id: 1);
  final observer2 = ObserverImplementation(id: 2);

  subject.addObserver(observer1);
  subject.addObserver(observer2);

  subject.setData('Initial Data');
  subject.setData('Data Updated!');
}

class ObserverImplementation implements Observer {
  final int id;
  ObserverImplementation({required this.id});

  @override
  void update(String data) {
    print('Observer $id received update: $data');
  }
}
```