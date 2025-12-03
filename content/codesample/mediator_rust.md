---
title: "Mediator - Rust"
date: 2025-12-03T13:16:21.370-05:00
draft: false
pattern_usage: ["Mediator"]
language: ["Rust"]
---
The Mediator pattern defines an object that encapsulates how a set of objects interact. It promotes loose coupling by preventing objects from referring to each other explicitly, and instead, they communicate through the mediator. This centralizes control and simplifies object interactions.

The Rust code implements a `ChatRoom` as the Mediator.  `Person` structs represent the participants, and they only know the `ChatRoom`.  Instead of directly messaging each other, they `send_message` to the `ChatRoom`, which then relays the message to all other `Person` instances. This uses Rust’s ownership and borrowing rules naturally, avoiding data races when updating shared state within the `ChatRoom`. The use of `Arc<Mutex<>>` enables safe shared mutable access to the list of participants.



```rust
use std::sync::{Arc, Mutex};
use std::collections::HashMap;

// Mediator Interface
trait Mediator {
    fn send_message(&self, message: String, sender: String);
}

// Concrete Mediator
struct ChatRoom {
    participants: Arc<Mutex<HashMap<String, Person>>>,
}

impl ChatRoom {
    fn new() -> Self {
        ChatRoom {
            participants: Arc::new(Mutex::new(HashMap::new())),
        }
    }
}

impl Mediator for ChatRoom {
    fn send_message(&self, message: String, sender: String) {
        let participants = self.participants.lock().unwrap();
        for (name, person) in participants.iter() {
            if name != &sender {
                person.receive_message(message.clone(), sender.clone());
            }
        }
    }
}

// Colleague Interface
trait Colleague {
    fn set_mediator(&mut self, mediator: &ChatRoom);
    fn send_message(&self, message: String);
    fn receive_message(&mut self, message: String, sender: String);
}

// Concrete Colleague
struct Person {
    name: String,
    mediator: Option<Arc<ChatRoom>>,
}

impl Person {
    fn new(name: String) -> Self {
        Person {
            name,
            mediator: None,
        }
    }
}

impl Colleague for Person {
    fn set_mediator(&mut self, mediator: &ChatRoom) {
        self.mediator = Some(Arc::new(mediator.clone()));
    }

    fn send_message(&self, message: String) {
        if let Some(mediator) = &self.mediator {
            mediator.send_message(message, self.name.clone());
        }
    }

    fn receive_message(&mut self, message: String, sender: String) {
        println!("{}: {} said: {}", self.name, sender, message);
    }
}

fn main() {
    let chat_room = ChatRoom::new();

    let alice = Arc::new(Person::new("Alice".to_string()));
    let bob = Arc::new(Person::new("Bob".to_string()));
    let charlie = Arc::new(Person::new("Charlie".to_string()));

    let mut participants = chat_room.participants.lock().unwrap();
    participants.insert(alice.name.clone(), alice.clone());
    participants.insert(bob.name.clone(), bob.clone());
    participants.insert(charlie.name.clone(), charlie.clone());
    drop(participants); // Release the lock

    alice.send_message("Hello everyone!".to_string());
    bob.send_message("Hi Alice!".to_string());
    charlie.send_message("Hey guys!".to_string());
}
```