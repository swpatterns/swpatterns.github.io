---
title: "Specification - Rust"
date: 2025-12-03T13:52:32.606-05:00
draft: false
pattern_usage: ["Specification"]
language: ["Rust"]
---
The Specification pattern is a functional approach to defining complex logic through composable predicates. Instead of embedding conditions directly within code, it encapsulates them as objects (in this case, structs with a call operator) that can be combined using logical operators like `and`, `or`, and `not`. This promotes code reusability, readability, and easier testing.

The Rust implementation uses structs to represent the specifications and implements the `Fn` trait to make them callable as functions that return a boolean.  The `and`, `or`, and `not` functions return new specification instances, composing the logic. This leverages Rust's strong type system and functional capabilities for a concise and type-safe solution.  The use of closures for the specification logic is idiomatic Rust.

```rust
// Specification pattern in Rust

#[derive(Debug)]
struct Specification<T> {
    predicate: Box<dyn Fn(&T) -> bool>,
}

impl<T> Specification<T> {
    fn new(predicate: impl Fn(&T) -> bool + 'static) -> Self {
        Specification {
            predicate: Box::new(predicate),
        }
    }

    fn and<U>(self, other: Specification<U>) -> Specification<U>
    where
        T: AsRef<U>,
    {
        Specification::new(move |item: &U| self.predicate(item.as_ref()) && other.predicate(item))
    }

    fn or<U>(self, other: Specification<U>) -> Specification<U>
    where
        T: AsRef<U>,
    {
        Specification::new(move |item: &U| self.predicate(item.as_ref()) || other.predicate(item))
    }

    fn not(self) -> Specification<T> {
        Specification::new(move |item: &T| !self.predicate(item))
    }

    fn is_satisfied_by(&self, item: &T) -> bool {
        (self.predicate)(item)
    }
}

fn main() {
    struct Person {
        name: String,
        age: u32,
    }

    let is_adult = Specification::new(|p: &Person| p.age >= 18);
    let is_named_alice = Specification::new(|p: &Person| p.name == "Alice");

    let is_adult_alice = is_adult.and(is_named_alice);

    let person1 = Person { name: "Alice".to_string(), age: 25 };
    let person2 = Person { name: "Bob".to_string(), age: 15 };

    println!("Person 1 is adult and named Alice: {}", is_adult_alice.is_satisfied_by(&person1)); // true
    println!("Person 2 is adult and named Alice: {}", is_adult_alice.is_satisfied_by(&person2)); // false

    let is_not_adult = is_adult.not();
    println!("Person 1 is not an adult: {}", is_not_adult.is_satisfied_by(&person1)); // false
    println!("Person 2 is not an adult: {}", is_not_adult.is_satisfied_by(&person2)); // true
}
```