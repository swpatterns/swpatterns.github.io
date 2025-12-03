---
title: "Chain of Responsibility - Rust"
date: 2025-12-03T12:58:01.368-05:00
draft: false
pattern_usage: ["Chain of Responsibility"]
language: ["Rust"]
---
The Chain of Responsibility pattern promotes decoupling the sender of a request from its receivers by passing the request along a chain of handlers. Each handler decides either to process the request or to pass it to the next handler in the chain. This allows for flexible request processing without tightly coupling the request to its specific handler.

The Rust implementation uses traits to define the handler interface, with a `next` field in the struct holding the next handler.  The `handle` method attempts to process the request, and if unsuccessful, recursively calls `handle` on the `next` handler. Ownership is handled via `Box<dyn Handler>` to allow for polymorphism and avoid concrete type coupling in the chain. This approach aligns well with Rust's ownership and borrow checking system, allowing a clean, type-safe implementation.

```rust
trait Handler {
    fn handle(&mut self, request: i32) -> Option<String>;
    fn set_next(&mut self, next: Box<dyn Handler>);
}

struct ConcreteHandlerA {
    next: Option<Box<dyn Handler>>,
}

impl ConcreteHandlerA {
    fn new() -> Self {
        ConcreteHandlerA { next: None }
    }
}

impl Handler for ConcreteHandlerA {
    fn handle(&mut self, request: i32) -> Option<String> {
        if request <= 10 {
            Some("Handler A handled the request".to_string())
        } else {
            self.next.as_mut().and_then(|next| next.handle(request))
        }
    }

    fn set_next(&mut self, next: Box<dyn Handler>) {
        self.next = Some(next);
    }
}

struct ConcreteHandlerB {
    next: Option<Box<dyn Handler>>,
}

impl ConcreteHandlerB {
    fn new() -> Self {
        ConcreteHandlerB { next: None }
    }
}

impl Handler for ConcreteHandlerB {
    fn handle(&mut self, request: i32) -> Option<String> {
        if request <= 50 {
            Some("Handler B handled the request".to_string())
        } else {
            self.next.as_mut().and_then(|next| next.handle(request))
        }
    }

    fn set_next(&mut self, next: Box<dyn Handler>) {
        self.next = Some(next);
    }
}

fn main() {
    let mut handler_a = ConcreteHandlerA::new();
    let mut handler_b = ConcreteHandlerB::new();

    handler_a.set_next(Box::new(handler_b));

    let request1 = 5;
    let result1 = handler_a.handle(request1);
    println!("Request 1: {:?}", result1);

    let request2 = 25;
    let result2 = handler_a.handle(request2);
    println!("Request 2: {:?}", result2);

    let request3 = 60;
    let result3 = handler_a.handle(request3);
    println!("Request 3: {:?}", result3);
}
```