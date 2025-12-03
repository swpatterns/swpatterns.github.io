---
title: "Lazy Initialization - TypeScript"
date: 2025-12-03T11:16:30.880-05:00
draft: false
pattern_usage: ["Lazy Initialization"]
language: ["TypeScript"]
---
The Lazy Initialization pattern delays the creation of an expensive object until it is actually needed. This improves startup performance because resources aren't allocated unnecessarily.  The provided TypeScript code uses a simple closure to encapsulate the initialization logic. The `getInstance` function checks if `instance` has already been created; if not, it performs the initialization (simulated by a delay and console log) and stores the result in the `instance` variable for subsequent calls. This approach is common in TypeScript for managing singleton-like behavior and optimizing resource usage, and utilizes its support for closures effectively.

```typescript
// LazyInitialization.ts

class ExpensiveObject {
  constructor() {
    console.log("ExpensiveObject created!");
    // Simulate a costly operation
    for (let i = 0; i < 1000000; i++) {
      // Some dummy operation
    }
    console.log("ExpensiveObject initialized.");
  }

  doSomething() {
    console.log("Doing something with ExpensiveObject...");
  }
}

let instance: ExpensiveObject | null = null;

function getInstance(): ExpensiveObject {
  if (!instance) {
    instance = new ExpensiveObject();
  }
  return instance;
}

// Example Usage
// First call - initializes the object
const obj1 = getInstance();
obj1.doSomething();

// Subsequent calls - return the existing instance
const obj2 = getInstance();
obj2.doSomething();

console.log(obj1 === obj2); // true - same instance
```