---
title: "SOA - Go"
date: 2025-12-03T14:48:30.711-05:00
draft: false
pattern_usage: ["SOA"]
language: ["Go"]
---
The Service-Oriented Architecture (SOA) pattern structures an application as a collection of loosely coupled, independent services. Each service encapsulates a specific business capability and communicates with others through well-defined interfaces (often APIs). This promotes modularity, reusability, and independent deployment.

The Go code demonstrates a simplified SOA with two services: `Greeter` and `Logger`. `Greeter` provides a greeting function, and `Logger` logs messages. They communicate via interfaces, allowing for easy swapping of implementations. The `main` package orchestrates these services. This approach leverages Go's strong support for interfaces and concurrency, making it naturally suited for building distributed systems where services can operate independently and scale efficiently.  Dependency injection via function arguments further enhances testability and loose coupling.

```go
// main.go
package main

import "fmt"

// Greeter interface defines the greeting service.
type Greeter interface {
	Greet(name string) string
}

// Logger interface defines the logging service.
type Logger interface {
	Log(message string)
}

// DefaultGreeter is a concrete implementation of the Greeter interface.
type DefaultGreeter struct{}

func (g *DefaultGreeter) Greet(name string) string {
	return fmt.Sprintf("Hello, %s!", name)
}

// DefaultLogger is a concrete implementation of the Logger interface.
type DefaultLogger struct{}

func (l *DefaultLogger) Log(message string) {
	fmt.Println("LOG:", message)
}

// Application orchestrates the services.
type Application struct {
	greeter Greeter
	logger  Logger
}

// NewApplication creates a new application with the given services.
func NewApplication(greeter Greeter, logger Logger) *Application {
	return &Application{greeter: greeter, logger: logger}
}

// Run executes the application logic.
func (app *Application) Run(name string) {
	greeting := app.greeter.Greet(name)
	app.logger.Log(greeting)
}

func main() {
	greeter := &DefaultGreeter{}
	logger := &DefaultLogger{}

	app := NewApplication(greeter, logger)
	app.Run("World")
}
```