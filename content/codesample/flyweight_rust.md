---
title: "Flyweight - Rust"
date: 2025-12-03T12:43:15.061-05:00
draft: false
pattern_usage: ["Flyweight"]
language: ["Rust"]
---
The Flyweight pattern aims to minimize memory usage by sharing common parts of objects. It's useful when dealing with a large number of similar objects. The pattern separates the object's state into intrinsic (shared) and extrinsic (unique) components.  The Flyweight interface defines a method to operate on the extrinsic state.  A Flyweight factory manages the shared objects, creating them only if they don't already exist.

This Rust implementation represents trees with leaves. The `Leaf` struct holds the intrinsic state (color), while the position is extrinsic and passed to the `display` method. The `LeafFactory` acts as the flyweight factory, caching and returning existing `Leaf` instances.  Rust's ownership and borrowing system, coupled with the `Rc` smart pointer, naturally supports shared ownership of the intrinsic state, making it well-suited for Flyweight.

```rust
use std::rc::Rc;
use std::collections::HashMap;

// Intrinsic state
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
enum Color {
    Red,
    Green,
    Blue,
}

// Flyweight interface
trait Tree {
    fn display(&self, x: i32, y: i32);
}

// Concrete Flyweight
struct Leaf {
    color: Color,
}

impl Leaf {
    fn new(color: Color) -> Self {
        Leaf { color }
    }
}

impl Tree for Leaf {
    fn display(&self, x: i32, y: i32) {
        println!("Leaf at ({}, {}) with color {:?}", x, y, self.color);
    }
}

// Flyweight Factory
struct LeafFactory {
    leaves: HashMap<Color, Rc<Leaf>>,
}

impl LeafFactory {
    fn new() -> Self {
        LeafFactory {
            leaves: HashMap::new(),
        }
    }

    fn get_leaf(&mut self, color: Color) -> Rc<Leaf> {
        if let Some(leaf) = self.leaves.get(&color) {
            leaf.clone()
        } else {
            let leaf = Rc::new(Leaf::new(color));
            self.leaves.insert(color, leaf.clone());
            leaf
        }
    }
}

fn main() {
    let mut factory = LeafFactory::new();

    let leaf1 = factory.get_leaf(Color::Red);
    let leaf2 = factory.get_leaf(Color::Green);
    let leaf3 = factory.get_leaf(Color::Red); // Reuse existing Red leaf

    leaf1.display(10, 10);
    leaf2.display(20, 20);
    leaf3.display(30, 30);

    println!("Number of leaves created: {}", factory.leaves.len());
}
```