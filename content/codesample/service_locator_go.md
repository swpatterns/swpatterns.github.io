---
title: "Service Locator - Go"
date: 2025-12-03T11:24:20.235-05:00
draft: false
pattern_usage: ["Service Locator"]
language: ["Go"]
---
The Service Locator pattern provides a centralized way to access services within an application. Instead of a component directly creating or finding its dependencies, it requests them from a central "locator." This promotes loose coupling and simplifies dependency management, particularly in complex systems.

The Go implementation uses an interface for the locator and a map to store services. A `Register` function adds services keyed by a string, and a `Get` function retrieves them.  Error handling is included for cases where a requested service isn't found. This approach leverages Go's interfaces and maps, fitting its style of explicit dependency injection through interfaces and avoiding tight coupling through concrete types.  The use of a map is a natural way to implement a lookup table in Go.

```go
package main

import (
	"fmt"
	"errors"
)

// Service is the interface that all services must implement.
type Service interface {
	Execute() string
}

// ConcreteServiceA is a concrete implementation of the Service interface.
type ConcreteServiceA struct {
	Name string
}

func (s *ConcreteServiceA) Execute() string {
	return fmt.Sprintf("Service A executed by %s", s.Name)
}

// ConcreteServiceB is another concrete implementation.
type ConcreteServiceB struct {
	Message string
}

func (s *ConcreteServiceB) Execute() string {
	return fmt.Sprintf("Service B says: %s", s.Message)
}

// Locator is the interface for the service locator.
type Locator interface {
	Register(name string, service Service)
	Get(name string) (Service, error)
}

// serviceLocator implements the Locator interface.
type serviceLocator struct {
	services map[string]Service
}

// NewServiceLocator creates a new service locator.
func NewServiceLocator() Locator {
	return &serviceLocator{
		services: make(map[string]Service),
	}
}

// Register registers a service with the locator.
func (sl *serviceLocator) Register(name string, service Service) {
	sl.services[name] = service
}

// Get retrieves a service from the locator.
func (sl *serviceLocator) Get(name string) (Service, error) {
	service, ok := sl.services[name]
	if !ok {
		return nil, errors.New("service not found")
	}
	return service, nil
}

func main() {
	locator := NewServiceLocator()

	locator.Register("A", &ConcreteServiceA{Name: "Alice"})
	locator.Register("B", &ConcreteServiceB{Message: "Hello, world!"})

	serviceA, err := locator.Get("A")
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(serviceA.Execute())
	}

	serviceB, err := locator.Get("B")
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(serviceB.Execute())
	}

	_, err = locator.Get("C")
	if err != nil {
		fmt.Println(err)
	}
}
```