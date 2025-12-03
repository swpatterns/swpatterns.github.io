---
title: "Publish-Subscribe - Dart"
date: 2025-12-03T15:30:49.875-05:00
draft: false
pattern_usage: ["Publish-Subscribe"]
language: ["Dart"]
---
The Publish-Subscribe (Pub/Sub) pattern decouples message senders (publishers) from message receivers (subscribers). Publishers don't know who their subscribers are, and subscribers only know *of* the publishers, not how to directly interact with them. A central message broker (often called a topic or event bus) manages message delivery.

This Dart implementation uses a `Subject` class to act as the message broker. Publishers call `notify()` on the subject, providing a message. Subscribers register with the subject via a `StreamSubscription` to receive these messages. Dart's Streams and `StreamController` are naturally suited for this pattern, providing a reactive and efficient way to manage asynchronous event handling. The use of `StreamController` and `Stream` aligns with Dart's asynchronous programming model and promotes a clean separation of concerns.

```dart
// subject.dart
import 'dart:async';

class Subject {
  final StreamController<String> _controller = StreamController<String>();

  Stream<String> get stream => _controller.stream;

  void notify(String message) {
    _controller.sink.add(message);
  }

  void close() {
    _controller.close();
  }
}

// main.dart
import 'subject.dart';

void main() {
  final subject = Subject();

  // Subscriber 1
  subject.stream.listen((message) {
    print('Subscriber 1 received: $message');
  });

  // Subscriber 2
  subject.stream.listen((message) {
    print('Subscriber 2 received: $message');
  });

  // Publish messages
  subject.notify('Hello, Subscribers!');
  subject.notify('Another message.');

  // Clean up
  subject.close();
}
```