---
title: "Singleton - TypeScript"
date: 2025-12-03T11:05:26.857-05:00
draft: false
pattern_usage: ["Singleton"]
language: ["TypeScript"]
---
The Singleton pattern ensures a class has only one instance and provides a global point of access to it. This is useful for managing resources like database connections or configuration settings where only one instance should exist throughout the application. The TypeScript implementation uses a static `instance` property within the class to hold the single instance. The first time the `getInstance` method is called, it creates the instance; subsequent calls return the existing one. This approach leverages TypeScript's class structure and static members for a type-safe and controlled instantiation.

```typescript
// singleton.ts
class Singleton {
  private static instance: Singleton | null = null;

  private constructor(public data: string) {} // Private constructor

  public static getInstance(data: string): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton(data);
    }
    return Singleton.instance;
  }

  public getData(): string {
    return this.data;
  }
}

// Example usage:
const instance1 = Singleton.getInstance("Initial Data");
const instance2 = Singleton.getInstance("Different Data"); // Ignored, instance already exists

console.log(instance1.getData());
console.log(instance1 === instance2); // true
```