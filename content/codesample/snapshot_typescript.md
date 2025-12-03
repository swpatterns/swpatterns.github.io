---
title: "Snapshot - TypeScript"
date: 2025-12-03T13:59:58.215-05:00
draft: false
pattern_usage: ["Snapshot"]
language: ["TypeScript"]
---
The Snapshot pattern captures and stores the complete state of an object at a specific point in time, allowing for rollback or comparison to previous states. This implementation uses a simple class to hold the object's data and a separate class to manage snapshots. Each snapshot stores a deep copy of the object's state.  TypeScript's strong typing and class structure lend themselves well to this pattern, ensuring type safety during state restoration. The use of a dedicated `SnapshotManager` promotes separation of concerns and provides a clear interface for snapshot operations.  Deep copying is achieved using `JSON.parse(JSON.stringify())` for simplicity, though more performant alternatives exist for complex objects.

```typescript
class DataObject {
  private data: { name: string; value: number };

  constructor(name: string, value: number) {
    this.data = { name, value };
  }

  getData() {
    return this.data;
  }

  setData(name: string, value: number) {
    this.data = { name, value };
  }
}

class Snapshot<T> {
  private state: T;

  constructor(state: T) {
    this.state = state;
  }

  getState(): T {
    return this.state;
  }
}

class SnapshotManager<T> {
  private snapshots: Snapshot<T>[] = [];
  private currentObject: T;

  constructor(object: T) {
    this.currentObject = object;
    this.takeSnapshot(); // Initial snapshot
  }

  takeSnapshot(): void {
    const state = JSON.parse(JSON.stringify(this.currentObject)); // Deep copy
    this.snapshots.push(new Snapshot(state));
  }

  rollback(): void {
    if (this.snapshots.length > 1) {
      this.snapshots.pop(); // Remove the latest snapshot
      const previousState = this.snapshots[this.snapshots.length - 1].getState();
      Object.assign(this.currentObject, previousState); // Restore state
    } else {
      console.warn("No previous snapshot to rollback to.");
    }
  }
}

// Example Usage:
const dataObject = new DataObject("Initial Name", 10);
const snapshotManager = new SnapshotManager(dataObject);

console.log("Initial State:", dataObject.getData()); // { name: 'Initial Name', value: 10 }

dataObject.setData("Updated Name", 20);
console.log("Updated State:", dataObject.getData()); // { name: 'Updated Name', value: 20 }

snapshotManager.takeSnapshot();

dataObject.setData("Further Updated", 30);
console.log("Further Updated State:", dataObject.getData()); // { name: 'Further Updated', value: 30 }

snapshotManager.rollback();
console.log("Rolled Back State:", dataObject.getData()); // { name: 'Updated Name', value: 20 }

snapshotManager.rollback();
console.log("Rolled Back to Initial State:", dataObject.getData()); // { name: 'Initial Name', value: 10 }
```