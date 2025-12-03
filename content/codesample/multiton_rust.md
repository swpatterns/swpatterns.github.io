---
title: "Multiton - Rust"
date: 2025-12-03T11:10:01.644-05:00
draft: false
pattern_usage: ["Multiton"]
language: ["Rust"]
---
The Multiton pattern ensures that only a specific number of instances of a class exist. It's a relaxed version of the Singleton pattern, allowing for a limited concurrency or distribution of instances. This Rust implementation uses a `static` mutable vector to store the instances and a `Mutex` to provide thread-safe access. The `instance()` method retrieves an instance based on a key; if one doesn't exist, it creates it, respecting the maximum allowed count.  Rust's ownership and borrowing rules, combined with `Mutex`, naturally enforce safety when dealing with shared mutable state, making this a clean and effective approach.

```rust
use std::sync::{Mutex, Once};

struct MultitonInstance {
    id: u32,
}

impl MultitonInstance {
    fn new(id: u32) -> Self {
        MultitonInstance { id }
    }

    fn print_id(&self) {
        println!("Instance ID: {}", self.id);
    }
}

struct Multiton {
    instances: Mutex<Vec<MultitonInstance>>,
    max_instances: u32,
    next_id: Mutex<u32>,
    init: Once,
}

impl Multiton {
    fn new(max_instances: u32) -> Self {
        Multiton {
            instances: Mutex::new(Vec::new()),
            max_instances,
            next_id: Mutex::new(0),
            init: Once::new(),
        }
    }

    fn instance(&self, id: u32) -> Result<MultitonInstance, String> {
        self.init.call_once(|| {
            // Initialization logic can go here if needed.
        });

        let mut instances = self.instances.lock().unwrap();
        let mut next_id = self.next_id.lock().unwrap();

        if instances.len() < self.max_instances as usize {
            if *next_id < self.max_instances {
                let new_instance = MultitonInstance::new(*next_id);
                instances.push(new_instance);
                *next_id += 1;
                Ok(instances.iter().find(|i| i.id == *next_id -1).unwrap().clone())
            } else {
                Err("Maximum instances reached".to_string())
            }
        } else {
           
            if instances.iter().any(|i| i.id == id) {
                Ok(instances.iter().find(|i| i.id == id).unwrap().clone()) 
            } else {
                Err("Maximum instances reached".to_string())
            }
        }
    }
}

fn main() {
    let multiton = Multiton::new(3);

    match multiton.instance(0) {
        Ok(instance) => instance.print_id(),
        Err(e) => println!("{}", e),
    }
    match multiton.instance(1) {
        Ok(instance) => instance.print_id(),
        Err(e) => println!("{}", e),
    }
    match multiton.instance(2) {
        Ok(instance) => instance.print_id(),
        Err(e) => println!("{}", e),
    }
    match multiton.instance(3) {
        Ok(instance) => instance.print_id(),
        Err(e) => println!("{}", e),
    }
    match multiton.instance(0) {
        Ok(instance) => instance.print_id(),
        Err(e) => println!("{}", e),
    }
}
```