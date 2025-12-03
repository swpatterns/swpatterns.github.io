---
title: "Composite - JavaScript"
date: 2025-12-03T11:34:38.520-05:00
draft: false
pattern_usage: ["Composite"]
language: ["JavaScript"]
---
The Composite pattern allows you to treat individual objects and compositions of objects uniformly. It's used when you have a hierarchical structure where you need to perform operations on both individual elements and groups of elements.  In this example, we model a file system where files and directories can both have a `size()` method. Directories contain other files/directories, representing the composite structure. The code uses JavaScript classes to define the component (File and Directory) and the composition (Directory). The consistent interface (`size()`) enables treating both files and directories interchangeably.

```javascript
// Component interface
class FileSystemNode {
  constructor(name) {
    this.name = name;
  }

  size() {
    throw new Error("Method 'size()' must be implemented.");
  }
}

// Leaf node
class File extends FileSystemNode {
  constructor(name, fileSize) {
    super(name);
    this.fileSize = fileSize;
  }

  size() {
    return this.fileSize;
  }
}

// Composite node
class Directory extends FileSystemNode {
  constructor(name) {
    super(name);
    this.children = [];
  }

  add(node) {
    this.children.push(node);
  }

  size() {
    let totalSize = 0;
    for (const child of this.children) {
      totalSize += child.size();
    }
    return totalSize;
  }
}

// Example Usage
const root = new Directory("root");
const dir1 = new Directory("dir1");
const file1 = new File("file1.txt", 10);
const file2 = new File("file2.jpg", 100);

dir1.add(file1);
dir1.add(file2);
root.add(dir1);
root.add(new File("file3.pdf", 50));

console.log("Total size:", root.size()); // Output: Total size: 160
```