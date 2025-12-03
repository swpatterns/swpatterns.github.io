---
title: "Shared-Nothing - Go"
date: 2025-12-03T15:13:09.468-05:00
draft: false
pattern_usage: ["Shared-Nothing"]
language: ["Go"]
---
The Shared-Nothing architecture is a distributed computing paradigm where each node in the system has its own private resources (CPU, memory, disk) and communicates with other nodes via network messages. There is no shared memory or shared storage. This promotes scalability and fault tolerance.

This Go example simulates a simplified shared-nothing system with worker nodes processing independent tasks.  Each worker receives a task from a central dispatcher via channels, processes it, and sends the result back. The dispatcher doesn't share any state with the workers; it merely routes work.  This leverages Go's concurrency features (goroutines and channels) to implement a natural message-passing style, fitting the shared-nothing paradigm.  Error handling isn't exhaustive for brevity, but would be crucial in a production system.

```go
package main

import (
	"fmt"
	"sync"
)

// Task represents a unit of work.
type Task struct {
	ID      int
	Payload int
}

// Result represents the outcome of a task.
type Result struct {
	TaskID  int
	Value   int
	Error   error
}

// Worker represents a processing node.
type Worker struct {
	ID     int
	Tasks  <-chan Task
	Results chan<- Result
}

// NewWorker creates a new worker.
func NewWorker(id int, tasks <-chan Task, results chan<- Result) *Worker {
	return &Worker{ID: id, Tasks: tasks, Results: results}
}

// Start begins processing tasks.
func (w *Worker) Start() {
	go func() {
		for task := range w.Tasks {
			result := w.processTask(task)
			w.Results <- result
		}
	}()
}

// processTask simulates work being done.
func (w *Worker) processTask(task Task) Result {
	// Simulate some work
	value := task.Payload * 2
	return Result{TaskID: task.ID, Value: value, Error: nil}
}

// Dispatcher manages task distribution.
type Dispatcher struct {
	Tasks  chan Task
	Results chan Result
	Workers []*Worker
}

// NewDispatcher creates a new dispatcher.
func NewDispatcher(numWorkers int) *Dispatcher {
	tasks := make(chan Task)
	results := make(chan Result)

	workers := make([]*Worker, numWorkers)
	for i := 0; i < numWorkers; i++ {
		workers[i] = NewWorker(i, tasks, results)
		workers[i].Start()
	}

	return &Dispatcher{Tasks: tasks, Results: results, Workers: workers}
}

// Run dispatches tasks and collects results
func (d *Dispatcher) Run(tasks []Task) {
	var wg sync.WaitGroup
	wg.Add(len(tasks))

	for _, task := range tasks {
		d.Tasks <- task
	}
	close(d.Tasks)

	for i := 0; i < len(d.Workers); i++ {
		go func(resultChan <-chan Result) {
			for result := range resultChan {
				fmt.Printf("Task %d: Value = %d\n", result.TaskID, result.Value)
				wg.Done()
			}
		}(d.Results)
	}

	wg.Wait()
	close(d.Results)
}

func main() {
	dispatcher := NewDispatcher(3)
	tasks := []Task{{ID: 1, Payload: 10}, {ID: 2, Payload: 20}, {ID: 3, Payload: 30}, {ID: 4, Payload: 40}, {ID: 5, Payload: 50}}
	dispatcher.Run(tasks)
}
```