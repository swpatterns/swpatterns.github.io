---
title: "Multiton - Go"
date: 2025-12-03T11:09:41.828-05:00
draft: false
pattern_usage: ["Multiton"]
language: ["Go"]
---
The Multiton pattern ensures that only a limited number of instances of a class are created. It’s a variation of the Singleton pattern, allowing for a small, predefined *count* of instances instead of just one. This is useful when a fixed number of resources or managers are needed and creating more would be detrimental. In Go, this is implemented using a map to store instances, a mutex to ensure thread safety during instance creation, and a function to retrieve an instance, creating it if it doesn't already exist within the allowed count. Go's built-in concurrency features are leveraged for safe access.

```go
package main

import (
	"fmt"
	"sync"
)

type multiton struct {
	id int
}

var (
	instances   = make(map[int]*multiton)
	instanceCount = 0
	mu          sync.Mutex
	maxInstances = 3
)

func GetInstance(id int) *multiton {
	mu.Lock()
	defer mu.Unlock()

	if _, ok := instances[id]; !ok && instanceCount < maxInstances {
		instances[id] = &multiton{id: id}
		instanceCount++
	}

	return instances[id]
}

func main() {
	instance1 := GetInstance(1)
	instance2 := GetInstance(2)
	instance3 := GetInstance(3)
	instance4 := GetInstance(4) // Will return nil because maxInstances is 3

	fmt.Printf("Instance 1 ID: %d\n", instance1.id)
	fmt.Printf("Instance 2 ID: %d\n", instance2.id)
	fmt.Printf("Instance 3 ID: %d\n", instance3.id)
    if instance4 == nil {
        fmt.Println("Instance 4 is nil, maximum instances reached.")
    }

	fmt.Printf("Total instances created: %d\n", instanceCount)
}
```