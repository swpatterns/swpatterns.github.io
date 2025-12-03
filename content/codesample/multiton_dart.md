---
title: "Multiton - Dart"
date: 2025-12-03T11:11:25.729-05:00
draft: false
pattern_usage: ["Multiton"]
language: ["Dart"]
---
The Multiton pattern ensures that only a limited number of instances of a class can exist. It's a relaxed version of the Singleton pattern. This is achieved by maintaining a static list or map to store the instances and controlling the instance creation process.  The code uses a static, private map to hold the instances, keyed by a string identifier.  `getInstance()` checks if an instance with the given key exists; if not, it creates one and adds it to the map. This implementation is idiomatic Dart as it leverages Dart's strong typing, private members (`_`), and the use of maps for flexible instance management, avoiding unnecessary class hierarchies.

```dart
class Multiton {
  static final Map<String, Multiton> _instances = <String, Multiton>{};

  final String _key;

  // Private constructor to prevent direct instantiation
  Multiton._(this._key);

  // Public factory method to get an instance
  factory Multiton(String key) {
    if (_instances[key] == null) {
      _instances[key] = Multiton._(key);
    }
    return _instances[key];
  }

  // Example method
  void doSomething() {
    print('Multiton instance with key $_key is doing something.');
  }

  // Optional: Method to get the number of instances
  static int instanceCount() {
    return _instances.length;
  }
}

void main() {
  final instance1 = Multiton('A');
  final instance2 = Multiton('A'); // Returns the same instance as instance1
  final instance3 = Multiton('B');
  final instance4 = Multiton('C');

  instance1.doSomething();
  instance3.doSomething();

  print('Number of instances: ${Multiton.instanceCount()}'); // Output: 3
}
```