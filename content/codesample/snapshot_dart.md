---
title: "Snapshot - Dart"
date: 2025-12-03T14:02:55.420-05:00
draft: false
pattern_usage: ["Snapshot"]
language: ["Dart"]
---
The Snapshot pattern captures and restores the state of an object or system, allowing for rollbacks or efficient re-initialization. This is achieved by serializing the object's state to a persistent storage (like a file) and then deserializing it to recreate that state. In Dart, this is naturally implemented using the `encode` and `decode` methods from the `dart:convert` library, often with JSON as the serialization format. The example demonstrates saving and restoring a simple `Counter` object's value. Using JSON is idiomatic Dart for data serialization due to its readability and ease of use with Dart's built-in data structures.

```dart
import 'dart:convert';
import 'dart:io';

class Counter {
  int value;

  Counter(this.value);

  @override
  String toString() => 'Counter(value: $value)';

  Map<String, dynamic> toJson() => {'value': value};

  factory Counter.fromJson(Map<String, dynamic> json) = Counter._;

  Counter._(this.value);
}

Future<void> saveSnapshot(Counter counter, String filePath) async {
  final json = counter.toJson();
  final file = File(filePath);
  await file.writeAsString(jsonEncode(json));
  print('Snapshot saved to $filePath');
}

Future<Counter> loadSnapshot(String filePath) async {
  final file = File(filePath);
  final contents = await file.readAsString();
  final json = jsonDecode(contents) as Map<String, dynamic>;
  final counter = Counter.fromJson(json);
  print('Snapshot loaded from $filePath');
  return counter;
}

void main() async {
  var counter = Counter(10);
  print('Initial counter: $counter');

  const filePath = 'counter_snapshot.json';
  await saveSnapshot(counter, filePath);

  counter = Counter(0); // Reset counter
  print('Counter reset: $counter');

  counter = await loadSnapshot(filePath);
  print('Counter restored: $counter');
}
```