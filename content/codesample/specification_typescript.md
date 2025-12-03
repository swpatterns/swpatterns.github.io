---
title: "Specification - TypeScript"
date: 2025-12-03T13:50:45.082-05:00
draft: false
pattern_usage: ["Specification"]
language: ["TypeScript"]
---
The Specification pattern is a functional approach to encapsulating business logic and rules. It allows you to define a boolean predicate (a "specification") as a first-class object, which can then be reused and combined with other specifications using logical operators (AND, OR, NOT). This promotes code reusability, testability, and separation of concerns by keeping filtering and validation logic separate from the data it operates on.

The TypeScript implementation defines a `Specification` interface with a `isSatisfiedBy` method. Concrete specifications implement this interface to define specific criteria.  The code demonstrates combining specifications using `and`, `or`, and `not` to create more complex rules.  Using interfaces and functional composition aligns well with TypeScript's type system and encourages immutable data handling, making the code cleaner and easier to reason about.

```typescript
// Specification Interface
interface Specification<T> {
  isSatisfiedBy(item: T): boolean;
  and(other: Specification<T>): Specification<T>;
  or(other: Specification<T>): Specification<T>;
  not(): Specification<T>;
}

// Concrete Specification: IsEven
class IsEven implements Specification<number> {
  isSatisfiedBy(item: number): boolean {
    return item % 2 === 0;
  }

  and(other: Specification<number>): Specification<number> {
    return new AndSpecification(this, other);
  }

  or(other: Specification<number>): Specification<number> {
    return new OrSpecification(this, other);
  }

  not(): Specification<number> {
    return new NotSpecification(this);
  }
}

// Concrete Specification: IsPositive
class IsPositive implements Specification<number> {
  isSatisfiedBy(item: number): boolean {
    return item > 0;
  }

  and(other: Specification<number>): Specification<number> {
    return new AndSpecification(this, other);
  }

  or(other: Specification<number>): Specification<number> {
    return new OrSpecification(this, other);
  }

  not(): Specification<number> {
    return new NotSpecification(this);
  }
}

// Composite Specifications
class AndSpecification<T> implements Specification<T> {
  constructor(private spec1: Specification<T>, private spec2: Specification<T>) {}

  isSatisfiedBy(item: T): boolean {
    return this.spec1.isSatisfiedBy(item) && this.spec2.isSatisfiedBy(item);
  }

  and(other: Specification<T>): Specification<T> {
    return new AndSpecification(this, other);
  }

  or(other: Specification<T>): Specification<T> {
    return new OrSpecification(this, other);
  }

  not(): Specification<T> {
    return new NotSpecification(this);
  }
}

class OrSpecification<T> implements Specification<T> {
  constructor(private spec1: Specification<T>, private spec2: Specification<T>) {}

  isSatisfiedBy(item: T): boolean {
    return this.spec1.isSatisfiedBy(item) || this.spec2.isSatisfiedBy(item);
  }

  and(other: Specification<T>): Specification<T> {
    return new AndSpecification(this, other);
  }

  or(other: Specification<T>): Specification<T> {
    return new OrSpecification(this, other);
  }

  not(): Specification<T> {
    return new NotSpecification(this);
  }
}

class NotSpecification<T> implements Specification<T> {
  constructor(private spec: Specification<T>) {}

  isSatisfiedBy(item: T): boolean {
    return !this.spec.isSatisfiedBy(item);
  }

  and(other: Specification<T>): Specification<T> {
    return new AndSpecification(this, other);
  }

  or(other: Specification<T>): Specification<T> {
    return new OrSpecification(this, other);
  }

  not(): Specification<T> {
    return new NotSpecification(this.spec);
  }
}

// Example Usage
const evenAndPositive = new IsEven().and(new IsPositive());
console.log(evenAndPositive.isSatisfiedBy(4));   // true
console.log(evenAndPositive.isSatisfiedBy(2));   // true
console.log(evenAndPositive.isSatisfiedBy(-2));  // false
console.log(evenAndPositive.isSatisfiedBy(3));   // false

const evenOrPositive = new IsEven().or(new IsPositive());
console.log(evenOrPositive.isSatisfiedBy(4));   // true
console.log(evenOrPositive.isSatisfiedBy(3));   // true
console.log(evenOrPositive.isSatisfiedBy(-2));  // false
console.log(evenOrPositive.isSatisfiedBy(-1));  // false

const notEven = new IsEven().not();
console.log(notEven.isSatisfiedBy(3)); // true
console.log(notEven.isSatisfiedBy(4)); // false
```