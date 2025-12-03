---
title: "Space-Based Architecture - Rust"
date: 2025-12-03T14:58:48.853-05:00
draft: false
pattern_usage: ["Space-Based Architecture"]
language: ["Rust"]
---
The Space-Based Architecture pattern decouples components of a system by using a message bus (or "space") as the central communication hub. Components, known as "agents," publish and subscribe to messages on this bus without direct knowledge of each other. This promotes loose coupling, scalability, and flexibility.

This Rust implementation uses the `crossbeam-channel` crate to create a multi-producer, multi-consumer channel acting as the message bus.  Agents are represented by structs that hold a sender to publish messages.  A simple `Message` enum defines the types of messages that can be sent.  The `main` function creates agents and a receiver thread to process messages. This approach is idiomatic Rust due to its emphasis on ownership, message passing concurrency, and the use of crates for specific functionality.  The `crossbeam-channel` provides a safe and efficient way to handle concurrent communication.

```rust
use crossbeam_channel::{unbounded, Receiver, Sender};
use std::thread;

// Define the messages that can be sent on the bus
#[derive(Debug)]
enum Message {
    Data(i32),
    Shutdown,
}

// Represents an agent that can publish messages
struct Agent {
    sender: Sender<Message>,
}

impl Agent {
    fn new(sender: Sender<Message>) -> Self {
        Agent { sender }
    }

    fn send_data(&self, data: i32) {
        self.sender.send(Message::Data(data)).unwrap();
    }

    fn send_shutdown(&self) {
        self.sender.send(Message::Shutdown).unwrap();
    }
}

fn main() {
    let (sender, receiver) = unbounded();

    // Create agents
    let agent1 = Agent::new(sender.clone());
    let agent2 = Agent::new(sender.clone());

    // Spawn a receiver thread to process messages
    let receiver_thread = thread::spawn(move || {
        for message in receiver {
            match message {
                Message::Data(data) => println!("Received data: {}", data),
                Message::Shutdown => {
                    println!("Shutting down receiver...");
                    break;
                }
            }
        }
    });

    // Agents send messages
    agent1.send_data(10);
    agent2.send_data(20);
    agent1.send_data(30);

    // Signal shutdown
    agent1.send_shutdown();
    agent2.send_shutdown(); // Important to send shutdown from all agents.

    // Wait for the receiver thread to finish
    receiver_thread.join().unwrap();

    println!("All agents finished.");
}
```