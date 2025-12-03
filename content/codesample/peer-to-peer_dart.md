---
title: "Peer-to-Peer - Dart"
date: 2025-12-03T06:27:44.574-05:00
draft: false
pattern_usage: ["Peer-to-Peer"]
language: ["Dart"]
---
The Peer-to-Peer pattern establishes direct communication and data exchange between participating entities (peers) without relying on a central server. Each peer acts as both a client and a server, sharing resources and responsibilities. In this Dart example, we simulate a basic peer-to-peer network using streams and stream controllers to represent peers exchanging messages. Each peer has a controller for sending to others and a stream to receive messages, effectively broadcasting messages to all connected peers. This can be extended with more sophisticated peer discovery and security. It’s idiomatic Dart due to its use of streams for asynchronous communication, mirroring how real-time event handling would be implemented.

```dart
// peers.dart
import 'dart:async';

class Peer {
  final String id;
  final StreamController<String> _controller = StreamController<String>.broadcast();

  Peer(this.id);

  Stream<String> get stream => _controller.stream;
  Sink<String> get sink => _controller.sink;

  void broadcast(String message) {
    sink.add("$id: $message");
  }
}

void main() {
  final peer1 = Peer('Peer1');
  final peer2 = Peer('Peer2');
  final peer3 = Peer('Peer3');

  peer1.broadcast('Hello, everyone!');
  peer2.broadcast('Hi Peer1!');
  peer3.broadcast('Greetings!');

  peer1.stream.listen((message) => print(message));
  peer2.stream.listen((message) => print(message));
  peer3.stream.listen((message) => print(message));
}
```