---
title: "Memento - Go"
date: 2025-12-03T13:20:50.854-05:00
draft: false
pattern_usage: ["Memento"]
language: ["Go"]
---
The Memento pattern captures and externalizes an object’s internal state so that the object can be restored to this state later, even by another object. It’s particularly useful for implementing undo/redo functionality or saving game states.  Our Go implementation defines an `Originator` holding the state, a `Memento` representing a snapshot of that state, and a `Caretaker` responsible for storing and retrieving Mementos without directly accessing the originator's state.  Go's struct composition and the lack of explicit getters/setters encourage direct state access within the originator, aligning cleanly with the pattern’s intention of encapsulating state within the memento.

```go
package main

import "fmt"

// Memento
type Memento struct {
	State string
}

// Originator
type Originator struct {
	State string
}

func (o *Originator) CreateMemento() *Memento {
	return &Memento{State: o.State}
}

func (o *Originator) Restore(m *Memento) {
	o.State = m.State
}

func (o *Originator) String() string {
	return fmt.Sprintf("Originator State: %s", o.State)
}

// Caretaker
type Caretaker struct {
	Mementos []*Memento
}

func (c *Caretaker) AddMemento(m *Memento) {
	c.Mementos = append(c.Mementos, m)
}

func (c *Caretaker) GetMemento(index int) *Memento {
	if index < 0 || index >= len(c.Mementos) {
		return nil
	}
	return c.Mementos[index]
}

func main() {
	originator := &Originator{State: "State 1"}
	caretaker := &Caretaker{}

	caretaker.AddMemento(originator.CreateMemento())

	originator.State = "State 2"
	caretaker.AddMemento(originator.CreateMemento())

	originator.State = "State 3"
	fmt.Println(originator)

	memento := caretaker.GetMemento(0)
	if memento != nil {
		originator.Restore(memento)
		fmt.Println(originator)
	}
}
```