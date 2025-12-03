---
title: "Supervisor-Worker - Go"
date: 2025-12-03T15:36:45.728-05:00
draft: false
pattern_usage: ["Supervisor-Worker"]
language: ["Go"]
---
The Supervisor-Worker pattern distributes tasks to multiple worker goroutines, managed by a supervisor. The supervisor receives tasks from a channel, dispatches them to available workers, and collects results. This pattern enhances concurrency and responsiveness by preventing the main goroutine from blocking on long-running operations.

This Go implementation uses channels for communication between the supervisor and workers. The `supervisor` function creates a pool of workers and a channel for tasks. It receives tasks from a `tasks` channel, sends them to worker channels, and aggregates the results. Workers continuously listen on their assigned channels, process tasks, and send results back to the supervisor. This approach is idiomatic Go due to its reliance on goroutines and channels for concurrent communication, avoiding explicit locking and promoting a "share memory by communicating" philosophy.

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

// worker function processes tasks from its assigned channel.
func worker(id int, tasks <-chan Task, results chan<- Result, wg *sync.WaitGroup) {
	defer wg.Done()
	for task := range tasks {
		// Simulate work
		value := task.Payload * 2
		results <- Result{TaskID: task.ID, Value: value}
		fmt.Printf("Worker %d processed task %d: %d -> %d\n", id, task.ID, task.Payload, value)
	}
}

// supervisor function dispatches tasks to workers and collects results.
func supervisor(numWorkers int, tasks chan<- Task, results <-chan Result, wg *sync.WaitGroup) {
	// Create worker pool
	for i := 0; i < numWorkers; i++ {
		go worker(i+1, tasks, results, wg)
	}

	// Dispatch tasks
	for i := 1; i <= 10; i++ {
		tasks <- Task{ID: i, Payload: i}
	}
	close(tasks) // Signal workers that no more tasks are coming

	// Collect results
	for i := 0; i < 10; i++ {
		result := <-results
		fmt.Printf("Received result for task %d: %d\n", result.TaskID, result.Value)
	}
}

func main() {
	numWorkers := 3
	tasks := make(chan Task)
	results := make(chan Result)
	var wg sync.WaitGroup
	wg.Add(numWorkers)

	go supervisor(numWorkers, tasks, results, &wg)

	wg.Wait()
	close(results)
}
```