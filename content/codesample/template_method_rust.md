---
title: "Template Method - Rust"
date: 2025-12-03T13:38:55.344-05:00
draft: false
pattern_usage: ["Template Method"]
language: ["Rust"]
---
The Template Method pattern defines the skeleton of an algorithm in a base class, deferring some steps to subclasses. It allows subclasses to redefine certain steps of an algorithm without changing the algorithm's structure. This promotes code reuse and avoids duplication.

The Rust implementation uses traits to define the abstract algorithm (the template) and requires concrete implementations of the varying steps via methods within the trait.  A concrete class then implements the trait, providing the specific logic for the abstract methods. This leverages Rust's trait system for polymorphism and ensures that all necessary steps are implemented. The use of `Self` in the trait methods is idiomatic for referring to the implementing type.

```rust
// Define the abstract template method
trait Algorithm {
    fn step1(&self) -> String;
    fn step2(&self) -> String;
    fn step3(&self) -> String;

    // The template method itself - defines the algorithm's structure
    fn run(&self) -> String {
        let result = self.step1();
        println!("{}", result);
        let result = self.step2();
        println!("{}", result);
        let result = self.step3();
        println!("{}", result);
        "Algorithm completed".to_string()
    }
}

// Concrete implementation 1
struct ConcreteAlgorithmA;

impl Algorithm for ConcreteAlgorithmA {
    fn step1(&self) -> String {
        "ConcreteAlgorithmA - Step 1".to_string()
    }

    fn step2(&self) -> String {
        "ConcreteAlgorithmA - Step 2".to_string()
    }

    fn step3(&self) -> String {
        "ConcreteAlgorithmA - Step 3".to_string()
    }
}

// Concrete implementation 2
struct ConcreteAlgorithmB;

impl Algorithm for ConcreteAlgorithmB {
    fn step1(&self) -> String {
        "ConcreteAlgorithmB - Step 1".to_string()
    }

    fn step2(&self) -> String {
        "ConcreteAlgorithmB - Step 2".to_string()
    }

    fn step3(&self) -> String {
        "ConcreteAlgorithmB - Step 3".to_string()
    }
}

fn main() {
    let algo_a = ConcreteAlgorithmA;
    let algo_b = ConcreteAlgorithmB;

    algo_a.run();
    algo_b.run();
}
```