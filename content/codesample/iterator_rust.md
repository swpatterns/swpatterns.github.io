---
title: "Iterator - Rust"
date: 2025-12-03T13:12:00.709-05:00
draft: false
pattern_usage: ["Iterator"]
language: ["Rust"]
---
The Iterator pattern is a design pattern that provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation. It defines an interface for traversal and allows for multiple traversals without disrupting the underlying data.

The Rust code below demonstrates this through a custom `Counter` struct which implements the `Iterator` trait.  This involves implementing `next()` which returns an `Option<i32>`, yielding the next value (if any) and updating the internal state.  The use of `Option` is idiomatic for handling the potential end of the iteration.  The `Counter` iterator produces a sequence of numbers from a starting point up to a defined limit. This implementation leverages Rust's ownership and borrowing system, combined with its powerful trait system, to provide a safe and efficient iterator.

```rust
// src/main.rs
// A simple counter iterator

struct Counter {
    current: i32,
    max: i32,
}

impl Counter {
    fn new(start: i32, end: i32) -> Self {
        Counter { current: start, max: end }
    }
}

impl Iterator for Counter {
    type Item = i32;

    fn next(&mut self) -> Option<Self::Item> {
        if self.current <= self.max {
            let value = self.current;
            self.current += 1;
            Some(value)
        } else {
            None
        }
    }
}

fn main() {
    let counter = Counter::new(1, 5);

    for num in counter {
        println!("{}", num);
    }
}
```