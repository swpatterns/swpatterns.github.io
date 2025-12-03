---
title: "Composite - TypeScript"
date: 2025-12-03T11:34:54.195-05:00
draft: false
pattern_usage: ["Composite"]
language: ["TypeScript"]
---
The Composite pattern allows you to treat individual objects and compositions of objects uniformly. It represents whole-part relationships, where you can build complex structures from simpler ones. In this TypeScript example, we have a `Component` interface representing the base for both individual and composite elements. `Leaf` represents individual elements (e.g., a file), and `CompositeFolder` represents a folder that can contain other components (files or folders).  The `operation()` method is defined in the `Component` and implemented by both `Leaf` and `CompositeFolder`, enabling consistent interaction with the entire structure. Using interfaces and classes is very idiomatic TypeScript, promoting strong typing and maintainability.

```typescript
// Component interface
interface Component {
  name: string;
  operation(): void;
}

// Leaf class (individual object)
class File implements Component {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  operation(): void {
    console.log(`Opening file: ${this.name}`);
  }
}

// Composite class (composition of objects)
class CompositeFolder implements Component {
  name: string;
  children: Component[];

  constructor(name: string) {
    this.name = name;
    this.children = [];
  }

  add(component: Component): void {
    this.children.push(component);
  }

  remove(component: Component): void {
    this.children = this.children.filter(child => child !== component);
  }

  operation(): void {
    console.log(`Opening folder: ${this.name}`);
    for (const child of this.children) {
      child.operation();
    }
  }
}

// Example Usage:
const rootFolder = new CompositeFolder("Root");
const folder1 = new CompositeFolder("Folder 1");
const file1 = new File("File 1.txt");
const file2 = new File("File 2.jpg");

folder1.add(file1);
folder1.add(file2);
rootFolder.add(folder1);
rootFolder.add(new File("File 3.pdf"));

rootFolder.operation();
```