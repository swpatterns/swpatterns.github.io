---
title: "Strategy - Go"
date: 2025-12-03T13:34:13.758-05:00
draft: false
pattern_usage: ["Strategy"]
language: ["Go"]
---
The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. It lets you vary an algorithm independently from clients that use it.  This implementation uses interfaces to define the strategy (a `ShippingMethod` interface with a `CalculateCost` method). Concrete strategies (like `StandardShipping`, `ExpressShipping`) provide different implementations of the cost calculation. A `ShoppingCart` struct then holds a `ShippingMethod` allowing the shipping cost calculation to be swapped at runtime without modifying the `ShoppingCart` itself. This leverages Go's interface capabilities for flexible composition over inheritance.

```go
package main

import "fmt"

// ShippingMethod is the interface for different shipping cost calculations.
type ShippingMethod interface {
	CalculateCost(distance int) float64
}

// StandardShipping calculates the shipping cost based on a standard rate.
type StandardShipping struct {
	ratePerMile float64
}

func (s *StandardShipping) CalculateCost(distance int) float64 {
	return float64(distance) * s.ratePerMile
}

// ExpressShipping calculates the shipping cost based on an express rate.
type ExpressShipping struct {
	ratePerMile float64
}

func (e *ExpressShipping) CalculateCost(distance int) float64 {
	return float64(distance) * e.ratePerMile * 2 // Express is twice as expensive
}

// ShoppingCart represents a shopping cart with a selected shipping method.
type ShoppingCart struct {
	shippingMethod ShippingMethod
}

// SetShippingMethod allows changing the shipping method at runtime.
func (c *ShoppingCart) SetShippingMethod(method ShippingMethod) {
	c.shippingMethod = method
}

// CalculateTotalCost calculates the total shipping cost.
func (c *ShoppingCart) CalculateTotalCost(distance int) float64 {
	return c.shippingMethod.CalculateCost(distance)
}

func main() {
	standard := &StandardShipping{ratePerMile: 0.5}
	express := &ExpressShipping{ratePerMile: 0.75}

	cart := &ShoppingCart{}

	cart.SetShippingMethod(standard)
	fmt.Println("Standard Shipping Cost (10 miles):", cart.CalculateTotalCost(10))

	cart.SetShippingMethod(express)
	fmt.Println("Express Shipping Cost (10 miles):", cart.CalculateTotalCost(10))
}
```