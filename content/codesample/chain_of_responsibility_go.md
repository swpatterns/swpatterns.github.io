---
title: "Chain of Responsibility - Go"
date: 2025-12-03T12:57:41.250-05:00
draft: false
pattern_usage: ["Chain of Responsibility"]
language: ["Go"]
---
The Chain of Responsibility pattern allows a request to be passed along a chain of handlers. Each handler decides either to process the request or to pass it to the next handler in the chain. This decouples the sender of a request from its receivers, giving multiple objects the opportunity to handle the request without the explicit sender knowing which object ultimately handled it.

The Go implementation uses interfaces to define the handler and the request. Each concrete handler implements the interface and either processes the request if it can, or recursively calls the next handler in the chain. The chain itself is built by each handler holding a reference to the next.  This leverages Go’s interface capabilities and composition effectively, favoring a flexible and extensible design without strict inheritance hierarchies – a very Go-like approach. Error handling is also a core consideration in the demonstration.

```go
// chain_of_responsibility.go

package main

import "fmt"

// Handler interface defines the contract for all handlers.
type Handler interface {
	Handle(request string) (string, error)
	SetNext(handler Handler)
}

// concreteHandlerA handles requests related to authentication.
type AuthHandler struct {
	next Handler
}

func (h *AuthHandler) Handle(request string) (string, error) {
	if request == "auth" {
		return "Authentication successful", nil
	}
	return h.next.Handle(request) // Pass to the next handler
}

func (h *AuthHandler) SetNext(handler Handler) {
	h.next = handler
}

// concreteHandlerB handles requests related to logging.
type LogHandler struct {
	next Handler
}

func (h *LogHandler) Handle(request string) (string, error) {
	if request == "log" {
		return "Log entry created", nil
	}
	return h.next.Handle(request)
}

func (h *LogHandler) SetNext(handler Handler) {
	h.next = handler
}

// concreteHandlerC handles all other requests.
type DefaultHandler struct{}

func (h *DefaultHandler) Handle(request string) (string, error) {
	return "Request cannot be handled", fmt.Errorf("unsupported request: %s", request)
}

func (h *DefaultHandler) SetNext(handler Handler) {
	// Default handler doesn't need a next handler.  Necessary to satisfy the interface.
}

func main() {
	// Build the chain of responsibility
	authHandler := &AuthHandler{}
	logHandler := &LogHandler{}
	defaultHandler := &DefaultHandler{}

	authHandler.SetNext(logHandler)
	logHandler.SetNext(defaultHandler)

	// Make requests
	result1, err1 := authHandler.Handle("auth")
	fmt.Println("Auth request:", result1, err1)

	result2, err2 := authHandler.Handle("log")
	fmt.Println("Log request:", result2, err2)

	result3, err3 := authHandler.Handle("other")
	fmt.Println("Other request:", result3, err3)
}
```