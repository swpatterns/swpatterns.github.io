---
title: "Extension Object - Rust"
date: 2025-12-03T12:53:54.281-05:00
draft: false
pattern_usage: ["Extension Object"]
language: ["Rust"]
---
The Extension Object pattern allows adding new functionality to existing objects without modifying their core code. This is achieved by creating a separate "extension" object that holds the new methods and data, and then associating it with the original object. In Rust, this is naturally implemented using structs and traits. The original object implements a trait that the extension object also implements, allowing the extension to be treated as part of the original object through trait objects or generics. This avoids inheritance and promotes composition.

```rust
// Define the core object (e.g., a Point)
#[derive(Debug)]
struct Point {
    x: i32,
    y: i32,
}

impl Point {
    fn new(x: i32, y: i32) -> Self {
        Point { x, y }
    }

    fn distance_from_origin(&self) -> f64 {
        ((self.x.pow(2) + self.y.pow(2)) as f64).sqrt()
    }
}

// Define the extension trait
trait PointExtension {
    fn translate(&mut self, dx: i32, dy: i32);
    fn scale(&mut self, factor: f64);
}

// Implement the extension
struct MutablePointExtension {
    point: &mut Point,
}

impl PointExtension for MutablePointExtension {
    fn translate(&mut self, dx: i32, dy: i32) {
        self.point.x += dx;
        self.point.y += dy;
    }

    fn scale(&mut self, factor: f64) {
        self.point.x = (self.point.x as f64 * factor) as i32;
        self.point.y = (self.point.y as f64 * factor) as i32;
    }
}

// Function to apply the extension
fn extend_point(point: &mut Point) -> MutablePointExtension {
    MutablePointExtension { point }
}

fn main() {
    let mut p = Point::new(1, 2);
    println!("Original point: {:?}", p);

    let mut extended_p = extend_point(&mut p);
    extended_p.translate(3, 4);
    println!("Translated point: {:?}", p);

    extended_p.scale(2.0);
    println!("Scaled point: {:?}", p);
}
```