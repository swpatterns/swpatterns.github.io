---
title: "Multiton - TypeScript"
date: 2025-12-03T11:08:41.651-05:00
draft: false
pattern_usage: ["Multiton"]
language: ["TypeScript"]
---
The Multiton pattern ensures that only a limited number of instances of a class can exist. It's a variation of the Singleton pattern, but instead of a strictly single instance, it allows for a predefined number of instances – “multitons”. This is useful when you need a few dedicated, shared objects with distinct roles, and you want to control their creation to avoid accidental proliferation.

The TypeScript implementation uses a static `instanceMap` to store the available multitons, keyed by a unique identifier. A static `getInstance` method retrieves an existing instance or creates a new one if the instance count is below the maximum allowed, and if a valid key is provided.  This leverages TypeScript’s static typing and class structure to maintain type safety and encapsulates instance management within the class itself, adhering to modern TypeScript conventions for controlled instantiation.

```typescript
/**
 * The Multiton pattern ensures a limited number of instances.
 */
class Multiton {
  private static instanceMap: { [key: string]: Multiton } = {};
  private static maxInstances = 3;
  private key: string;

  private constructor(key: string) {
    this.key = key;
  }

  static getInstance(key: string): Multiton {
    if (!Multiton.instanceMap[key]) {
      if (Object.keys(Multiton.instanceMap).length < Multiton.maxInstances) {
        Multiton.instanceMap[key] = new Multiton(key);
        console.log(`Created instance with key: ${key}`);
      } else {
        throw new Error(`Maximum number of Multiton instances reached (${Multiton.maxInstances}).`);
      }
    }
    return Multiton.instanceMap[key];
  }

  public getKey(): string {
    return this.key;
  }
}

// Example Usage:
const instance1 = Multiton.getInstance('A');
const instance2 = Multiton.getInstance('B');
const instance3 = Multiton.getInstance('C');

console.log(instance1.getKey()); // Output: A
console.log(instance2.getKey()); // Output: B
console.log(instance3.getKey()); // Output: C

try {
  const instance4 = Multiton.getInstance('D');
} catch (error) {
  console.error(error.message); // Output: Maximum number of Multiton instances reached (3).
}
```