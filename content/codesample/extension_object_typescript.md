---
title: "Extension Object - TypeScript"
date: 2025-12-03T12:52:44.832-05:00
draft: false
pattern_usage: ["Extension Object"]
language: ["TypeScript"]
---
The Extension Object pattern allows adding new functionality to an existing object without modifying its core code. This is achieved by creating a separate "extension" object that holds the new methods, and then composing the original object with the extension. This promotes the Open/Closed Principle – open for extension, closed for modification.

The TypeScript implementation uses object composition. The `extend` function takes the base object and one or more extension objects, returning a new object that inherits properties from all inputs.  This is idiomatic TypeScript as it leverages the language's flexible object model and avoids inheritance-based modification.  The use of object literals and the spread operator (`...`) for composition are standard TypeScript practices for creating new objects with combined properties.

```typescript
// Base object
const baseObject = {
  name: "Base",
  describe(): string {
    return `This is ${this.name}`;
  },
};

// Extension object 1
const extension1 = {
  version: "1.0",
  getDetails(): string {
    return `Version: ${this.version}`;
  },
};

// Extension object 2
const extension2 = {
  author: "John Doe",
  authorDetails(): string {
    return `Author: ${this.author}`;
  },
};

// Function to extend the object
function extend(base: any, ...extensions: any[]): any {
  return Object.assign({}, base, ...extensions);
}

// Extend the base object
const extendedObject = extend(baseObject, extension1, extension2);

// Use the extended object
console.log(extendedObject.describe()); // Output: This is Base
console.log(extendedObject.getDetails()); // Output: Version: 1.0
console.log(extendedObject.authorDetails()); // Output: Author: John Doe
console.log(extendedObject); // Output: { name: 'Base', describe: [Function: describe], version: '1.0', getDetails: [Function: getDetails], author: 'John Doe', authorDetails: [Function: authorDetails] }
```