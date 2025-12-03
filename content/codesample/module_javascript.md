---
title: "Module - JavaScript"
date: 2025-12-03T12:49:25.225-05:00
draft: false
pattern_usage: ["Module"]
language: ["JavaScript"]
---
The Module pattern encapsulates data and methods within a private scope, exposing only a public interface. This promotes data hiding, reduces global namespace pollution, and improves code organization.  The JavaScript implementation uses an Immediately Invoked Function Expression (IIFE) to create a closure. Variables declared within the IIFE are private, while explicitly returned objects define the public API. This approach is idiomatic JavaScript as it leverages closures, a core language feature, to achieve encapsulation without relying on class-based inheritance (though modules can be used *within* classes).  It's a flexible pattern, applicable in both older and modern JavaScript environments.

```javascript
// gist-module.js

const myModule = (function() {
  // Private variables and functions
  let privateCounter = 0;

  function privateFunction() {
    privateCounter++;
    console.log("Private function called. Counter:", privateCounter);
  }

  // Public API (returned object)
  return {
    publicMethod: function(message) {
      console.log("Public method says:", message);
      privateFunction(); // Accessing private function
    },
    getCounter: function() {
      return privateCounter;
    },
    initialValue: 42 // Public property
  };
})();

// Usage
myModule.publicMethod("Hello from the outside!");
console.log("Counter value:", myModule.getCounter());
console.log("Initial value:", myModule.initialValue);
// Attempting to access privateCounter directly will result in undefined.
```