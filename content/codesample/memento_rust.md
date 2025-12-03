---
title: "Memento - Rust"
date: 2025-12-03T13:21:11.447-05:00
draft: false
pattern_usage: ["Memento"]
language: ["Rust"]
---
The Memento pattern captures and externalizes the internal state of an object without violating encapsulation. This allows restoring an object to a previous state. Here, a `Gist` struct holds the text content, and the `GistMemento` stores a snapshot of that content at a specific time. The `Gist` provides a method to create a memento, and `GistMemento` only allows access to its state by the original `Gist` object. This protects the state integrity. The implementation is idiomatic Rust as it leverages ownership, borrowing, and `struct`s to naturally enforce the required access control and immutability where appropriate.

```rust
// Memento Interface
trait Memento {
    fn get_state(&self) -> String;
}

// Originator
struct Gist {
    content: String,
}

impl Gist {
    fn new(initial_content: String) -> Self {
        Gist { content: initial_content }
    }

    fn get_content(&self) -> &String {
        &self.content
    }

    fn set_content(&mut self, new_content: String) {
        self.content = new_content;
    }

    // Creates a memento containing the current state.
    fn create_memento(&self) -> GistMemento {
        GistMemento { state: self.content.clone() }
    }

    // Restores the state from a memento.  Only the originator can do this.
    fn restore_from_memento(&mut self, memento: &GistMemento) {
        self.content = memento.get_state().clone();
    }
}

// Memento Implementation
struct GistMemento {
    state: String,
}

impl GistMemento {
    fn get_state(&self) -> String {
        self.state.clone()
    }
}

// Caretaker (Optional - manages mementos)
struct GistHistory {
    mementos: Vec<GistMemento>,
}

impl GistHistory {
    fn new() -> Self {
        GistHistory { mementos: Vec::new() }
    }

    fn add_memento(&mut self, memento: GistMemento) {
        self.mementos.push(memento);
    }

    fn get_latest_memento(&self) -> Option<&GistMemento> {
        self.mementos.last()
    }
}

fn main() {
    let mut gist = Gist::new("Initial content.".to_string());
    let mut history = GistHistory::new();

    println!("Initial content: {}", gist.get_content());

    gist.set_content("First edit.".to_string());
    history.add_memento(gist.create_memento());
    println!("First edit: {}", gist.get_content());

    gist.set_content("Second edit.".to_string());
    history.add_memento(gist.create_memento());
    println!("Second edit: {}", gist.get_content());

    // Rollback to the first edit
    if let Some(memento) = history.get_latest_memento() {
        gist.restore_from_memento(memento);
        println!("Rolled back to: {}", gist.get_content());
    }
}
```