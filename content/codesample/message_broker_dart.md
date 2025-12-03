---
title: "Message Broker - Dart"
date: 2025-12-03T15:10:41.185-05:00
draft: false
pattern_usage: ["Message Broker"]
language: ["Dart"]
---
The Message Broker pattern decouples application components by enabling them to communicate through intermediary message channels (brokers). Components, termed publishers and subscribers, don’t need to know about each other directly. Publishers send messages to the broker, and subscribers receive messages they’ve registered for. This promotes scalability, flexibility and resilience. In Dart, this is elegantly implemented using Streams and StreamControllers, which naturally handle asynchronous message passing.  The `StreamController` acts as our broker, allowing components to broadcast and listen for events without tight coupling. This approach leverages Dart's asynchronous-first design and stream manipulation capabilities.

```dart
// message_broker.dart
import 'dart:async';

class MessageBroker {
  final _controller = StreamController<String>();

  Stream<String> get stream => _controller.stream;

  void publish(String message) {
    _controller.add(message);
  }

  void close() {
    _controller.close();
  }
}

// publisher.dart
import 'message_broker.dart';

class Publisher {
  final MessageBroker broker;
  final String name;

  Publisher(this.broker, this.name);

  void sendMessage(String message) {
    broker.publish('$name: $message');
  }
}

// subscriber.dart
import 'dart:async';
import 'message_broker.dart';

class Subscriber {
  final String name;
  final MessageBroker broker;

  Subscriber(this.name, this.broker) {
    broker.stream.listen((message) {
      print('$name received: $message');
    });
  }
}

// main.dart
import 'message_broker.dart';
import 'publisher.dart';
import 'subscriber.dart';

void main() {
  final broker = MessageBroker();
  final publisher1 = Publisher(broker, 'News Source 1');
  final publisher2 = Publisher(broker, 'News Source 2');
  final subscriber1 = Subscriber('User A', broker);
  final subscriber2 = Subscriber('User B', broker);

  publisher1.sendMessage('Breaking news: Dart is awesome!');
  publisher2.sendMessage('Another update: Flutter is growing fast!');

  // Allow time for messages to be processed before closing
  Future.delayed(Duration(seconds: 2), () => broker.close());
}
```