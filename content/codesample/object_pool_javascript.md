---
title: "Object Pool - JavaScript"
date: 2025-12-03T11:12:16.123-05:00
draft: false
pattern_usage: ["Object Pool"]
language: ["JavaScript"]
---
The Object Pool pattern reduces the overhead of frequently creating and destroying objects. Instead of allocating new objects each time, it reuses pre-initialized objects from a pool. This is particularly useful for expensive-to-create objects.

The code implements a simple Object Pool for a `ReusableObject` class. The `Pool` class manages a collection of these objects. `acquire()` retrieves an object from the pool (creating one if none are available), and `release()` returns an object to the pool for reuse.  The use of a simple array for storage and methods like `pop()` and `push()` are idiomatic JavaScript for managing a collection in this way.  The `constructor` initializes the pool with a specified number of objects.



```javascript
class ReusableObject {
  constructor(data) {
    this.data = data;
    this.isUsed = false;
    // Simulate expensive initialization
    for (let i = 0; i < 1000000; i++) {
      Math.sqrt(i);
    }
  }

  reset() {
    this.data = null;
    this.isUsed = false;
  }

  use() {
    this.isUsed = true;
    console.log("Object used with data:", this.data);
  }
}

class Pool {
  constructor(size) {
    this.pool = [];
    this.size = size;

    for (let i = 0; i < size; i++) {
      this.pool.push(new ReusableObject(null));
    }
  }

  acquire() {
    if (this.pool.length > 0) {
      const obj = this.pool.pop();
      obj.use(); // Indicate object is in use
      return obj;
    }

    // Create a new object if the pool is empty
    return new ReusableObject(null);
  }

  release(obj) {
    obj.reset();
    this.pool.push(obj);
  }
}

// Example Usage:
const pool = new Pool(5);

let obj1 = pool.acquire();
obj1.data = "Data 1";

let obj2 = pool.acquire();
obj2.data = "Data 2";

pool.release(obj1);
pool.release(obj2);

let obj3 = pool.acquire(); // Might reuse obj1 or obj2
obj3.data = "Data 3";
```