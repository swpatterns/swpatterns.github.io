---
title: "Null Object - Rust"
date: 2025-12-03T13:47:49.326-05:00
draft: false
pattern_usage: ["Null Object"]
language: ["Rust"]
---
The Null Object pattern provides a substitute for a null or missing object. Instead of checking for `null` (or `None` in Rust), you request a null object, which implements the expected interface but has a default, harmless behavior. This simplifies code by eliminating conditional checks for null values.

The Rust implementation uses an `Option` to represent the potential absence of an object.  A `NullShape` struct implements the `Shape` trait, providing default implementations for area and color.  If a shape is not present (represented by `None`), the `get_shape` function returns a `NullShape` instance, allowing the calling code to treat all shapes uniformly without null checks. This leverages Rust's ownership and trait system for a type-safe and concise solution.

```rust
// Define the Shape trait
trait Shape {
    fn area(&self) -> f64;
    fn color(&self) -> String;
}

// Concrete Shape implementation (e.g., Rectangle)
struct Rectangle {
    width: f64,
    height: f64,
    color: String,
}

impl Shape for Rectangle {
    fn area(&self) -> f64 {
        self.width * self.height
    }

    fn color(&self) -> String {
        self.color.clone()
    }
}

// Null Object implementation
struct NullShape;

impl Shape for NullShape {
    fn area(&self) -> f64 {
        0.0
    }

    fn color(&self) -> String {
        "None".to_string()
    }
}

// Function to get a shape, potentially returning a Null Object
fn get_shape(shape_type: &str) -> Option<Box<dyn Shape>> {
    match shape_type {
        "rectangle" => Some(Box::new(Rectangle {
            width: 10.0,
            height: 5.0,
            color: "Red".to_string(),
        })),
        _ => None, // Return None for unknown shape types
    }
}

fn main() {
    let rectangle = get_shape("rectangle");
    let unknown = get_shape("circle");

    if let Some(shape) = rectangle {
        println!("Rectangle Area: {}", shape.area());
        println!("Rectangle Color: {}", shape.color());
    }

    if let Some(shape) = unknown {
        println!("Unknown Shape Area: {}", shape.area());
        println!("Unknown Shape Color: {}", shape.color());
    } else {
        let null_shape = NullShape;
        println!("Unknown Shape Area: {}", null_shape.area());
        println!("Unknown Shape Color: {}", null_shape.color());
    }
}
```