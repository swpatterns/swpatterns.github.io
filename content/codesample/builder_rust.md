---
title: "Builder - Rust"
date: 2025-12-03T10:54:41.724-05:00
draft: false
pattern_usage: ["Builder"]
language: ["Rust"]
---
The Builder pattern allows for the construction of complex objects step-by-step. It separates the object construction logic from its representation, enabling the creation of different variations of the object without altering the core construction process. This is achieved through a builder struct that holds the object's attributes and provides methods to set them. A final `build()` method then assembles the object.

The Rust implementation uses a `struct` for the builder, holding the fields of the target object. Methods on the builder return `self` to enable chaining.  The `build()` method consumes the builder and returns the constructed object. This approach leverages Rust's ownership and move semantics for safety and efficiency, and the fluent interface created by chaining methods is a common Rust idiom for configuration.

```rust
// Target object
#[derive(Debug)]
struct Computer {
    cpu: String,
    ram: u32,
    storage: String,
    has_gpu: bool,
}

// Builder struct
struct ComputerBuilder {
    cpu: String,
    ram: u32,
    storage: String,
    has_gpu: bool,
}

impl ComputerBuilder {
    fn new() -> Self {
        ComputerBuilder {
            cpu: String::from("Intel i5"),
            ram: 8,
            storage: String::from("HDD"),
            has_gpu: false,
        }
    }

    fn cpu(mut self, cpu: String) -> Self {
        self.cpu = cpu;
        self
    }

    fn ram(mut self, ram: u32) -> Self {
        self.ram = ram;
        self
    }

    fn storage(mut self, storage: String) -> Self {
        self.storage = storage;
        self
    }

    fn has_gpu(mut self, has_gpu: bool) -> Self {
        self.has_gpu = has_gpu;
        self
    }

    fn build(self) -> Computer {
        Computer {
            cpu: self.cpu,
            ram: self.ram,
            storage: self.storage,
            has_gpu: self.has_gpu,
        }
    }
}

fn main() {
    let gaming_pc = ComputerBuilder::new()
        .cpu(String::from("Intel i9"))
        .ram(32)
        .storage(String::from("SSD"))
        .has_gpu(true)
        .build();

    let office_pc = ComputerBuilder::new()
        .ram(16)
        .storage(String::from("SSD"))
        .build();

    println!("Gaming PC: {:?}", gaming_pc);
    println!("Office PC: {:?}", office_pc);
}
```