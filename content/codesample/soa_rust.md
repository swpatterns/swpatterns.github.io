---
title: "SOA - Rust"
date: 2025-12-03T14:48:49.090-05:00
draft: false
pattern_usage: ["SOA"]
language: ["Rust"]
---
The Service-Oriented Architecture (SOA) pattern structures an application as a collection of loosely coupled, independent services. Each service encapsulates a specific business capability and communicates with others through well-defined interfaces, often using messages. This promotes modularity, reusability, and independent deployment.

The Rust code demonstrates a simplified SOA with two services: `Greeter` and `Logger`. `Greeter` provides a greeting service, and `Logger` logs messages. They communicate via trait objects (`dyn`) allowing for flexibility.  The `main` function orchestrates these services.  Using traits for service interfaces is idiomatic Rust, enabling polymorphism and decoupling.  The `Box<dyn>` type is used for dynamic dispatch, common in SOA implementations where service types aren't known at compile time.  Error handling uses `Result` for robustness, a core Rust principle.

```rust
// Define the service trait
trait Service {
    fn execute(&self, data: &str) -> Result<(), String>;
}

// Greeter service
struct Greeter {
    greeting: String,
}

impl Greeter {
    fn new(greeting: String) -> Self {
        Greeter { greeting }
    }
}

impl Service for Greeter {
    fn execute(&self, name: &str) -> Result<(), String> {
        println!("{} {}!", self.greeting, name);
        Ok(())
    }
}

// Logger service
struct Logger {
    log_file: String,
}

impl Logger {
    fn new(log_file: String) -> Self {
        Logger { log_file }
    }
}

impl Service for Logger {
    fn execute(&self, message: &str) -> Result<(), String> {
        std::fs::write(&self.log_file, format!("{}\n", message))?;
        println!("Logged message to {}", self.log_file);
        Ok(())
    }
}

fn main() -> Result<(), String> {
    let greeter = Greeter::new("Hello".to_string());
    let logger = Logger::new("app.log".to_string());

    let services: Vec<Box<dyn Service>> = vec![Box::new(greeter), Box::new(logger)];

    for service in services {
        if let Err(e) = service.execute("World") {
            eprintln!("Service execution failed: {}", e);
        }
    }

    Ok(())
}
```