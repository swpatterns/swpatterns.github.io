---
title: "Abstract Factory - Rust"
date: 2025-12-03T10:50:09.138-05:00
draft: false
pattern_usage: ["Abstract Factory"]
language: ["Rust"]
---
The Abstract Factory pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes. It's a creational pattern that promotes loose coupling and allows for easy switching between different "themes" or variations of objects.

This Rust implementation defines traits `Chair` and `Table` representing product families. `FurnitureFactory` is the abstract factory trait with a method to create both a `Chair` and a `Table`.  Concrete factories, `ModernFurnitureFactory` and `VintageFurnitureFactory`, implement this trait, providing specific implementations for each product.  The client code interacts with the factory interface, not the concrete classes, enabling flexibility and maintainability.  Rust's traits and ownership system naturally support this pattern, promoting compile-time safety and clear interfaces.

```rust
// Define product families
trait Chair {
    fn sit(&self);
}

trait Table {
    fn place_on(&self);
}

// Concrete products for Modern furniture
struct ModernChair;

impl Chair for ModernChair {
    fn sit(&self) {
        println!("Sitting on a modern chair.");
    }
}

struct ModernTable;

impl Table for ModernTable {
    fn place_on(&self) {
        println!("Placing items on a modern table.");
    }
}

// Concrete products for Vintage furniture
struct VintageChair;

impl Chair for VintageChair {
    fn sit(&self) {
        println!("Sitting on a vintage chair.");
    }
}

struct VintageTable;

impl Table for VintageTable {
    fn place_on(&self) {
        println!("Placing items on a vintage table.");
    }
}

// Abstract Factory
trait FurnitureFactory {
    fn create_chair(&self) -> Box<dyn Chair>;
    fn create_table(&self) -> Box<dyn Table>;
}

// Concrete Factory for Modern furniture
struct ModernFurnitureFactory;

impl FurnitureFactory for ModernFurnitureFactory {
    fn create_chair(&self) -> Box<dyn Chair> {
        Box::new(ModernChair)
    }

    fn create_table(&self) -> Box<dyn Table> {
        Box::new(ModernTable)
    }
}

// Concrete Factory for Vintage furniture
struct VintageFurnitureFactory;

impl FurnitureFactory for VintageFurnitureFactory {
    fn create_chair(&self) -> Box<dyn Chair> {
        Box::new(VintageChair)
    }

    fn create_table(&self) -> Box<dyn Table> {
        Box::new(VintageTable)
    }
}

fn main() {
    // Client code
    let modern_factory = ModernFurnitureFactory;
    let modern_chair = modern_factory.create_chair();
    let modern_table = modern_factory.create_table();

    modern_chair.sit();
    modern_table.place_on();

    let vintage_factory = VintageFurnitureFactory;
    let vintage_chair = vintage_factory.create_chair();
    let vintage_table = vintage_factory.create_table();

    vintage_chair.sit();
    vintage_table.place_on();
}
```