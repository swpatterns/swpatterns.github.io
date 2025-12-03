---
title: "Pipes and Filters - JavaScript"
date: 2025-12-03T15:19:49.231-05:00
draft: false
pattern_usage: ["Pipes and Filters"]
language: ["JavaScript"]
---
The Pipes and Filters pattern structures an application as a series of processing elements (filters) connected by channels (pipes) through which data flows. Each filter performs a specific, self-contained transformation on the data. This promotes modularity, reusability, and ease of maintenance as filters can be added, removed, or reordered without impacting other parts of the system.  My JavaScript implementation uses a functional approach with array methods (`map`, `filter`, `reduce`) acting as the filters and array immutability simulating the pipes. This aligns well with JavaScript's functional capabilities and promotes a clean, declarative style, avoiding mutable state.

```javascript
// Filter: Uppercase Filter
const uppercaseFilter = (input) => input.toUpperCase();

// Filter: Remove Whitespace Filter
const removeWhitespaceFilter = (input) => input.trim();

// Filter: Split into words Filter
const splitIntoWordsFilter = (input) => input.split(' ');

// Filter: Filter words longer than 3 characters
const longWordFilter = (words) => words.filter(word => word.length > 3);

// Pipe (Chain) function
const pipe = (data, ...filters) => filters.reduce((result, filter) => filter(result), data);

// Example Usage
const rawData = '   hello world this is a test   ';

const processedData = pipe(rawData,
  removeWhitespaceFilter,
  uppercaseFilter,
  splitIntoWordsFilter,
  longWordFilter
);

console.log(processedData); // Output: ["HELLO", "WORLD", "THIS", "TEST"]
```