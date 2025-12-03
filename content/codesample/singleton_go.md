---
title: "Singleton - Go"
date: 2025-12-03T11:06:19.402-05:00
draft: false
pattern_usage: ["Singleton"]
language: ["Go"]
---
The Singleton pattern ensures a class has only one instance and provides a global point of access to it. This is useful for managing resources that should be shared across the application, like database connections or configuration settings. In Go, we achieve this using a private variable to hold the instance and a public method to access it, initializing the instance if it's not already created.  This approach is idiomatic as Go doesn't have explicit class keywords and promotes package-level access for global state, leveraging zero-value initialization and potential concurrency safety mechanisms like `sync.Once`.

```go
package main

import (
	"fmt"
	"sync"
)

// singleton is the instance of the Singleton.  It's private to enforce control.
var singleton *Singleton
var once sync.Once

// Singleton represents the Singleton object.
type Singleton struct {
	data string
}

// GetInstance is the public method to access the Singleton instance.
func GetInstance() *Singleton {
	once.Do(func() {
		singleton = &Singleton{data: "Initial Data"}
	})
	return singleton
}

// GetData returns the data held by the singleton.
func (s *Singleton) GetData() string {
	return s.data
}

// SetData sets the data held by the singleton.
func (s *Singleton) SetData(data string) {
	s.data = data
}
	

func main() {
	instance1 := GetInstance()
	instance2 := GetInstance()

	fmt.Printf("Instance 1: %p\n", instance1)
	fmt.Printf("Instance 2: %p\n", instance2)

	if instance1 == instance2 {
		fmt.Println("Both instances are the same.")
	}

	instance1.SetData("Updated Data")
	fmt.Println("Instance 2 Data:", instance2.GetData())
}
```