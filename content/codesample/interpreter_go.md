---
title: "Interpreter - Go"
date: 2025-12-03T13:07:24.512-05:00
draft: false
pattern_usage: ["Interpreter"]
language: ["Go"]
---
The Interpreter pattern defines a way to evaluate a language given its grammar. This is achieved by creating a class for each part of the grammar, allowing you to form a parse tree and then "walk" the tree to interpret the expression. In Go, this is commonly implemented using interfaces to define the expression and context, then concrete structs for specific terminals and non-terminals.  This makes the code extensible; new expressions can be added easily by implementing the expression interface.  This implementation focuses on a simple arithmetic expression interpreter supporting addition and integer literals.

```go
package main

import "fmt"

// Expression interface defines the evaluate method.
type Expression interface {
	Evaluate(context map[string]int) int
}

// IntegerLiteral represents an integer terminal in the language.
type IntegerLiteral struct {
	Value int
}

func (i *IntegerLiteral) Evaluate(context map[string]int) int {
	return i.Value
}

// AdditionExpression represents the addition of two expressions.
type AdditionExpression struct {
	Left  Expression
	Right Expression
}

func (a *AdditionExpression) Evaluate(context map[string]int) int {
	return a.Left.Evaluate(context) + a.Right.Evaluate(context)
}

func main() {
	// Example usage: 1 + 2 + 3
	expression := &AdditionExpression{
		Left: &AdditionExpression{
			Left:  &IntegerLiteral{Value: 1},
			Right: &IntegerLiteral{Value: 2},
		},
		Right: &IntegerLiteral{Value: 3},
	}

	context := map[string]int{} // Empty context for this simple example.
	result := expression.Evaluate(context)
	fmt.Println("Result:", result) // Output: Result: 6
}
```