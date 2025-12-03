---
title: "Multiton - JavaScript"
date: 2025-12-03T11:08:27.075-05:00
draft: false
pattern_usage: ["Multiton"]
language: ["JavaScript"]
---
The Multiton pattern ensures that only a specific number of object instances exist for a given class. It's a constraint of the Singleton pattern. Instead of just one instance, we control the maximum number allowed. This is useful for resource management (e.g., database connections, thread pools) where creating too many instances can lead to performance issues or resource exhaustion.  The JavaScript implementation uses a `Map` to store instances, keyed by a "name" or identifier. The `getInstance` method checks if an instance with that name already exists; if it doesn’t and the instance count is below the maximum, it creates one and stores it.  Using a `Map` is a clean and efficient way to handle multiple, named instances in JavaScript.

```javascript
class Multiton {
  constructor(name) {
    if (Multiton.instances.has(name)) {
      return Multiton.instances.get(name);
    }

    if (Multiton.instanceCount >= Multiton.maxInstances) {
      throw new Error(`Maximum number of instances (${Multiton.maxInstances}) reached.`);
    }

    this.name = name;
    Multiton.instanceCount++;
    Multiton.instances.set(name, this);
  }

  static {
    Multiton.instances = new Map();
    Multiton.maxInstances = 3; // Define the maximum number of instances
    Multiton.instanceCount = 0;
  }

  getName() {
    return this.name;
  }
}

// Example Usage:
const instance1 = new Multiton("A");
const instance2 = new Multiton("B");
const instance3 = new Multiton("C");

console.log(instance1.getName()); // Output: A
console.log(instance2.getName()); // Output: B
console.log(instance3.getName()); // Output: C

try {
  const instance4 = new Multiton("D"); // This will throw an error
} catch (error) {
  console.error(error.message); // Output: Maximum number of instances (3) reached.
}

console.log(Multiton.instances.size); // Output: 3
```