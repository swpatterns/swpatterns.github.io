---
title: "Prototype - Rust"
date: 2025-12-03T11:03:04.479-05:00
draft: false
pattern_usage: ["Prototype"]
language: ["Rust"]
---
The Prototype pattern creates new objects from an existing object, a prototype, rather than using a traditional constructor. This is useful when the creation process is costly or complex, or when the class and its objects should remain unchanged.  In Rust, this is elegantly achieved using the `Clone` trait and potentially `serde` for deep copying. The example defines a `Shape` trait and concrete types like `Rectangle` and `Circle` implementing it. A `ShapeFactory` utilizes a prototype map (using `HashMap`) to efficiently clone existing shapes, avoiding redundant initialization logic.  Rust’s ownership and borrowing rules are naturally respected through the `Clone` trait, making the pattern safe and expressive.

```rust
use std::collections::HashMap;

// Define the base trait
trait Shape {
    fn area(&self) -> f64;
    fn clone(&self) -> Box<dyn Shape>;
}

// Concrete shape: Rectangle
struct Rectangle {
    width: f64,
    height: f64,
}

impl Rectangle {
    fn new(width: f64, height: f64) -> Self {
        Rectangle { width, height }
    }
}

impl Shape for Rectangle {
    fn area(&self) -> f64 {
        self.width * self.height
    }

    fn clone(&self) -> Box<dyn Shape> {
        Box::new(Rectangle::new(self.width, self.height))
    }
}

// Concrete shape: Circle
struct Circle {
    radius: f64,
}

impl Circle {
    fn new(radius: f64) -> Self {
        Circle { radius }
    }
}

impl Shape for Circle {
    fn area(&self) -> f64 {
        std::f64::consts::PI * self.radius * self.radius
    }

    fn clone(&self) -> Box<dyn Shape> {
        Box::new(Circle::new(self.radius))
    }
}

// Prototype Factory
struct ShapeFactory {
    prototypes: HashMap<String, Box<dyn Shape>>,
}

impl ShapeFactory {
    fn new() -> Self {
        let mut prototypes = HashMap::new();
        prototypes.insert("rectangle".to_string(), Box::new(Rectangle::new(10.0, 5.0)));
        prototypes.insert("circle".to_string(), Box::new(Circle::new(7.0)));
        ShapeFactory { prototypes }
    }

    fn get_shape(&self, type_name: &str) -> Option<Box<dyn Shape>> {
        self.prototypes.get(type_name).map(|prototype| prototype.clone())
    }
}

fn main() {
    let factory = ShapeFactory::new();

    if let Some(rect) = factory.get_shape("rectangle") {
        println!("Rectangle Area: {}", rect.area());
    }

    if let Some(circ) = factory.get_shape("circle") {
        println!("Circle Area: {}", circ.area());
    }
}
```