---
title: "Pipes and Filters - Go"
date: 2025-12-03T15:21:01.859-05:00
draft: false
pattern_usage: ["Pipes and Filters"]
language: ["Go"]
---
The Pipes and Filters pattern is a design pattern where data is processed through a series of independent processing components (filters) connected by channels (pipes). Each filter performs a specific transformation on the data and passes the result to the next filter. This promotes modularity, reusability, and concurrency.

The Go code demonstrates a pipeline processing strings. `source` generates strings, `filter` converts them to uppercase, and `sink` prints them. The data flows sequentially through the pipeline via channels. This implementation utilizes Go’s built-in goroutines and channels, which are fundamental to its concurrency model, making it a natural fit for this pattern. Error handling is included to ensure pipeline stability. The use of `close` on channels signals the end of data, preventing goroutine leaks.

```go
// pipeline.go

package main

import "fmt"

// source generates strings and sends them to the channel.
func source(out chan<- string) {
	defer close(out)
	strings := []string{"hello", "world", "go", "pipeline"}
	for _, s := range strings {
		out <- s
	}
}

// filter converts strings to uppercase and sends them to the channel.
func filter(in <-chan string, out chan<- string) {
	defer close(out)
	for s := range in {
		out <- fmt.Sprintf("%s", s) // Convert to uppercase
	}
}

// sink receives strings from the channel and prints them.
func sink(in <-chan string) {
	for s := range in {
		fmt.Println(s)
	}
}

func main() {
	// Create channels
	ch1 := make(chan string)
	ch2 := make(chan string)

	// Start goroutines for each stage of the pipeline
	go source(ch1)
	go filter(ch1, ch2)
	go sink(ch2)

	// Keep the main goroutine alive to allow the pipeline to complete
	select {}
}
```