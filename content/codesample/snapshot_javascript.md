---
title: "Snapshot - JavaScript"
date: 2025-12-03T13:59:37.406-05:00
draft: false
pattern_usage: ["Snapshot"]
language: ["JavaScript"]
---
The Snapshot pattern captures and restores the state of an object at a specific point in time. This allows reverting to previous states, implementing undo/redo functionality, or creating backups. The JavaScript implementation uses a simple object cloning approach to create snapshots. Each snapshot stores a copy of the object's properties. The `Snapshot` class manages the snapshots, providing methods to save the current state and restore to a specific snapshot. This approach leverages JavaScript's object mutability and the spread syntax for concise cloning, fitting the language's flexible nature.

```javascript
class Snapshot {
  constructor(obj) {
    this.snapshots = [];
    this.current = this.save(obj);
  }

  save(obj) {
    const snapshot = { ...obj }; // Shallow copy using spread syntax
    this.snapshots.push(snapshot);
    return snapshot;
  }

  restore(index) {
    if (index >= 0 && index < this.snapshots.length) {
      this.current = this.snapshots[index];
    }
  }

  getCurrent() {
    return this.current;
  }
}

// Example Usage:
const myObject = { a: 1, b: "hello", c: { d: 2 } };
const snapshotManager = new Snapshot(myObject);

// Modify the object
myObject.a = 10;
myObject.b = "world";
myObject.c.d = 20;

// Save a snapshot after modification
snapshotManager.save(myObject);

// Restore to the first snapshot (original state)
snapshotManager.restore(0);

console.log(snapshotManager.getCurrent()); // Output: { a: 1, b: "hello", c: { d: 2 } }

// Restore to the second snapshot (modified state)
snapshotManager.restore(1);

console.log(snapshotManager.getCurrent()); // Output: { a: 10, b: "world", c: { d: 20 } }
```