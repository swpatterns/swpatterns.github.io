---
title: "Pipes and Filters - TypeScript"
date: 2025-12-03T15:20:02.138-05:00
draft: false
pattern_usage: ["Pipes and Filters"]
language: ["TypeScript"]
---
The Pipes and Filters pattern structures a program as a sequence of processing stages (filters), each performing a distinct operation on the input data.  Data flows through this "pipeline," with each filter receiving input from the previous one and passing its output to the next.  This promotes modularity, reusability, and simplifies complex processing logic.

This TypeScript example uses a simple string transformation pipeline: to uppercase, trim whitespace, and then replace commas with periods. Each step is a separate filter function that takes a string and returns a string. The `pipe` function composes these filters, applying them sequentially to the initial input.  This approach leverages TypeScript's strong typing and functional programming capabilities for a clean and easily maintainable solution.  Using functions as “filters” is very common in TypeScript, particularly with array methods like `map`, `filter`, and `reduce`, making this style highly idiomatic.

```typescript
// Define filter functions
const toUpperCaseFilter = (input: string): string => input.toUpperCase();
const trimWhitespaceFilter = (input: string): string => input.trim();
const replaceCommasFilter = (input: string): string => input.replace(/,/g, ".");

// Pipe function to compose filters
const pipe = <T>(initialValue: T, ...filters: ((input: T) => T)[]): T => {
  return filters.reduce((value, filter) => filter(value), initialValue);
};

// Example usage
const originalString = " hello, world ";
const transformedString = pipe(originalString, toUpperCaseFilter, trimWhitespaceFilter, replaceCommasFilter);

console.log(`Original: "${originalString}"`);
console.log(`Transformed: "${transformedString}"`);
```