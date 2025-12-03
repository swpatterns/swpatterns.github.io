---
title: "Null Object - JavaScript"
date: 2025-12-03T13:46:10.781-05:00
draft: false
pattern_usage: ["Null Object"]
language: ["JavaScript"]
---
The Null Object pattern provides a substitute for an object used in situations where an object is expected but doesn't make sense to create a full instance. It defines a class with methods that do nothing or return default values, avoiding `null` checks throughout the code. This simplifies logic and improves readability.

The JavaScript example defines a `Person` class and a `NullPerson` class. `NullPerson` implements the same interface (methods) as `Person` but provides default, no-op implementations.  When a person object is unavailable (e.g., from a database query), a `NullPerson` instance is returned instead of `null`. This allows calling methods on the object without error handling, as they will simply return default values. This approach is idiomatic JavaScript as it leverages prototypal inheritance and focuses on providing a consistent interface.

```javascript
// Person.js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getName() {
    return this.name;
  }

  getAge() {
    return this.age;
  }

  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}

// NullPerson.js
class NullPerson {
  getName() {
    return "Unknown";
  }

  getAge() {
    return 0;
  }

  toString() {
    return "Null Person";
  }
}

// Usage
function getPerson(id) {
  // Simulate database lookup
  if (id === 1) {
    return new Person("Alice", 30);
  } else {
    return new NullPerson();
  }
}

const person1 = getPerson(1);
const person2 = getPerson(2);

console.log(person1.toString());
console.log(person2.toString());
console.log(person2.getName());
console.log(person2.getAge());
```