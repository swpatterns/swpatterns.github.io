---
title: "State - Rust"
date: 2025-12-03T13:30:00.962-05:00
draft: false
pattern_usage: ["State"]
language: ["Rust"]
---
The State pattern allows an object to alter its behavior when its internal state changes. It encapsulates different states into separate classes and provides a way to transition between them. This avoids using numerous conditional statements to handle state-specific logic.

The Rust code defines an enum `State` representing the possible states of a context.  A `Context` struct holds the current state and delegates behavior to it.  Each state is implemented as a trait object, allowing dynamic state switching. The code exemplifies simple state transitions and demonstrates how context behavior depends upon the currently active state. This approach leverages Rust's ownership and borrowing system, along with trait objects for polymorphism, making it both safe and idiomatic for managing complex stateful behavior.

```rust
trait State {
    fn handle(&self, context: &mut Context);
}

struct ConcreteStateA;

impl State for ConcreteStateA {
    fn handle(&self, context: &mut Context) {
        println!("State A handling request.");
        context.set_state(Box::new(ConcreteStateB));
    }
}

struct ConcreteStateB;

impl State for ConcreteStateB {
    fn handle(&self, context: &mut Context) {
        println!("State B handling request.");
        context.set_state(Box::new(ConcreteStateA));
    }
}

struct Context {
    state: Box<dyn State>,
}

impl Context {
    fn new() -> Self {
        Context {
            state: Box::new(ConcreteStateA),
        }
    }

    fn set_state(&mut self, state: Box<dyn State>) {
        self.state = state;
    }

    fn handle_request(&mut self) {
        self.state.handle(self);
    }
}

fn main() {
    let mut context = Context::new();
    context.handle_request();
    context.handle_request();
    context.handle_request();
}
```