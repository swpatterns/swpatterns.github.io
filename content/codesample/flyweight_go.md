---
title: "Flyweight - Go"
date: 2025-12-03T12:42:55.388-05:00
draft: false
pattern_usage: ["Flyweight"]
language: ["Go"]
---
The Flyweight pattern aims to minimize memory usage or computational expenses by sharing as much data as possible between similar objects. It achieves this by separating the object's state into intrinsic (shared) and extrinsic (unique) components.  Intrinsic state is stored within the flyweight object, while extrinsic state is passed as arguments to the flyweight's methods.

This Go implementation represents trees where many leaves share the same properties (color, type). `Leaf` is the flyweight interface, and `ConcreteLeaf` holds the intrinsic state. `Forest` acts as the flyweight factory, managing the shared `ConcreteLeaf` instances.  Each tree (represented by coordinates) receives the extrinsic state (leaf type) when `Draw` is called, demonstrating how the pattern reduces memory by reusing leaf objects. Go's use of interfaces and maps for efficient lookup aligns well with the Flyweight pattern's principles.

```go
package main

import "fmt"

// Flyweight interface
type Leaf interface {
	Draw(x, y int, leafType string)
}

// ConcreteFlyweight
type ConcreteLeaf struct {
	color string
}

func (l *ConcreteLeaf) Draw(x, y int, leafType string) {
	fmt.Printf("Drawing a %s leaf at (%d, %d) with color %s\n", leafType, x, y, l.color)
}

// Flyweight Factory
type Forest struct {
	leafs map[string]Leaf
}

func NewForest() *Forest {
	return &Forest{
		leafs: make(map[string]Leaf),
	}
}

func (f *Forest) GetLeaf(leafType string) Leaf {
	if _, ok := f.leafs[leafType]; !ok {
		switch leafType {
		case "oak":
			f.leafs[leafType] = &ConcreteLeaf{color: "green"}
		case "maple":
			f.leafs[leafType] = &ConcreteLeaf{color: "red"}
		default:
			return nil // Or handle unknown leaf types
		}
	}
	return f.leafs[leafType]
}

func main() {
	forest := NewForest()

	forest.GetLeaf("oak").Draw(10, 20, "oak")
	forest.GetLeaf("maple").Draw(30, 40, "maple")
	forest.GetLeaf("oak").Draw(50, 60, "oak") // Reuses the existing oak leaf
	forest.GetLeaf("birch").Draw(70, 80, "birch") // Returns nil, as birch is not defined
}
```