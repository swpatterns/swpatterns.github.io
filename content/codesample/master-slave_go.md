---
title: "Master-Slave - Go"
date: 2025-12-03T15:32:50.790-05:00
draft: false
pattern_usage: ["Master-Slave"]
language: ["Go"]
---
The Master-Slave pattern distributes work to multiple worker nodes (slaves) from a central coordinator (master). The master assigns tasks, and slaves execute them independently, reporting results back to the master. This improves parallelism and scalability.

This Go implementation uses goroutines for the slaves and channels for communication. The `master` function generates tasks and sends them to worker goroutines via the `jobs` channel. Each worker receives tasks, processes them, and sends the results back to the `master` via the `results` channel. The master aggregates the results and prints them. This approach is idiomatic Go due to its concurrency model based on goroutines and channels, enabling efficient parallel processing without explicit locking.

```go
package main

import (
	"fmt"
	"sync"
)

// Job represents a unit of work.
type Job struct {
	ID      int
	Payload int
}

// Result represents the outcome of a job.
type Result struct {
	JobID   int
	Output  int
}

func worker(id int, jobs <-chan Job, results chan<- Result, wg *sync.WaitGroup) {
	defer wg.Done()
	for job := range jobs {
		// Simulate work
		output := job.Payload * 2
		results <- Result{JobID: job.ID, Output: output}
		fmt.Printf("Worker %d processed job %d, output: %d\n", id, job.ID, output)
	}
}

func master(numWorkers int, jobs chan<- Job, results <-chan Result) {
	var wg sync.WaitGroup
	wg.Add(numWorkers)

	// Launch workers
	for i := 0; i < numWorkers; i++ {
		go worker(i, jobs, results, &wg)
	}

	// Send jobs
	for i := 0; i < 10; i++ {
		jobs <- Job{ID: i, Payload: i}
	}
	close(jobs) // Signal workers that no more jobs are coming

	// Collect results
	wg.Wait()
	close(results)
	fmt.Println("All jobs completed.")

	for result := range results {
		fmt.Printf("Job %d result: %d\n", result.JobID, result.Output)
	}
}

func main() {
	numWorkers := 3
	jobs := make(chan Job)
	results := make(chan Result)

	master(numWorkers, jobs, results)
}
```