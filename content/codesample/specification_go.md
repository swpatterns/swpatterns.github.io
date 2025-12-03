---
title: "Specification - Go"
date: 2025-12-03T13:52:10.720-05:00
draft: false
pattern_usage: ["Specification"]
language: ["Go"]
---
The Specification pattern is a functional design pattern that encapsulates a business rule or condition into an object. This allows for easy composition of complex rules by combining simpler specifications using logical operators (AND, OR, NOT). The code defines a `Specification` type with a `Satisfies` method. Concrete specifications implement this interface to define specific criteria. The example demonstrates checking if a number is positive, even, and within a range, combining these with `And`, `Or`, and `Not` functions. This approach is idiomatic Go as it leverages interfaces for flexible behavior and utilizes function composition, a common functional programming technique, to build complex logic in a readable and maintainable way.

```go
package main

import "fmt"

// Specification interface defines the contract for checking a condition.
type Specification interface {
	Satisfies(value int) bool
}

// IsPositive checks if a number is positive.
type IsPositive struct{}

func (s IsPositive) Satisfies(value int) bool {
	return value > 0
}

// IsEven checks if a number is even.
type IsEven struct{}

func (s IsEven) Satisfies(value int) bool {
	return value%2 == 0
}

// InRange checks if a number is within a specified range.
type InRange struct {
	Low  int
	High int
}

func (s InRange) Satisfies(value int) bool {
	return value >= s.Low && value <= s.High
}

// And combines two specifications with a logical AND.
func And(spec1, spec2 Specification) Specification {
	return &AndSpec{spec1, spec2}
}

type AndSpec struct {
	spec1 Specification
	spec2 Specification
}

func (s *AndSpec) Satisfies(value int) bool {
	return s.spec1.Satisfies(value) && s.spec2.Satisfies(value)
}

// Or combines two specifications with a logical OR.
func Or(spec1, spec2 Specification) Specification {
	return &OrSpec{spec1, spec2}
}

type OrSpec struct {
	spec1 Specification
	spec2 Specification
}

func (s *OrSpec) Satisfies(value int) bool {
	return s.spec1.Satisfies(value) || s.spec2.Satisfies(value)
}

// Not negates a specification.
func Not(spec Specification) Specification {
	return &NotSpec{spec}
}

type NotSpec struct {
	spec Specification
}

func (s *NotSpec) Satisfies(value int) bool {
	return !s.spec.Satisfies(value)
}

func main() {
	positiveAndEven := And(IsPositive{}, IsEven{})
	inRange1to10 := InRange{Low: 1, High: 10}
	positiveAndEvenInRange := And(positiveAndEven, inRange1to10)

	fmt.Println(positiveAndEvenInRange.Satisfies(4))   // true
	fmt.Println(positiveAndEvenInRange.Satisfies(5))   // false
	fmt.Println(positiveAndEvenInRange.Satisfies(-2))  // false
	fmt.Println(Not(IsPositive{}).Satisfies(-1)) // true
}
```