---
title: "Space-Based Architecture - JavaScript"
date: 2025-12-03T14:56:41.696-05:00
draft: false
pattern_usage: ["Space-Based Architecture"]
language: ["JavaScript"]
---
The Space-Based Architecture pattern organizes code into independent "spaces" (often modules or namespaces) that communicate via well-defined interfaces. This promotes modularity, reduces coupling, and allows for easier testing and maintenance. Each space encapsulates specific functionality and data, exposing only what's necessary for interaction.

This JavaScript example uses ES modules to create two spaces: `calculator` and `display`. The `calculator` space handles the core calculation logic, while the `display` space focuses on presenting the results.  They interact through exported functions and imported dependencies. This approach is idiomatic JavaScript because modules are the standard way to achieve encapsulation and manage dependencies in modern JavaScript. The separation of concerns and explicit interface definitions align with JavaScript's flexible, yet maintainable, design principles.

```javascript
// calculator.js
let result = 0;

export function add(num) {
  result += num;
  return result;
}

export function subtract(num) {
  result -= num;
  return result;
}

export function getResult() {
  return result;
}

// display.js
import { add, subtract, getResult } from './calculator.js';

export function updateDisplay() {
  const displayElement = document.getElementById('display');
  if (displayElement) {
    displayElement.textContent = getResult();
  } else {
    console.log("Display element not found.");
  }
}

export function handleOperation(operation, number) {
  if (operation === 'add') {
    add(number);
  } else if (operation === 'subtract') {
    subtract(number);
  }
  updateDisplay();
}

// main.js
import { handleOperation } from './display.js';

document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('addButton');
  const subtractButton = document.getElementById('subtractButton');

  if (addButton) {
    addButton.addEventListener('click', () => handleOperation('add', 5));
  }
  if (subtractButton) {
    subtractButton.addEventListener('click', () => handleOperation('subtract', 3));
  }
});

// index.html (minimal example for running)
// <!DOCTYPE html>
// <html>
// <head>
//   <title>Space-Based Architecture Example</title>
// </head>
// <body>
//   <button id="addButton">Add 5</button>
//   <button id="subtractButton">Subtract 3</button>
//   <div id="display">0</div>
//   <script type="module" src="main.js"></script>
// </body>
// </html>
```