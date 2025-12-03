---
title: "Lazy Initialization - Go"
date: 2025-12-03T11:17:26.514-05:00
draft: false
pattern_usage: ["Lazy Initialization"]
language: ["Go"]
---
The Lazy Initialization pattern delays the initialization of an object until it's actually needed. This can improve performance, especially if the initialization process is resource-intensive, as it avoids unnecessary work. This example uses a `sync.Once` to ensure the initialization happens only once, even in concurrent scenarios, and that all goroutines see the same initialized instance.  The `getSingleton()` function provides access to the instance, triggering initialization on the first call. This aligns with Go’s preference for explicit resource management and concurrency safety via synchronization primitives.

```go
// singleton.go

package main

import (
	"fmt"
	"sync"
)

type singleton struct {
	data string
}

var once sync.Once
var instance *singleton

func getSingleton() *singleton {
	once.Do(func() {
		// Simulate expensive initialization
		fmt.Println("Initializing Singleton...")
		instance = &singleton{data: "Singleton Data"}
	})
	return instance
}

func main() {
	// First call triggers initialization
	s1 := getSingleton()
	fmt.Println("Singleton 1:", s1.data)

	// Subsequent calls return the already initialized instance
	s2 := getSingleton()
	fmt.Println("Singleton 2:", s2.data)

	// Check if both variables point to the same instance
	fmt.Println("s1 == s2:", s1 == s2)
}
```