---
title: "Singleton - Dart"
date: 2025-12-03T11:07:43.759-05:00
draft: false
pattern_usage: ["Singleton"]
language: ["Dart"]
---
The Singleton pattern ensures a class has only one instance, and provides a global point of access to it. This is useful for managing resources like database connections, configuration settings, or logging services where multiple instances would be problematic or inefficient. In Dart, this is efficiently implemented using a static instance and a private constructor. The private constructor prevents external instantiation, while the static factory method `instance` provides controlled access to the single instance. This approach leverages Dart’s static members and constructor control for a concise and thread-safe Singleton.

```dart
/// A class representing a Singleton.
class Singleton {
  // Private constructor to prevent direct instantiation.
  Singleton._();

  // Static instance to hold the single instance.
  static final Singleton _instance = Singleton._();

  // Static factory method to access the instance.
  static Singleton get instance => _instance;

  // Example data/method to demonstrate usage.
  String data = 'Initial Data';

  void updateData(String newData) {
    data = newData;
  }
}

// Example Usage (not part of the Singleton class itself)
void main() {
  final singleton1 = Singleton.instance;
  final singleton2 = Singleton.instance;

  print(singleton1 == singleton2); // Output: true

  singleton1.updateData('Updated Data');
  print(singleton2.data); // Output: Updated Data
}
```