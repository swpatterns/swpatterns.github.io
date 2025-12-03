---
title: "Adapter - Rust"
date: 2025-12-03T11:28:27.081-05:00
draft: false
pattern_usage: ["Adapter"]
language: ["Rust"]
---
The Adapter pattern converts the interface of a class into another interface clients expect. This allows classes with incompatible interfaces to work together. Here, we adapt a `CelsiusTemperature` struct (legacy system) to be usable with functions expecting `FahrenheitTemperature`.  We define a `CelsiusToFahrenheitAdapter` which implements the `FahrenheitTemperature` trait by internally holding a `CelsiusTemperature` instance and converting on demand. This adheres to Rust's strong typing and trait-based polymorphism, providing a clean and type-safe way to integrate differing interfaces without modifying the original `CelsiusTemperature` struct.

```rust
// Legacy system: Celsius temperature representation
struct CelsiusTemperature {
    temperature: f64,
}

impl CelsiusTemperature {
    fn new(temp: f64) -> Self {
        CelsiusTemperature { temperature: temp }
    }

    fn get_celsius(&self) -> f64 {
        self.temperature
    }
}

// Target interface: Fahrenheit temperature representation
trait FahrenheitTemperature {
    fn get_fahrenheit(&self) -> f64;
}

// Adapter: Converts Celsius to Fahrenheit
struct CelsiusToFahrenheitAdapter {
    celsius: CelsiusTemperature,
}

impl CelsiusToFahrenheitAdapter {
    fn new(celsius: CelsiusTemperature) -> Self {
        CelsiusToFahrenheitAdapter { celsius }
    }
}

impl FahrenheitTemperature for CelsiusToFahrenheitAdapter {
    fn get_fahrenheit(&self) -> f64 {
        (self.celsius.get_celsius() * 9.0 / 5.0) + 32.0
    }
}

// Client code expecting Fahrenheit
fn print_temperature_fahrenheit(temp: &dyn FahrenheitTemperature) {
    println!("Temperature in Fahrenheit: {}", temp.get_fahrenheit());
}

fn main() {
    let celsius_temp = CelsiusTemperature::new(25.0);

    // Use the adapter to work with the Celsius temperature
    let fahrenheit_adapter = CelsiusToFahrenheitAdapter::new(celsius_temp);
    print_temperature_fahrenheit(&fahrenheit_adapter);
}
```