---
title: "Strategy - Rust"
date: 2025-12-03T13:34:31.779-05:00
draft: false
pattern_usage: ["Strategy"]
language: ["Rust"]
---
The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. It allows an algorithm to vary independently from the clients that use it. Here, we define a trait `CompressionStrategy` representing the compression algorithms.  Concrete strategies like `ZipCompression` and `RarCompression` implement this trait. A `Compressor` struct then utilizes a chosen `CompressionStrategy` to perform compression.  This decouples the compression logic from the compressor itself. The implementation is idiomatic Rust as it relies on traits for abstraction and composition over inheritance, promoting flexibility and testability. Using `Box<dyn Trait>` allows us to hold different strategy implementations at runtime.

```rust
// Define the strategy trait
trait CompressionStrategy {
    fn compress(&self, data: &str) -> String;
}

// Concrete strategy: Zip compression
struct ZipCompression;

impl ZipCompression {
    fn new() -> Self {
        ZipCompression
    }
}

impl CompressionStrategy for ZipCompression {
    fn compress(&self, data: &str) -> String {
        format!("Zip compressed: {}", data)
    }
}

// Concrete strategy: Rar compression
struct RarCompression;

impl RarCompression {
    fn new() -> Self {
        RarCompression
    }
}

impl CompressionStrategy for RarCompression {
    fn compress(&self, data: &str) -> String {
        format!("Rar compressed: {}", data)
    }
}

// Context: Compressor
struct Compressor {
    strategy: Box<dyn CompressionStrategy>,
}

impl Compressor {
    fn new(strategy: Box<dyn CompressionStrategy>) -> Self {
        Compressor { strategy }
    }

    fn compress(&self, data: &str) -> String {
        self.strategy.compress(data)
    }
}

fn main() {
    // Use different strategies
    let zip_strategy = Box::new(ZipCompression::new());
    let rar_strategy = Box::new(RarCompression::new());

    let compressor_zip = Compressor::new(zip_strategy);
    let compressor_rar = Compressor::new(rar_strategy);

    let data = "This is some data to compress.";

    println!("{}", compressor_zip.compress(data));
    println!("{}", compressor_rar.compress(data));
}
```