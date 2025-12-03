---
title: "Self-contained Systems - Go"
date: 2025-12-03T14:29:53.639-05:00
draft: false
pattern_usage: ["Self-contained Systems"]
language: ["Go"]
---
The Self-Contained Systems pattern advocates for creating independent, deployable components with well-defined interfaces. Each system handles its own data, logic, and dependencies, minimizing external couplings. This promotes modularity, testability, and independent scaling.

The example below showcases a simple order processing system. The `OrderProcessor` encapsulates all order-related logic, including validation and persistence (mocked here). It receives orders as strings and returns a processing result. The `main` function demonstrates how to use the processor without needing to know its internal details.  This follows Go's emphasis on explicit interfaces and package-level encapsulation, making it naturally suited to building these types of systems.  Error handling via returned errors is also idiomatic.

```go
// order_processor.go
package main

import (
	"fmt"
	"errors"
)

// OrderProcessor encapsulates the order processing logic.
type OrderProcessor struct {
	// Add dependencies here if needed (e.g., database connection).
}

// NewOrderProcessor creates a new order processor.
func NewOrderProcessor() *OrderProcessor {
	return &OrderProcessor{}
}

// ProcessOrder validates and processes an order.  In a real system, this would
// interact with a database or other external system.
func (op *OrderProcessor) ProcessOrder(order string) (string, error) {
	if order == "" {
		return "", errors.New("order cannot be empty")
	}

	// Simulate order processing.
	result := fmt.Sprintf("Order '%s' processed successfully.", order)
	return result, nil
}

func main() {
	processor := NewOrderProcessor()

	order1 := "Book-123"
	result1, err1 := processor.ProcessOrder(order1)
	if err1 != nil {
		fmt.Println("Error processing order:", err1)
	} else {
		fmt.Println(result1)
	}

	order2 := ""
	result2, err2 := processor.ProcessOrder(order2)
	if err2 != nil {
		fmt.Println("Error processing order:", err2)
	} else {
		fmt.Println(result2)
	}
}
```