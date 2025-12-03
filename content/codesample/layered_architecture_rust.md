---
title: "Layered Architecture - Rust"
date: 2025-12-03T14:05:33.424-05:00
draft: false
pattern_usage: ["Layered Architecture"]
language: ["Rust"]
---
The Layered Architecture pattern organizes an application into distinct layers, each performing a specific role. This promotes separation of concerns, making the application more maintainable, testable, and adaptable to change. Typically, layers include a Presentation (UI), Business Logic, and Data Access layer.  My Rust example models these three key layers.  The `main` function represents the Presentation layer, calling functions from the `business_logic` module. This module orchestrates data operations via the `data_access` module. Using modules is Rust’s primary mechanism for code organization and encapsulation, fitting the pattern's intent well. Data flows unidirectionally, ensuring layers remain independent.

```rust
// src/main.rs - Presentation Layer
mod business_logic;

fn main() {
    let result = business_logic::process_data(10, 5);
    println!("Result: {}", result);
}

// src/business_logic.rs - Business Logic Layer
mod data_access;

pub fn process_data(x: i32, y: i32) -> i32 {
    // Perform some business logic
    let data = data_access::get_data(x);
    data + y
}

// src/data_access.rs - Data Access Layer
pub fn get_data(id: i32) -> i32 {
    // Simulate fetching data from a database or other source
    // In a real application, this would handle persistence logic
    match id {
        10 => 20,
        _ => 0,
    }
}
```