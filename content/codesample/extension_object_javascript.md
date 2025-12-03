---
title: "Extension Object - JavaScript"
date: 2025-12-03T12:52:30.307-05:00
draft: false
pattern_usage: ["Extension Object"]
language: ["JavaScript"]
---
The Extension Object pattern allows you to add new functionality to objects without modifying their original code. This is achieved by creating a separate object that contains the new methods, and then using techniques like `Object.assign` or spreading to merge the extension object's properties into the target object. This promotes modularity and avoids potential conflicts when extending core objects.

The JavaScript code below demonstrates this by extending a `Calculator` object with a `power` function via an `AdvancedCalculator` extension.  This approach is idiomatic JavaScript because it leverages the dynamic nature of objects and utilizes modern object manipulation techniques like `Object.assign` for clean and concise extension.  It avoids inheritance, which can be less flexible for adding optional features.

```javascript
// Core Calculator object
const Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
};

// Extension object for advanced features
const AdvancedCalculator = {
  power: (base, exponent) => Math.pow(base, exponent),
};

// Extend the Calculator object
const calculatorWithPower = Object.assign({}, Calculator, AdvancedCalculator);

// Usage
console.log(calculatorWithPower.add(5, 3)); // Output: 8
console.log(calculatorWithPower.power(2, 3)); // Output: 8

// Another example - extending a single instance
const myCalculator = {
  value: 10
};

const addValueExtension = {
  addValue: (amount) => {
    myCalculator.value += amount;
  },
  getValue: () => myCalculator.value
};

Object.assign(myCalculator, addValueExtension);
myCalculator.addValue(5);
console.log(myCalculator.getValue()); // Output: 15
```