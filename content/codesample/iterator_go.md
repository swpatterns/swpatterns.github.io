---
title: "Iterator - Go"
date: 2025-12-03T13:11:46.725-05:00
draft: false
pattern_usage: ["Iterator"]
language: ["Go"]
---
The Iterator pattern provides a way to access the elements of an aggregate object (like a list, array, or tree) sequentially without exposing its underlying representation. It defines a standardized interface for traversal, allowing algorithms to operate on collections without knowing their concrete type. This example implements an `Iterator` interface with a concrete `ConcreteIterator` for a simple `ConcreteAggregate` (a list of integers).  The `HasNext()` and `Next()` methods fulfill the basic iteration protocol. This implementation fits idiomatic Go by utilizing interfaces to achieve abstraction and employing a receiver-based approach for method definition.  The use of channels isn’t strictly necessary, but demonstrates a common concurrency pattern that can be incorporated into more complex iterators.

```go
package main

import "fmt"

// Iterator defines the interface for accessing elements sequentially.
type Iterator interface {
	HasNext() bool
	Next() interface{}
}

// Aggregate defines the interface for objects that can be iterated over.
type Aggregate interface {
	CreateIterator() Iterator
}

// ConcreteAggregate represents a collection of data.
type ConcreteAggregate struct {
	data []int
}

func (ca *ConcreteAggregate) CreateIterator() Iterator {
	return &ConcreteIterator{data: ca.data, index: 0}
}

// ConcreteIterator implements the Iterator interface for ConcreteAggregate.
type ConcreteIterator struct {
	data  []int
	index int
}

// HasNext checks if there are more elements to iterate over.
func (ci *ConcreteIterator) HasNext() bool {
	return ci.index < len(ci.data)
}

// Next returns the next element in the collection.
func (ci *ConcreteIterator) Next() interface{} {
	if !ci.HasNext() {
		return nil // Or handle end of iteration differently
	}
	item := ci.data[ci.index]
	ci.index++
	return item
}

func main() {
	aggregate := &ConcreteAggregate{data: []int{1, 2, 3, 4, 5}}
	iterator := aggregate.CreateIterator()

	for iterator.HasNext() {
		item := iterator.Next()
		fmt.Println(item)
	}
}
```