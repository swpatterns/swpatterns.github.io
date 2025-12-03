---
title: "Object Pool - Dart"
date: 2025-12-03T11:15:38.990-05:00
draft: false
pattern_usage: ["Object Pool"]
language: ["Dart"]
---
The Object Pool pattern manages a pool of reusable objects to reduce the cost of repeated object creation and destruction. It's beneficial for heavy object creation scenarios, like database connections or complex calculations. The code implements a `Pool` class that holds a collection of `PooledObject` instances.  `request()` and `release()` methods manage borrowing and returning objects to the pool.  The `PooledObject` represents the objects being managed - in this case, simple objects with a given state. Using a `Queue` from Dart's collection library offers an efficient FIFO structure to manage object availability.  This implementation utilizes Dart's class-based object-oriented structure for clarity and maintainability.

```dart
import 'dart:collection';

class PooledObject {
  String state;

  PooledObject(this.state);

  void reset() {
    state = ''; // Resets the object to a default state
  }

  @override
  String toString() => 'PooledObject(state: $state)';
}

class Pool {
  final int _maxSize;
  final Queue<PooledObject> _pool = Queue();

  Pool(this._maxSize) {
    // Initialize the pool with pre-created objects
    for (var i = 0; i < _maxSize; i++) {
      _pool.add(PooledObject('Initial State'));
    }
  }

  PooledObject request() {
    if (_pool.isEmpty) {
      print('Pool is empty. Creating a new object.');
      return PooledObject('New State'); // Or handle this differently, e.g., throw an error.
    }
    return _pool.removeFirst();
  }

  void release(PooledObject object) {
    object.reset();
    if (_pool.length < _maxSize) {
      _pool.addLast(object);
    }
    // Optionally, destroy objects if the pool is full
  }
}

void main() {
  var pool = Pool(3);

  var obj1 = pool.request();
  obj1.state = 'Object 1 in Use';
  print(obj1);

  var obj2 = pool.request();
  obj2.state = 'Object 2 in Use';
  print(obj2);
  
  pool.release(obj1);
  print('Object 1 released');

  var obj3 = pool.request();
  print(obj3); 

  pool.release(obj2);
  pool.release(obj3);

  print('Pool size after releases: ${pool.length}');
}
```