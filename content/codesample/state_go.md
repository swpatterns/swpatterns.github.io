---
title: "State - Go"
date: 2025-12-03T13:29:46.767-05:00
draft: false
pattern_usage: ["State"]
language: ["Go"]
---
The State pattern is a behavioral pattern that allows an object to alter its behavior when its internal state changes. It encapsulates different states of an object as separate classes (concrete states) and provides a way to transition between them. This avoids complex conditional logic within the object itself.

The Go implementation defines a `State` interface representing possible states.  Concrete state structs (`Red`, `Yellow`, `Green`) implement this interface, each with its own behavior for handling a state transition (e.g., `Process`). A `TrafficLight` struct holds the current state and a method `Transition` to change it. This is idiomatic Go because it leverages interfaces for polymorphism, struct composition for behavior, and avoids direct modification of the `TrafficLight`'s state from outside, favoring managed transitions.

```go
// traffic_light.go
package main

import "fmt"

// State interface defines the behavior of each state.
type State interface {
	Process(light *TrafficLight)
}

// Red state.
type Red struct{}

func (r *Red) Process(light *TrafficLight) {
	fmt.Println("Red Light: Stop!")
	light.setState(&Yellow{}) // Transition to Yellow
}

// Yellow state.
type Yellow struct{}

func (y *Yellow) Process(light *TrafficLight) {
	fmt.Println("Yellow Light: Caution!")
	light.setState(&Green{}) // Transition to Green
}

// Green state.
type Green struct{}

func (g *Green) Process(light *TrafficLight) {
	fmt.Println("Green Light: Go!")
	light.setState(&Red{}) // Transition to Red
}

// TrafficLight context.
type TrafficLight struct {
	currentState State
}

// NewTrafficLight creates a new TrafficLight in the Red state.
func NewTrafficLight() *TrafficLight {
	return &TrafficLight{currentState: &Red{}}
}

// Transition changes the current state.
func (light *TrafficLight) Transition() {
	light.currentState.Process(light)
}

// setState sets the current state.  Package-level access to maintain control.
func (light *TrafficLight) setState(state State) {
	light.currentState = state
}

func main() {
	light := NewTrafficLight()
	for i := 0; i < 5; i++ {
		light.Transition()
	}
}
```