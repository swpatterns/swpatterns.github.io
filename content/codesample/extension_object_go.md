---
title: "Extension Object - Go"
date: 2025-12-03T12:53:39.408-05:00
draft: false
pattern_usage: ["Extension Object"]
language: ["Go"]
---
The Extension Object pattern allows you to add functionality to an existing class without modifying its code directly. This is achieved by creating a separate "extension" class that holds the new functionality and collaborates with the original class.  The original class is often referred to as the "host" object.

The Go implementation uses composition.  The `Core` struct represents the original object, and the `Extension` struct adds functionality by *having* a `Core` as a field. Methods on the `Extension` delegate to the `Core` when necessary, and then add their own behavior. This approach is idiomatic Go because it favors composition over inheritance, promoting flexibility and avoiding the rigid coupling inherent in inheritance-based extension.  Interfaces can be used to further decouple the core and extension.

```go
package main

import "fmt"

// Core represents the original object with basic functionality.
type Core struct {
	data string
}

// NewCore creates a new Core object.
func NewCore(d string) *Core {
	return &Core{data: d}
}

// CoreMethod is a method of the Core object.
func (c *Core) CoreMethod() string {
	return "Core says: " + c.data
}

// Extension adds functionality to the Core object.
type Extension struct {
	*Core // Composition: Extension *has a* Core
}

// NewExtension creates a new Extension object.
func NewExtension(c *Core) *Extension {
	return &Extension{Core: c}
}

// ExtensionMethod adds new functionality.
func (e *Extension) ExtensionMethod() string {
	return "Extension adds: " + e.Core.CoreMethod() + " - Enhanced!"
}

func main() {
	core := NewCore("Hello")
	extension := NewExtension(core)

	fmt.Println(extension.ExtensionMethod())
	fmt.Println(extension.CoreMethod()) // Can still access Core methods directly
}
```