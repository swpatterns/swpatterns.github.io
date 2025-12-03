---
title: "Flyweight - JavaScript"
date: 2025-12-03T11:46:32.503-05:00
draft: false
pattern_usage: ["Flyweight"]
language: ["JavaScript"]
---
The Flyweight pattern aims to minimize memory usage by sharing as much data as possible between similar objects. It achieves this by separating an object's intrinsic (shared) state from its extrinsic (unique) state.  Intrinsic state is stored in the Flyweight object, while extrinsic state is passed as arguments when the Flyweight is used.

This example demonstrates the Flyweight pattern with a simple `Tree` scenario. `Tree` objects can have different types (e.g., 'Oak', 'Pine'), which is intrinsic state, and positions, which are extrinsic.  The `TreeFactory` manages the shared `Tree` instances, creating them only if they don't already exist.  When a tree is rendered, its position is passed as an argument to the `draw` method. This approach avoids creating numerous identical `Tree` objects, saving memory, especially when dealing with a large forest. The use of a factory and a simple object literal for the tree type aligns with common JavaScript practices.

```javascript
// Tree Flyweight
class Tree {
  constructor(type) {
    this.type = type;
  }

  draw(x, y) {
    console.log(`Drawing a ${this.type} tree at (${x}, ${y})`);
  }
}

// Tree Factory
class TreeFactory {
  constructor() {
    this.trees = {};
  }

  getTree(type) {
    if (!this.trees[type]) {
      this.trees[type] = new Tree(type);
    }
    return this.trees[type];
  }
}

// Usage
const factory = new TreeFactory();

const forest = [
  { x: 10, y: 20, type: 'Oak' },
  { x: 15, y: 25, type: 'Pine' },
  { x: 12, y: 18, type: 'Oak' },
  { x: 20, y: 30, type: 'Pine' },
  { x: 8, y: 15, type: 'Oak' },
];

forest.forEach(treeData => {
  const tree = factory.getTree(treeData.type);
  tree.draw(treeData.x, treeData.y);
});
```