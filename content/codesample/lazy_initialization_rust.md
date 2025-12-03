---
title: "Lazy Initialization - Rust"
date: 2025-12-03T11:17:38.102-05:00
draft: false
pattern_usage: ["Lazy Initialization"]
language: ["Rust"]
---
The Lazy Initialization pattern ensures that the creation of a resource-intensive object is deferred until it's actually needed (accessed) for the first time. Subsequent accesses then return the already created instance. This avoids unnecessary initialization overhead, improving performance especially if the object is not always used.

The Rust code uses `std::sync::Once` to guarantee thread-safe, single initialization. The `static` variable `lazy_value` holds an `Option` to represent whether the value has been initialized. `Once::call_once` ensures the closure for initialization is only executed once, regardless of how many threads attempt to initialize it concurrently. The `unwrap()` call within the closure is safe because `call_once` guarantees its exclusivity. This leverages Rust’s ownership and borrowing rules for memory safety during concurrent initialization.

```rust
use std::sync::{Once, Mutex};

static INIT: Once = Once::new();
static lazy_value: Mutex<Option<String>> = Mutex::new(None);

fn get_lazy_value() -> String {
    INIT.call_once(|| {
        let mut guard = lazy_value.lock().unwrap();
        *guard = Some(String::from("This is a lazily initialized value."));
    });

    let guard = lazy_value.lock().unwrap();
    guard.as_ref().unwrap().clone()
}

fn main() {
    println!("First access:");
    println!("{}", get_lazy_value());

    println!("Second access:");
    println!("{}", get_lazy_value());
}
```