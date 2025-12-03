---
title: "Extension Object - Dart"
date: 2025-12-03T12:55:06.533-05:00
draft: false
pattern_usage: ["Extension Object"]
language: ["Dart"]
---
The Extension Object pattern adds new functionality to an existing class without modifying its code, using a separate "extension" class. This is achieved by holding an instance of the original class within the extension and delegating method calls to it. In Dart, this is directly supported by the `extension` keyword, making it a natural fit. The example extends the `String` class to provide a method for counting vowels. This avoids polluting the original `String` class with potentially less-used functionality and promotes code organization. The Dart implementation is concise and leverages the language's built-in extension support for a clean and readable solution.

```dart
// Define the original class
class Person {
  final String name;

  Person(this.name);

  String greet() => 'Hello, my name is $name.';
}

// Define the extension object
extension PersonExtensions on Person {
  String introduce() => 'Meet ${name}, a wonderful person.';
}

// Example Usage
void main() {
  final person = Person('Alice');
  print(person.greet());
  print(person.introduce()); // Accessing the extended method
}
```