---
title: "Specification - JavaScript"
date: 2025-12-03T13:50:15.845-05:00
draft: false
pattern_usage: ["Specification"]
language: ["JavaScript"]
---
The Specification pattern is a functional technique for encapsulating business logic into reusable, composable objects. Instead of embedding conditions directly within code, it defines a `Specification` object that represents a declarative criteria. This allows for dynamic querying and validation, and simplifies complex conditional logic.

The code defines a base `Specification` class with a `isSatisfiedBy` method. Concrete specifications (e.g., `IsEven`, `GreaterThan`) inherit from this base and implement the criteria.  Specifications can be combined using `and`, `or`, and `not` to create more complex rules. This approach is idiomatic JavaScript due to its reliance on object composition and first-class functions, promoting a more declarative and testable style.

```javascript
// Specification.js
class Specification {
  constructor(callback) {
    this.callback = callback;
  }

  isSatisfiedBy(candidate) {
    return this.callback(candidate);
  }

  and(other) {
    return new Specification(candidate => this.isSatisfiedBy(candidate) && other.isSatisfiedBy(candidate));
  }

  or(other) {
    return new Specification(candidate => this.isSatisfiedBy(candidate) || other.isSatisfiedBy(candidate));
  }

  not() {
    return new Specification(candidate => !this.isSatisfiedBy(candidate));
  }
}

class IsEven extends Specification {
  constructor() {
    super(x => x % 2 === 0);
  }
}

class GreaterThan extends Specification {
  constructor(threshold) {
    super(x => x > threshold);
  }
}

// Example Usage:
const isEven = new IsEven();
const greaterThanTen = new GreaterThan(10);

const combinedSpec = isEven.and(greaterThanTen);

console.log(combinedSpec.isSatisfiedBy(12)); // true
console.log(combinedSpec.isSatisfiedBy(11)); // false
console.log(combinedSpec.isSatisfiedBy(8));  // false

const notEven = isEven.not();
console.log(notEven.isSatisfiedBy(7)); // true
console.log(notEven.isSatisfiedBy(4)); // false
```