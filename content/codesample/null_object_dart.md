---
title: "Null Object - Dart"
date: 2025-12-03T13:49:19.452-05:00
draft: false
pattern_usage: ["Null Object"]
language: ["Dart"]
---
The Null Object pattern provides a substitute for a null reference or null value. Instead of checking for nulls everywhere, you call a null object, which responds to all methods in a way that doesn't affect the program's logic. This simplifies code and avoids NullPointerExceptions.

The Dart example defines an `Animal` interface with a `speak()` method. A concrete `Dog` class implements this interface.  `NullDog` is the null object, also implementing `Animal`, but providing a no-op `speak()` method.  The `getAnimal()` function demonstrates how to return a `NullDog` instance when a real animal isn't available, allowing the calling code to treat both real and null animals uniformly. This approach is idiomatic Dart as it leverages interfaces and classes for type safety and promotes a more fluent coding style by reducing null checks.

```dart
// Define the interface
abstract class Animal {
  void speak();
}

// Concrete implementation
class Dog implements Animal {
  final String name;

  Dog(this.name);

  @override
  void speak() {
    print('Woof! My name is $name.');
  }
}

// Null Object implementation
class NullDog implements Animal {
  @override
  void speak() {
    // Do nothing - this is the null behavior
  }
}

// Function to get an animal (potentially null)
Animal? getAnimal(bool hasDog) {
  if (hasDog) {
    return Dog('Buddy');
  } else {
    return NullDog();
  }
}

void main() {
  Animal? animal1 = getAnimal(true);
  animal1?.speak(); // Output: Woof! My name is Buddy.

  Animal? animal2 = getAnimal(false);
  animal2.speak(); // No output, no error.
}
```