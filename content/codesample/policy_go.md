---
title: "Policy - Go"
date: 2025-12-03T13:56:47.060-05:00
draft: false
pattern_usage: ["Policy"]
language: ["Go"]
---
The Policy pattern allows runtime modification of an object's behavior without altering its core code. It achieves this by defining a set of policies (typically interfaces) that encapsulate different behaviors. An object (the context) can then accept and apply these policies dynamically. This promotes flexibility and separation of concerns.

This Go implementation defines a `Policy` interface representing different actions. Concrete policies like `DiscountPolicy` and `TaxPolicy` implement this interface. The `Product` struct represents the context, holding a slice of `Policy` interfaces. The `Apply` method iterates through the policies and applies them to the product's price. This is idiomatic Go due to its use of interfaces for abstraction and composition over inheritance, enabling dynamic behavior modification.

```go
// policy.go

package main

import "fmt"

// Policy interface defines the behavior that can be applied.
type Policy interface {
	Apply(price float64) float64
}

// DiscountPolicy applies a discount to the price.
type DiscountPolicy struct {
	DiscountRate float64
}

func (d *DiscountPolicy) Apply(price float64) float64 {
	return price * (1 - d.DiscountRate)
}

// TaxPolicy applies tax to the price.
type TaxPolicy struct {
	TaxRate float64
}

func (t *TaxPolicy) Apply(price float64) float64 {
	return price * (1 + t.TaxRate)
}

// Product represents the context that uses policies.
type Product struct {
	Name      string
	Price     float64
	Policies  []Policy
}

// ApplyPolicies applies all registered policies to the product's price.
func (p *Product) ApplyPolicies(price float64) float64 {
	for _, policy := range p.Policies {
		price = policy.Apply(price)
	}
	return price
}

func main() {
	product := &Product{
		Name:   "Laptop",
		Price:  1000.0,
		Policies: []Policy{
			&DiscountPolicy{DiscountRate: 0.1},
			&TaxPolicy{TaxRate: 0.08},
		},
	}

	finalPrice := product.ApplyPolicies(product.Price)
	fmt.Printf("Final price of %s: %.2f\n", product.Name, finalPrice)

	//Demonstrate dynamic policy addition
	product.Policies = append(product.Policies, &DiscountPolicy{DiscountRate: 0.05})
	finalPrice = product.ApplyPolicies(product.Price)
	fmt.Printf("Final price of %s with additional discount: %.2f\n", product.Name, finalPrice)
}
```