
---
title: "Callback"
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "concurrency"]
wikipedia: "https://en.wikipedia.org/wiki/Callback_(computer_programming)"
diagramtype: "sequence"
diagram: "[Client] -> [System: register callback(Callback)]\nactivate [System]\n[System] --> [Client]\n[System] -> [Event Loop]: wait for event\nactivate [Event Loop]\n[Event Loop] -> [System]: event occurred\nactivate [System]\n[System] -> [Callback]: execute()\nactivate [Callback]\n[Callback] --> [System]\ndeactivate [Callback]\ndeactivate [System]\ndeactivate [Event Loop]"
code: true
---

The Callback pattern is a behavioral design pattern where a function (the callback) is passed as an argument to another function, to be executed at a later point in time. It's a core concept in event-driven programming and asynchronous operations, allowing components to react to events or the completion of tasks without needing to know the specifics of when or how those events occur.  This promotes loose coupling and flexibility in software design.

Callbacks are used extensively in scenarios involving user interface events, network requests, timers, and background processing. They enable systems to respond to user actions (like button clicks), handle data received over a network (like a server response), or execute code after a specified delay.  They are particularly valuable in environments where blocking operations are undesirable, such as single-threaded applications or responsive UI development.

## Usage

*   **Event Handling:** In GUI frameworks, callbacks are triggered in response to user interactions (clicks, key presses).
*   **Asynchronous Operations:** Completing network requests, file I/O, or database queries without blocking the main thread.
*   **Observer Pattern Implementation:**  Callbacks can form the core mechanism for notifying observers of state changes.
*   **Sorting and Filtering:** Providing custom comparison functions to sorting algorithms or filtering predicates.

## Examples

1.  **JavaScript Event Listeners:** The `addEventListener` method in JavaScript uses callbacks. You provide a function that will be called when a specific event (e.g., "click") occurs on a particular element.

    javascript
    const button = document.getElementById('myButton');
    button.addEventListener('click', function() {
      alert('Button was clicked!'); // This is the callback function
    });
    

2.  **Node.js File System:** Node.js's `fs` module frequently employs callbacks for asynchronous file operations.  For example, when reading a file, a callback function handles the data once it’s available or an error occurs.

    javascript
    const fs = require('fs');
    fs.readFile('/path/to/my/file.txt', 'utf8', function(err, data) {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }
      console.log("File contents:", data); // This is the callback function
    });
    