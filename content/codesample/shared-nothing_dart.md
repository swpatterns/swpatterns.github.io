---
title: "Shared-Nothing - Dart"
date: 2025-12-03T15:15:05.371-05:00
draft: false
pattern_usage: ["Shared-Nothing"]
language: ["Dart"]
---
The Shared-Nothing pattern emphasizes independent processes that don’t share any global state. Each process has its own dedicated resources – memory, disk – and communicates exclusively through message passing. This avoids contention and simplifies concurrency.

This Dart example models a simple distributed counter using isolates. Each isolate represents a worker with its private counter.  The `main` isolate spawns multiple worker isolates and sends them increment/get requests via `ReceivePort` and `SendPort`. Isolates communicate by copying messages, enforcing the "shared-nothing" principle. Dart's isolates are a natural fit for this pattern as they enforce memory isolation, and use message passing for communication, making it relatively straightforward to implement.

```dart
import 'dart:isolate';

void counterIsolate(SendPort sendPort) {
  int count = 0;
  sendPort.listen((message) {
    if (message == 'increment') {
      count++;
    } else if (message == 'get') {
      sendPort.send(count);
    }
  });
}

void main() async {
  final numIsolates = 3;
  final List<Isolate> isolates = [];
  final List<ReceivePort> receivePorts = [];

  for (int i = 0; i < numIsolates; i++) {
    final receivePort = ReceivePort();
    final isolate = await Isolate.spawn(counterIsolate, receivePort.sendPort);
    isolates.add(isolate);
    receivePorts.add(receivePort);
  }

  // Increment each counter a few times
  for (int i = 0; i < 5; i++) {
    for (var port in receivePorts) {
      port.send('increment');
    }
  }

  // Get the counts from each isolate
  for (int i = 0; i < numIsolates; i++) {
    final count = await receivePorts[i].first;
    print('Isolate $i count: $count');
  }

  // Shutdown isolates
  for (var isolate in isolates) {
    isolate.kill();
  }
}
```