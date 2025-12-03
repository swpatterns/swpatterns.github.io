---
title: "Singleton - Rust"
date: 2025-12-03T11:06:32.471-05:00
draft: false
pattern_usage: ["Singleton"]
language: ["Rust"]
---
The Singleton pattern ensures a class has only one instance and provides a global point of access to it. In Rust, this is commonly achieved using `static` combined with lazy initialization via `lazy_static`. This avoids unsafe mutable global state. Our code defines a `Logger` struct and uses `lazy_static` to create a single, globally accessible instance. The `log_message` function allows logging through this unique instance. This approach suits Rust's ownership and borrowing rules, and avoids data races by ensuring safe, thread-safe initialization.  Using a static ensures the instance exists for the program's duration.

```rust
use lazy_static::lazy_static;
use std::sync::Mutex;

#[derive(Debug)]
struct Logger {
    log_entries: Vec<String>,
}

impl Logger {
    fn new() -> Self {
        Logger { log_entries: Vec::new() }
    }

    fn log_message(&mut self, message: String) {
        self.log_entries.push(message);
        println!("Logged: {}", message);
    }

    fn get_log_entries(&self) -> &Vec<String> {
        &self.log_entries
    }
}

lazy_static! {
    static ref LOGGER: Mutex<Logger> = Mutex::new(Logger::new());
}

fn get_logger() -> std::sync::MutexGuard<'static, Logger> {
    LOGGER.lock().unwrap()
}

fn main() {
    let mut logger1 = get_logger();
    logger1.log_message("This is the first log message.".to_string());

    let mut logger2 = get_logger();
    logger2.log_message("This is the second log message.".to_string());

    let log_entries = logger2.get_log_entries();
    println!("Log Entries: {:?}", log_entries);
}
```