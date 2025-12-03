---
title: "Composite - Go"
date: 2025-12-03T11:36:14.933-05:00
draft: false
pattern_usage: ["Composite"]
language: ["Go"]
---
The Composite pattern allows you to treat individual objects and compositions of objects uniformly. It’s used when you have hierarchical relationships where you want to perform operations on both individual “leaves” and complex “branches” in the same way. In this Go example, we model a file system. `Entry` is the component interface, implemented by both `File` (leaf) and `Directory` (composite). `Directory` contains a list of `Entry` interfaces, allowing it to represent a hierarchy. The `Name()` and `Size()` methods are defined on the interface and are implemented by each concrete type, demonstrating the uniform treatment of files and directories. This approach leans on interfaces, a core part of Go's type system, to achieve polymorphism and adheres to Go’s composition-over-inheritance philosophy.

```go
package main

import "fmt"

// Entry is the component interface
type Entry interface {
	Name() string
	Size() int
}

// File represents a leaf node in the file system
type File struct {
	name string
	size int
}

func (f *File) Name() string {
	return f.name
}

func (f *File) Size() int {
	return f.size
}

// Directory represents a composite node in the file system
type Directory struct {
	name   string
	entries []Entry
}

func (d *Directory) Name() string {
	return d.name
}

func (d *Directory) Size() int {
	totalSize := 0
	for _, entry := range d.entries {
		totalSize += entry.Size()
	}
	return totalSize
}

func (d *Directory) AddEntry(entry Entry) {
	d.entries = append(d.entries, entry)
}

func main() {
	root := &Directory{name: "root"}
	file1 := &File{name: "file1", size: 10}
	file2 := &File{name: "file2", size: 20}
	subdir := &Directory{name: "subdir"}
	file3 := &File{name: "file3", size: 5}

	root.AddEntry(file1)
	root.AddEntry(file2)
	root.AddEntry(subdir)
	subdir.AddEntry(file3)

	fmt.Printf("Name: %s, Size: %d\n", root.Name(), root.Size())
	fmt.Printf("Name: %s, Size: %d\n", subdir.Name(), subdir.Size())
	fmt.Printf("Name: %s, Size: %d\n", file1.Name(), file1.Size())
}
```