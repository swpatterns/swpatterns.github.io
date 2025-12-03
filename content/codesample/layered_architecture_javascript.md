---
title: "Layered Architecture - JavaScript"
date: 2025-12-03T14:03:41.125-05:00
draft: false
pattern_usage: ["Layered Architecture"]
language: ["JavaScript"]
---
The Layered Architecture pattern organizes an application into distinct layers, each performing a specific role. This promotes separation of concerns, making the application more maintainable and testable. Common layers include Presentation (UI), Business Logic, and Data Access.  Our JavaScript example demonstrates this by separating concerns into modules: `ui.js` handles user interaction, `businessLogic.js` contains the core application rules, and `dataAccess.js` manages data persistence (simulated here with a simple array).  This modular approach is idiomatic JavaScript, leveraging ES modules for clear dependencies and organization, and avoiding global scope pollution.

```javascript
// dataAccess.js
let data = [];

export function getData() {
  return [...data]; // Return a copy to prevent direct modification
}

export function saveData(item) {
  data.push(item);
}

// businessLogic.js
import { getData, saveData } from './dataAccess.js';

export function processData(newItem) {
  // Example business rule:  Only save if the item is not empty
  if (newItem.trim() !== "") {
    saveData(newItem);
    return true;
  }
  return false;
}

export function getProcessedData() {
  return getData().map(item => item.toUpperCase());
}

// ui.js
import { processData, getProcessedData } from './businessLogic.js';

const inputElement = document.getElementById('dataInput');
const addButton = document.getElementById('addButton');
const outputElement = document.getElementById('dataOutput');

addButton.addEventListener('click', () => {
  const inputValue = inputElement.value;
  if (processData(inputValue)) {
    outputElement.textContent = getProcessedData().join(', ');
    inputElement.value = '';
  } else {
    outputElement.textContent = "Input cannot be empty.";
  }
});
```