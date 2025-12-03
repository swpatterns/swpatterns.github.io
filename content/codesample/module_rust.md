---
title: "Module - Rust"
date: 2025-12-03T12:50:41.360-05:00
draft: false
pattern_usage: ["Module"]
language: ["Rust"]
---
The Module pattern organizes code into logical units, enhancing reusability, maintainability, and preventing naming conflicts. In Rust, modules are defined using the `mod` keyword. This example demonstrates a simple module structure with a public function and a private one. The `pub` keyword controls visibility, making items accessible outside the module.  Rust's module system is central to its package management (crates) and encourages a hierarchical organization of code. The use of `mod` and `pub` aligns with Rust's explicit visibility control and emphasis on code organization.

```rust
// src/lib.rs

pub mod geometry {
    // Publicly available types and functions
    pub struct Rectangle {
        pub width: u32,
        pub height: u32,
    }

    impl Rectangle {
        pub fn area(&self) -> u32 {
            self.width * self.height
        }

        // Private function - only accessible within the geometry module
        fn is_square(&self) -> bool {
            self.width == self.height
        }

        pub fn new(width: u32, height: u32) -> Rectangle {
            Rectangle { width, height }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::geometry::Rectangle;

    #[test]
    fn test_rectangle_area() {
        let rect = Rectangle::new(5, 10);
        assert_eq!(rect.area(), 50);
    }

    #[test]
    fn test_is_square_access() {
        let rect = Rectangle::new(5, 5);
        // This would cause a compile error because is_square is private
        // assert_eq!(rect.is_square(), true);
    }
}
```