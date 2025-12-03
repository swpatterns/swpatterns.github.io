---
title: "Space-Based Architecture - Dart"
date: 2025-12-03T15:00:36.782-05:00
draft: false
pattern_usage: ["Space-Based Architecture"]
language: ["Dart"]
---
The Space-Based Architecture pattern decouples an application into independent, self-contained “spaces” that communicate via messages. Each space manages its own state and logic, reducing global state and improving modularity. This implementation uses Dart’s `StreamController` to create these spaces and message passing. Each space exposes a stream for receiving commands and a stream for emitting events. The `main` function orchestrates interactions between spaces by sending commands and listening for events. This approach aligns with Dart’s asynchronous programming model and promotes a reactive, event-driven architecture, making it well-suited for complex applications.

```dart
import 'dart:async';

// Define a Space (component)
class Space {
  final StreamController<String> _commandController = StreamController<String>();
  final StreamController<String> _eventController = StreamController<String>();

  Stream<String> get commands => _commandController.stream;
  Stream<String> get events => _eventController.stream;

  void handleCommand(String command) {
    print('Space received command: $command');
    // Simulate processing
    Future.delayed(Duration(milliseconds: 500), () {
      _eventController.sink.add('Processed: $command');
    });
  }

  void close() {
    _commandController.close();
    _eventController.close();
  }
}

void main() {
  final space1 = Space();
  final space2 = Space();

  // Listen for events from space1
  space1.events.listen((event) => print('Main received event from Space 1: $event'));

  // Listen for events from space2
  space2.events.listen((event) => print('Main received event from Space 2: $event'));

  // Send commands to spaces
  space1.commands.sink.add('Command A');
  space2.commands.sink.add('Command B');
  space1.commands.sink.add('Command C');

  // Allow time for processing and event emission
  Future.delayed(Duration(seconds: 2), () {
    space1.close();
    space2.close();
    print('Spaces closed.');
  });
}
```