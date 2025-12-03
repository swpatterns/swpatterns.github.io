---
title: "Decorator - Go"
date: 2025-12-03T11:40:01.071-05:00
draft: false
pattern_usage: ["Decorator"]
language: ["Go"]
---
The Decorator pattern dynamically adds responsibilities to an object. It provides a flexible alternative to subclassing for extending functionality.  Instead of inheriting from a base class, objects are wrapped in decorator objects that add behavior before, after, or around the original object's methods.

This Go implementation uses interfaces to define the core component and decorators. The `Service` interface represents the base component, and concrete services implement it. `Decorator` is an interface that all decorators implement, containing the decorated `Service` and a method to execute the service. The `ConcreteDecorator` type adds specific functionality before and after calling the underlying service, demonstrating dynamic extension without modifying the original `Service` implementation. This approach is idiomatic Go because it leverages interfaces and composition over inheritance.



```go
// service.go

package main

import "fmt"

// Service interface defines the core functionality.
type Service interface {
	Do()
}

// ConcreteService is a concrete implementation of the Service interface.
type ConcreteService struct{}

func (s *ConcreteService) Do() {
	fmt.Println("ConcreteService: Doing something.")
}

// Decorator interface defines the decorator's structure.
type Decorator interface {
	Service
}

// ConcreteDecorator adds functionality to the Service.
type ConcreteDecorator struct {
	decoratedService Service
}

func NewConcreteDecorator(s Service) *ConcreteDecorator {
	return &ConcreteDecorator{decoratedService: s}
}

func (d *ConcreteDecorator) Do() {
	fmt.Println("ConcreteDecorator: Before service.")
	d.decoratedService.Do()
	fmt.Println("ConcreteDecorator: After service.")
}

// AnotherDecorator adds different functionality.
type AnotherDecorator struct {
	decoratedService Service
}

func NewAnotherDecorator(s Service) *AnotherDecorator {
	return &AnotherDecorator{decoratedService: s}
}

func (a *AnotherDecorator) Do() {
	fmt.Println("AnotherDecorator: Adding extra behavior.")
	a.decoratedService.Do()
}

func main() {
	service := &ConcreteService{}

	// Decorate the service with ConcreteDecorator
	decoratedService := NewConcreteDecorator(service)
	decoratedService.Do()

	// Further decorate with AnotherDecorator
	anotherDecoratedService := NewAnotherDecorator(decoratedService)
	anotherDecoratedService.Do()
}
```