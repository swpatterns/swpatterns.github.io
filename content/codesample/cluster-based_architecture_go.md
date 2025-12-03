---
title: "Cluster-based Architecture - Go"
date: 2025-12-03T15:17:24.038-05:00
draft: false
pattern_usage: ["Cluster-based Architecture"]
language: ["Go"]
---
The Cluster-based Architecture pattern distributes application components across multiple interconnected nodes (a "cluster") to improve scalability, reliability, and resource utilization. This allows for handling increased load and provides redundancy in case of failures.

This Go example simulates a simple cluster of worker nodes managed by a master. Workers register with the master, receive tasks via a channel, process them, and report results. The master distributes tasks round-robin among available workers.  The use of goroutines and channels is fundamentally Go's approach to concurrency, making it a natural fit for cluster-style operations. Error handling uses Go's multi-return values.  The simple registration and work distribution demonstrate the core concept without complex system integration details.

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

type Worker struct {
	ID     int
	Master *Master
}

type Task struct {
	ID     int
	Input  int
	Result int
}

type Master struct {
	Workers   []*Worker
	TaskChan  chan Task
	Results   chan Task
	Register  chan *Worker
	WaitGroup sync.WaitGroup
}

func NewMaster() *Master {
	return &Master{
		TaskChan:  make(chan Task),
		Results:   make(chan Task),
		Register:  make(chan *Worker),
		WaitGroup: sync.WaitGroup{},
	}
}

func (m *Master) Run() {
	for worker := range m.Register {
		m.Workers = append(m.Workers, worker)
	}

	go m.dispatchTasks()

	m.WaitGroup.Wait() // Wait for all workers to finish
	close(m.Results)
}

func (m *Master) dispatchTasks() {
	workerIndex := 0
	for task := range m.TaskChan {
		worker := m.Workers[workerIndex]
		worker.processTask(task)
		workerIndex = (workerIndex + 1) % len(m.Workers)
	}
	m.WaitGroup.Done()
}


func (w *Worker) processTask(task Task) {
	time.Sleep(time.Millisecond * 50) // Simulate work
	task.Result = task.Input * 2
	w.Master.Results <- task
}

func main() {
	master := NewMaster()
	numWorkers := 3

	for i := 0; i < numWorkers; i++ {
		worker := &Worker{ID: i, Master: master}
		master.WaitGroup.Add(1)
		go func(w *Worker) {
			master.Register <- w
		}(worker)
	}

	go master.Run()

	// Send tasks
	for i := 0; i < 10; i++ {
		master.TaskChan <- Task{ID: i, Input: i}
	}
	close(master.TaskChan)


	// Collect results
	for result := range master.Results {
		fmt.Printf("Task %d: Input = %d, Result = %d\n", result.ID, result.Input, result.Result)
	}
}
```