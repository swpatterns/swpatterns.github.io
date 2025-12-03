---
title: "Object Pool - Go"
date: 2025-12-03T11:13:45.367-05:00
draft: false
pattern_usage: ["Object Pool"]
language: ["Go"]
---
The Object Pool pattern manages a pool of reusable objects to reduce the overhead of frequent object creation and destruction. This is particularly useful for expensive-to-create objects. The code implements a generic Object Pool using a channel-based approach. `Pool` manages a buffer of `sync.Pool` containing instances of type `T`. `Get()` retrieves an object from the pool, creating one if none are available. `Release()` returns an object to the pool for reuse. The `sync.Pool`'s `Get()` and `Put()` methods handle the actual allocation and release, making the implementation efficient and thread-safe, idiomatic to Go’s concurrency features.

```go
package main

import (
	"fmt"
	"sync"
)

// ObjectPool generic pool
type Pool[T any] struct {
	pool sync.Pool
}

// NewPool creates a new object pool.
func NewPool[T any]() *Pool[T] {
	return &Pool[T]{}
}

// Get retrieves an object from the pool.
func (p *Pool[T]) Get() *T {
	val := p.pool.Get()
	if val == nil {
		return new(T) // Create a new object if the pool is empty
	}
	return val.(*T)
}

// Release returns an object to the pool.
func (p *Pool[T]) Release(obj *T) {
	p.pool.Put(obj)
}

// Example usage with a simple struct
type MyObject struct {
	ID int
}

func main() {
	pool := NewPool[MyObject]()

	// Get some objects
	obj1 := pool.Get()
	obj1.ID = 1
	obj2 := pool.Get()
	obj2.ID = 2

	fmt.Println("Object 1:", obj1)
	fmt.Println("Object 2:", obj2)

	// Release the objects back to the pool
	pool.Release(obj1)
	pool.Release(obj2)

	// Get objects again - might get reused ones
	obj3 := pool.Get()
	fmt.Println("Object 3:", obj3)

	// Demonstrate that memory is recycled.  This isn't a strict test but shows usage.
	pool.Release(obj3)
}
```