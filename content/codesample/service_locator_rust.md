---
title: "Service Locator - Rust"
date: 2025-12-03T11:24:34.945-05:00
draft: false
pattern_usage: ["Service Locator"]
language: ["Rust"]
---
The Service Locator pattern provides a centralized way to access various services within an application. Instead of directly depending on concrete implementations, components request services from a central registry (the locator). This promotes loose coupling and makes it easier to swap out implementations.

The Rust implementation uses a `ServiceLocator` struct holding a `HashMap` to store services identified by keys (strings). The `provide` method registers a service, and the `get` method retrieves it, potentially panicking if not found. Using a `HashMap` is a common, efficient way to manage these lookups in Rust.  The pattern leverages Rust’s ownership and borrowing to ensure services aren’t accidentally dropped while being accessed.  Traits are key here, enabling flexible service registration and retrieval based on types rather than concrete structures.

```rust
use std::collections::HashMap;

// Define a trait for our services
trait Service {
    fn execute(&self);
}

// Concrete service implementations
struct LoggingService;

impl Service for LoggingService {
    fn execute(&self) {
        println!("Logging to file...");
    }
}

struct AnalyticsService;

impl Service for AnalyticsService {
    fn execute(&self) {
        println!("Sending analytics data...");
    }
}

// The Service Locator
struct ServiceLocator {
    services: HashMap<String, Box<dyn Service>>,
}

impl ServiceLocator {
    fn new() -> Self {
        ServiceLocator {
            services: HashMap::new(),
        }
    }

    fn provide<T: Service>(&mut self, name: &str, service: T) {
        self.services.insert(name.to_string(), Box::new(service));
    }

    fn get<T: Service>(&self, name: &str) -> &T {
        self.services
            .get(name)
            .expect(&format!("Service with name '{}' not found", name))
            .as_ref()
    }
}

fn main() {
    let mut locator = ServiceLocator::new();
    locator.provide("logger", LoggingService);
    locator.provide("analytics", AnalyticsService);

    let logger = locator.get::<LoggingService>("logger");
    logger.execute();

    let analytics = locator.get::<AnalyticsService>("analytics");
    analytics.execute();
}
```