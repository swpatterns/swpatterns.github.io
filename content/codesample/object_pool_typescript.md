---
title: "Object Pool - TypeScript"
date: 2025-12-03T11:12:32.844-05:00
draft: false
pattern_usage: ["Object Pool"]
language: ["TypeScript"]
---
The Object Pool pattern manages a collection of reusable objects, reducing the overhead of frequent object creation and destruction. Instead of allocating a new object each time one is needed, the pool provides an existing, pre-initialized object. When the object is no longer required, it's returned to the pool, not discarded. This improves performance, especially for expensive-to-create objects.

The TypeScript implementation uses a generic class `ObjectPool` to manage objects of any type. `borrowObject` retrieves an object from the pool (creating one if none are available), and `returnObject` adds it back.  The `resetState` method is crucial for ensuring borrowed objects are in a known, clean state.  Using a class and generics is idiomatic TypeScript, promoting type safety and reusability.  The pool uses a simple array for storage, suitable for many use cases, and can be easily adapted to use more sophisticated data structures if needed.

```typescript
class ObjectPool<T> {
  private pool: T[] = [];
  private factory: () => T;
  private resetState: (obj: T) => void;

  constructor(factory: () => T, resetState: (obj: T) => void) {
    this.factory = factory;
    this.resetState = resetState;
  }

  borrowObject(): T {
    if (this.pool.length > 0) {
      return this.pool.pop()!;
    } else {
      return this.factory();
    }
  }

  returnObject(obj: T): void {
    this.resetState(obj);
    this.pool.push(obj);
  }
}

// Example Usage:

interface Vector2 {
  x: number;
  y: number;
}

const vectorFactory = () => ({ x: 0, y: 0 });
const vectorReset = (vector: Vector2) => {
  vector.x = 0;
  vector.y = 0;
};

const pool = new ObjectPool<Vector2>(vectorFactory, vectorReset);

const vec1 = pool.borrowObject();
vec1.x = 10;
vec1.y = 20;
console.log("Borrowed vec1:", vec1);

pool.returnObject(vec1);

const vec2 = pool.borrowObject();
console.log("Borrowed vec2 (potentially recycled vec1):", vec2);
```