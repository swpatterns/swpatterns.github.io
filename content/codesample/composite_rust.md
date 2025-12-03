---
title: "Composite - Rust"
date: 2025-12-03T11:36:32.025-05:00
draft: false
pattern_usage: ["Composite"]
language: ["Rust"]
---
The Composite pattern allows you to treat individual objects and compositions of objects uniformly. It’s useful when you have hierarchical structures and want to perform operations on them without knowing whether you’re dealing with a leaf or a composite node. This Rust example represents a file system where files and directories can both implement a common `FileSystemNode` trait.  The `Directory` struct acts as the composite, holding a `Vec` of `FileSystemNode`s. The `File` struct represents a leaf.  The `size` method is implemented on the trait allowing a uniform way to calculate the size contributed by either a file or a directory (and recursively all files within a directory).  Rust’s traits and ownership system naturally lend themselves to this pattern.

```rust
use std::fmt;

// Component
trait FileSystemNode {
    fn size(&self) -> u64;
    fn name(&self) -> &str;
}

// Leaf
struct File {
    name: String,
    size: u64,
}

impl File {
    fn new(name: String, size: u64) -> Self {
        File { name, size }
    }
}

impl FileSystemNode {
    fn size(&self) -> u64 {
        self.size
    }

    fn name(&self) -> &str {
        &self.name
    }
}

// Composite
struct Directory {
    name: String,
    children: Vec<Box<dyn FileSystemNode>>,
}

impl Directory {
    fn new(name: String) -> Self {
        Directory {
            name,
            children: Vec::new(),
        }
    }

    fn add(&mut self, node: Box<dyn FileSystemNode>) {
        self.children.push(node);
    }
}

impl FileSystemNode {
    fn size(&self) -> u64 {
        let mut total_size = 0;
        if let Some(dir) = self as *const Self as *const Directory {
            unsafe {
                for child in &(*dir).children {
                    total_size += child.size();
                }
            }
        }
        total_size
    }

    fn name(&self) -> &str {
        if let Some(dir) = self as *const Self as *const Directory {
            unsafe {
                &(*dir).name
            }
        } else {
            "" // Should not occur, handled by the File struct
        }
    }
}

fn main() {
    let mut root = Directory::new("root".to_string());
    let dir1 = Directory::new("dir1".to_string());
    let file1 = File::new("file1.txt".to_string(), 1024);
    let file2 = File::new("file2.txt".to_string(), 2048);

    dir1.add(Box::new(file1));
    dir1.add(Box::new(file2));

    root.add(Box::new(dir1));

    println!("Size of root directory: {} bytes", root.size());
}
```