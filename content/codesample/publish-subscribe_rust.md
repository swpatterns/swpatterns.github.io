---
title: "Publish-Subscribe - Rust"
date: 2025-12-03T15:29:23.282-05:00
draft: false
pattern_usage: ["Publish-Subscribe"]
language: ["Rust"]
---
The Publish-Subscribe (Pub/Sub) pattern decouples message senders (publishers) from message receivers (subscribers). Publishers emit messages to a topic without knowing who, if anyone, is listening. Subscribers express interest in specific topics and receive messages published to those topics. This promotes loose coupling and scalability.

This Rust implementation uses the `crossbeam-channel` crate for thread-safe communication.  A `Publisher` holds a vector of channels, one for each subscriber.  Publishing sends a message to all subscriber channels.  A `Subscriber` registers with the publisher to receive messages on a dedicated channel.  The use of channels provides a concurrent and safe way to distribute messages.  This approach is idiomatic Rust due to its emphasis on ownership, borrowing, and concurrency safety through channels.

```rust
use crossbeam_channel::{unbounded, Sender, Receiver};
use std::sync::{Arc, Mutex};
use std::collections::HashMap;

struct Publisher {
    subscribers: Arc<Mutex<HashMap<String, Sender<String>>>>,
}

impl Publisher {
    fn new() -> Self {
        Publisher {
            subscribers: Arc::new(Mutex::new(HashMap::new())),
        }
    }

    fn subscribe(&self, topic: String) -> Receiver<String> {
        let (sender, receiver) = unbounded();
        let mut subscribers = self.subscribers.lock().unwrap();
        subscribers.insert(topic, sender);
        receiver
    }

    fn publish(&self, topic: String, message: String) {
        let subscribers = self.subscribers.lock().unwrap();
        if let Some(sender) = subscribers.get(&topic) {
            let _ = sender.send(message);
        }
    }
}

struct Subscriber {
    topic: String,
    receiver: Receiver<String>,
}

impl Subscriber {
    fn new(topic: String, receiver: Receiver<String>) -> Self {
        Subscriber { topic, receiver }
    }

    fn receive(&mut self) -> Option<String> {
        self.receiver.recv()
    }
}

fn main() {
    let publisher = Publisher::new();

    let receiver1 = publisher.subscribe("news".to_string());
    let subscriber1 = Subscriber::new("news".to_string(), receiver1);

    let receiver2 = publisher.subscribe("sports".to_string());
    let subscriber2 = Subscriber::new("sports".to_string(), receiver2);
    
    let receiver3 = publisher.subscribe("news".to_string());
    let subscriber3 = Subscriber::new("news".to_string(), receiver3);


    publisher.publish("news".to_string(), "Breaking news: Rust is awesome!".to_string());
    publisher.publish("sports".to_string(), "Local team wins championship!".to_string());

    if let Some(msg) = subscriber1.receive() {
        println!("Subscriber 1 (news) received: {}", msg);
    }
    if let Some(msg) = subscriber2.receive() {
        println!("Subscriber 2 (sports) received: {}", msg);
    }
    if let Some(msg) = subscriber3.receive() {
        println!("Subscriber 3 (news) received: {}", msg);
    }
}
```