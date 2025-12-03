---
title: "Template Method - Go"
date: 2025-12-03T13:38:37.722-05:00
draft: false
pattern_usage: ["Template Method"]
language: ["Go"]
---
The Template Method pattern defines the skeleton of an algorithm in a base class, deferring some steps to subclasses. This allows subclasses to redefine certain steps of an algorithm without changing its structure. It's useful for encapsulating common parts of an algorithm and promoting code reuse.

Here, we define a `Worker` interface with a `DoWork()` method. The `AbstractWorker` struct implements a template method `Execute()`, outlining the work process with `PreWork()`, `ActualWork()`, and `PostWork()` steps. `ConcreteWorkerA` and `ConcreteWorkerB` override `ActualWork()` to provide specific implementations while keeping the overall `Execute()` workflow consistent. This leverages Go's interface-based polymorphism for a clean implementation.

```go
// worker.go

package main

import "fmt"

// Worker defines the interface for different types of work.
type Worker interface {
	DoWork()
}

// AbstractWorker provides the template method.
type AbstractWorker struct{}

// Execute defines the overall workflow.  This is the template method.
func (w *AbstractWorker) Execute() {
	w.PreWork()
	w.ActualWork()
	w.PostWork()
}

// PreWork performs setup before the actual work.
func (w *AbstractWorker) PreWork() {
	fmt.Println("AbstractWorker: Performing pre-work...")
}

// PostWork performs cleanup after the actual work.
func (w *AbstractWorker) PostWork() {
	fmt.Println("AbstractWorker: Performing post-work...")
}

// ActualWork is a placeholder for the specific work to be done.
// Subclasses should override this method.
func (w *AbstractWorker) ActualWork() {
	fmt.Println("AbstractWorker: Performing default work...")
}

// ConcreteWorkerA implements the ActualWork method for a specific task.
type ConcreteWorkerA struct{}

func (w *ConcreteWorkerA) ActualWork() {
	fmt.Println("ConcreteWorkerA: Performing specific work A...")
}

// ConcreteWorkerB implements the ActualWork method for another task.
type ConcreteWorkerB struct{}

func (w *ConcreteWorkerB) ActualWork() {
	fmt.Println("ConcreteWorkerB: Performing specific work B...")
}

func main() {
	workerA := &ConcreteWorkerA{}
	workerB := &ConcreteWorkerB{}

	fmt.Println("Executing Worker A:")
	workerA.DoWork() // Calls Execute() which calls PreWork, ActualWork, PostWork

	fmt.Println("\nExecuting Worker B:")
	workerB.DoWork() // Calls Execute() which calls PreWork, ActualWork, PostWork
}

// DoWork is a method to satisfy the Worker interface.
func (w *AbstractWorker) DoWork() {
	w.Execute()
}

func (w *ConcreteWorkerA) DoWork() {
	w.Execute()
}

func (w *ConcreteWorkerB) DoWork() {
	w.Execute()
}
```