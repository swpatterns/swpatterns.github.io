---
title: "Client-Server - Dart"
date: 2025-12-03T14:35:44.763-05:00
draft: false
pattern_usage: ["Client-Server"]
language: ["Dart"]
---
The Client-Server pattern distributes application logic between servers providing resources or services and clients requesting those resources. This example uses Dart’s `Isolate` to simulate a simple server handling string reversal requests from clients. The server listens for messages on a `ReceivePort`, reverses the received string, and sends the result back via a `SendPort` provided by the client. This demonstrates asynchronous communication, a key aspect of client-server architectures. Dart’s isolates enable true concurrency, preventing blocking the main thread while processing requests, fitting the pattern’s need for responsiveness.

```dart
// server.dart
import 'dart:isolate';

void server(SendPort sendPort) {
  ReceivePort receivePort = ReceivePort();
  sendPort.send(receivePort.sendPort); // Send back the server's receive port

  receivePort.listen((message) {
    String input = message as String;
    String reversed = input.split('').reversed.join('');
    sendPort.send(reversed);
  });
}

// client.dart
import 'dart:isolate';

void main() async {
  Isolate.spawn(server, null);

  ReceivePort receivePort = ReceivePort();
  SendPort sendPort = receivePort.sendPort;
  Isolate spawnedIsolate = await Isolate.spawn(server, null);

  sendPort.post('hello');

  receivePort.listen((message) {
    print('Received from server: $message');
    spawnedIsolate.kill(); // Terminate isolate after receiving the result
    receivePort.close(); // Close the receiving port
  });
}
```