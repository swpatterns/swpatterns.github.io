---
title: "Null Object - Go"
date: 2025-12-03T13:47:30.699-05:00
draft: false
pattern_usage: ["Null Object"]
language: ["Go"]
---
The Null Object pattern provides a substitute for an object that would otherwise be null or undefined. This avoids null checks throughout the code, simplifying logic and reducing the risk of NullPointerExceptions (or their equivalent). In Go, this is often implemented using an empty struct or a type with zero-valued fields that represent a "no-op" or default behavior.  The code defines a `Speaker` interface and a `NullSpeaker` type that implements it with default, harmless behavior.  This allows calling methods on a `Speaker` without needing to check if it's nil, improving code robustness and readability. Go's interfaces and the zero-value nature of structs make this pattern a natural fit.

```go
package main

import "fmt"

// Speaker interface defines the methods a speaker should have.
type Speaker interface {
	Speak() string
}

// DefaultSpeaker is a concrete speaker.
type DefaultSpeaker struct {
	Name string
}

func (s *DefaultSpeaker) Speak() string {
	return "Hello, my name is " + s.Name
}

// NullSpeaker is the null object implementation of the Speaker interface.
type NullSpeaker struct{}

// Speak provides a default, no-op implementation.
func (n *NullSpeaker) Speak() string {
	return "" // Or a default message like "No speaker available"
}

func main() {
	var speaker Speaker

	// Normally, speaker would be initialized with a DefaultSpeaker.
	// For demonstration, we'll leave it nil and use the Null Object.

	speaker = &NullSpeaker{}

	fmt.Println(speaker.Speak()) // Prints an empty string instead of panicking.

	speaker = &DefaultSpeaker{Name: "Alice"}
	fmt.Println(speaker.Speak()) // Prints "Hello, my name is Alice"
}
```