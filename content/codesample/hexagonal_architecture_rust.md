---
title: "Hexagonal Architecture - Rust"
date: 2025-12-03T14:09:55.654-05:00
draft: false
pattern_usage: ["Hexagonal Architecture"]
language: ["Rust"]
---
The Hexagonal Architecture (also known as Ports and Adapters) aims to create loosely coupled software by separating the core application logic from external concerns like databases, UIs, or external services. The core interacts with the outside world only through **ports** – interfaces defining how the core *needs* to interact, not *how* it interacts. **Adapters** then implement these ports, translating the core's needs into the specifics of external technologies. This allows for easy swapping of dependencies and improved testability.

This Rust example demonstrates a simple unit conversion app. The core logic `convert_units` doesn’t know *where* the conversion rates come from. It declares a `UnitRepository` port. `InMemoryUnitRepository` is an adapter that provides rates directly in code, while potentially a `DatabaseUnitRepository` could retrieve rates from a database.  This aligns with Rust's strong emphasis on traits (interfaces) and dependency injection allowing for flexibility and testability.

```rust
// Core Application Logic (doesn't depend on external details)

pub trait UnitRepository {
    fn get_conversion_rate(&self, from: &str, to: &str) -> Result<f64, String>;
}

pub fn convert_units(
    amount: f64,
    from: &str,
    to: &str,
    repo: &dyn UnitRepository,
) -> Result<f64, String> {
    let rate = repo.get_conversion_rate(from, to)?;
    Ok(amount * rate)
}

// Adapters (implement ports to interact with external systems)

pub struct InMemoryUnitRepository {
    rates: std::collections::HashMap<&'static str, &'static str>,
}

impl InMemoryUnitRepository {
    pub fn new() -> Self {
        let mut rates = std::collections::HashMap::new();
        rates.insert("meters", "kilometers");
        rates.insert("kilometers", "miles");
        InMemoryUnitRepository { rates }
    }
}

impl UnitRepository for InMemoryUnitRepository {
    fn get_conversion_rate(&self, from: &str, to: &str) -> Result<f64, String> {
        match (from, to) {
            ("meters", "kilometers") => Ok(0.001),
            ("kilometers", "miles") => Ok(0.621371),
            (a, b) if a == b => Ok(1.0),
            _ => Err("Conversion rate not found".to_string()),
        }
    }
}

fn main() {
    let repo = InMemoryUnitRepository::new();
    let result = convert_units(1000.0, "meters", "miles", &repo);

    match result {
        Ok(miles) => println!("1000 meters is equal to {} miles", miles),
        Err(err) => println!("Error: {}", err),
    }
}
```