---
title: "Module - Go"
date: 2025-12-03T12:50:28.588-05:00
draft: false
pattern_usage: ["Module"]
language: ["Go"]
---
The Module pattern (also known as the Memento pattern) captures and externalizes an object's internal state so that it can be restored later, providing a way to save and restore previous states without violating encapsulation. This implementation uses a `State` struct to hold the object's data, and `Save()` and `Restore()` methods to manage the memento.  Go's struct composition and method receivers naturally lend themselves to this pattern.  The `Originator` struct encapsulates the state and the logic for saving and restoring it, while the `Memento` struct is an immutable snapshot of the state.

```go
package main

import "fmt"

// State holds the internal state of the Originator.
type State struct {
	Value int
}

// Memento is an immutable snapshot of the Originator's state.
type Memento struct {
	State State
}

// Originator creates and manages its own state.
type Originator struct {
	currentState State
}

// NewOriginator creates a new Originator with an initial state.
func NewOriginator(initialValue int) *Originator {
	return &Originator{State{Value: initialValue}}
}

// SetValue changes the Originator's state.
func (o *Originator) SetValue(newValue int) {
	o.currentState.Value = newValue
}

// Value returns the current value of the originator.
func (o *Originator) Value() int {
	return o.currentState.Value
}

// Save creates a memento containing the current state.
func (o *Originator) Save() *Memento {
	return &Memento{State{Value: o.currentState.Value}}
}

// Restore sets the Originator's state to the one stored in the memento.
func (o *Originator) Restore(memento *Memento) {
	o.currentState = memento.State
}

func main() {
	originator := NewOriginator(10)
	fmt.Println("Initial value:", originator.Value())

	memento := originator.Save()

	originator.SetValue(20)
	fmt.Println("Value after change:", originator.Value())

	originator.Restore(memento)
	fmt.Println("Value after restore:", originator.Value())
}
```