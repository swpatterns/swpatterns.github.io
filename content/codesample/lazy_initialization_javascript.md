---
title: "Lazy Initialization - JavaScript"
date: 2025-12-03T11:16:18.694-05:00
draft: false
pattern_usage: ["Lazy Initialization"]
language: ["JavaScript"]
---
The Lazy Initialization pattern delays the creation of an object or the execution of a computation until it's actually needed. This can improve performance, especially if the object is expensive to create or the computation is rarely used. In JavaScript, this is often achieved using closures and functions that return the initialized value upon first access.

This implementation uses a function that returns another function. The inner function encapsulates the expensive operation (creating the object). The first time the returned function is called, it performs the initialization and stores the result in a closure variable. Subsequent calls simply return the cached result, avoiding redundant computations.  This approach is idiomatic JavaScript because it leverages first-class functions and closures – core features of the language – to manage state and control execution.

```javascript
/**
 * Implements the Lazy Initialization pattern.
 *
 * Returns a function that, when called, will create and cache
 * the result of an expensive operation. Subsequent calls return
 * the cached result.
 *
 * @param {Function} factory - The function that performs the expensive initialization.
 * @returns {Function} - A function that returns the initialized value.
 */
function lazyInitialize(factory) {
  let initializedValue;

  return function() {
    if (initializedValue === undefined) {
      console.log("Initializing...");
      initializedValue = factory();
    }
    return initializedValue;
  };
}

// Example Usage:

// Simulate an expensive operation
function createExpensiveObject() {
  // Perform some time-consuming task
  let sum = 0;
  for (let i = 0; i < 1000000000; i++) {
    sum += i;
  }
  return { value: sum };
}

const expensiveObjectGetter = lazyInitialize(createExpensiveObject);

// Initialization is delayed until the first access
console.log("First access:");
const obj1 = expensiveObjectGetter();
console.log(obj1.value);

console.log("Second access:");
const obj2 = expensiveObjectGetter(); // Returns the cached object instantly
console.log(obj2.value);
```