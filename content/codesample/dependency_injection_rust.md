---
title: "Dependency Injection - Rust"
date: 2025-12-03T11:20:51.951-05:00
draft: false
pattern_usage: ["Dependency Injection"]
language: ["Rust"]
---
Dependency Injection (DI) is a design pattern where a class receives its dependencies from external sources rather than creating them itself. This promotes loose coupling, making the code more testable, maintainable, and reusable. Our Rust example uses a simple struct `NotificationService` that requires a `MessageSender` to function. Instead of `NotificationService` creating the `MessageSender`, we pass it in during initialization.  This is achieved through the `new` function accepting a `MessageSender` as an argument.  Rust's ownership and borrowing system naturally supports DI, and using traits like `MessageSender` allows for flexible implementations. This approach aligns with Rust's emphasis on explicit dependencies and immutability.

```rust
// Define a trait for sending messages.  This is the dependency.
trait MessageSender {
    fn send(&self, message: &str);
}

// A concrete implementation of MessageSender (e.g., sending to console).
struct ConsoleMessageSender;

impl ConsoleMessageSender {
    fn new() -> Self {
        ConsoleMessageSender {}
    }
}

impl MessageSender for ConsoleMessageSender {
    fn send(&self, message: &str) {
        println!("Sending message to console: {}", message);
    }
}

// The service that *depends* on a MessageSender.
struct NotificationService {
    sender: Box<dyn MessageSender>, // Use Box to handle ownership
}

impl NotificationService {
    // Dependency is injected via the constructor.
    fn new(sender: Box<dyn MessageSender>) -> Self {
        NotificationService { sender }
    }

    fn send_notification(&self, message: &str) {
        self.sender.send(message);
    }
}

fn main() {
    // Create a concrete dependency.
    let sender = Box::new(ConsoleMessageSender::new());

    // Inject the dependency into the service.
    let notification_service = NotificationService::new(sender);

    // Use the service.
    notification_service.send_notification("Hello, world!");
}
```