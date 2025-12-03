---
title: "Observer - Go"
date: 2025-12-03T13:25:36.457-05:00
draft: false
pattern_usage: ["Observer"]
language: ["Go"]
---
The Observer pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically. It promotes loose coupling as the subject doesn't need to know concrete observer details.

This Go implementation uses interfaces to define the `Subject` and `Observer`.  The `Subject` maintains a list of `Observer`s and calls a `Update()` method on each when its state changes.  The `Observer` interface has a single `Update()` method that receives the subject's data. Concrete subject and observers implement these interfaces.  The use of interfaces and function types aligns well with Go’s emphasis on composition and decoupling. Channels are not used because that adds unnecessary complexity for this basic implementation, deferring that to more concurrent and complex real-world scenarios.

```go
package main

import "fmt"

// Observer interface
type Observer interface {
	Update(data int)
}

// Subject interface
type Subject interface {
	Register(observer Observer)
	Deregister(observer Observer)
	Notify()
}

// Concrete Subject
type ConcreteSubject struct {
	observers []Observer
	data      int
}

func (s *ConcreteSubject) Register(observer Observer) {
	s.observers = append(s.observers, observer)
}

func (s *ConcreteSubject) Deregister(observer Observer) {
	for i, o := range s.observers {
		if o == observer {
			s.observers = append(s.observers[:i], s.observers[i+1:]...)
			return
		}
	}
}

func (s *ConcreteSubject) Notify() {
	for _, observer := range s.observers {
		observer.Update(s.data)
	}
}

func (s *ConcreteSubject) SetData(newData int) {
	s.data = newData
	s.Notify()
}

// Concrete Observers
type ConcreteObserverA struct {
	id int
}

func (o *ConcreteObserverA) Update(data int) {
	fmt.Printf("Observer A %d received update: %d\n", o.id, data)
}

type ConcreteObserverB struct {
	id int
}

func (o *ConcreteObserverB) Update(data int) {
	fmt.Printf("Observer B %d received update: %d\n", o.id, data)
}

func main() {
	subject := &ConcreteSubject{}

	observerA1 := &ConcreteObserverA{id: 1}
	observerA2 := &ConcreteObserverA{id: 2}
	observerB1 := &ConcreteObserverB{id: 1}

	subject.Register(observerA1)
	subject.Register(observerA2)
	subject.Register(observerB1)

	subject.SetData(10)
	subject.SetData(20)

	subject.Deregister(observerA2)
	subject.SetData(30)
}
```