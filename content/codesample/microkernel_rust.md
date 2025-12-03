---
title: "Microkernel - Rust"
date: 2025-12-03T14:22:39.793-05:00
draft: false
pattern_usage: ["Microkernel"]
language: ["Rust"]
---
The Microkernel pattern structures an application as a core kernel providing minimal services and communicating with higher-level “services” through well-defined interfaces. This promotes modularity, flexibility, and fault isolation. The Rust code demonstrates this by defining a core `Kernel` which handles basic message passing.  Separate `Service` structs (e.g., `FileSystem`, `Network`) implement specific functionalities and register with the kernel.  Communication happens via `Message` enums and a shared message channel (`mpsc`).

This implementation leverages Rust’s ownership system and message passing concurrency to enforce strong isolation between services and the kernel.  The use of traits (`Service`) provides a flexible, extensible system for adding new functionalities without modifying the core kernel. `Arc` is used for shared ownership of the channel.  This style is idiomatic for Rust, as it encourages explicit dependency management and safe concurrency.

```rust
use std::sync::mpsc::{self, Sender, Receiver};
use std::sync::Arc;

// Define the messages the kernel and services can exchange.
#[derive(Debug, Clone)]
enum Message {
    ReadRequest(String),
    WriteRequest(String, String),
    ReadResponse(String),
    WriteResponse(bool),
    // Add more messages as needed
}

// Define the trait for services that will interact with the kernel.
trait Service {
    fn handle_message(&mut self, message: Message, reply_tx: Sender<Message>);
}

// Example File System Service
struct FileSystem {
    //internal file storage (in memory for demonstration)
    files: std::collections::HashMap<String, String>,
}

impl FileSystem {
    fn new() -> Self {
        FileSystem { files: std::collections::HashMap::new() }
    }
}

impl Service for FileSystem {
    fn handle_message(&mut self, message: Message, reply_tx: Sender<Message>) {
        match message {
            Message::ReadRequest(filename) => {
                if let Some(content) = self.files.get(&filename) {
                    reply_tx.send(Message::ReadResponse(content.clone())).unwrap();
                } else {
                    reply_tx.send(Message::ReadResponse("File not found".to_string())).unwrap();
                }
            }
            Message::WriteRequest(filename, content) => {
                self.files.insert(filename, content);
                reply_tx.send(Message::WriteResponse(true)).unwrap();
            }
            _ => {}
        }
    }
}

// Example Network Service
struct Network {}

impl Network {
    fn new() -> Self {
        Network {}
    }
}

impl Service for Network {
    fn handle_message(&mut self, message: Message, reply_tx: Sender<Message>) {
        match message {
            _ => reply_tx.send(Message::WriteResponse(false)).unwrap(),
        }
    }
}

// The Kernel
struct Kernel {
    services: std::collections::HashMap<String, Box<dyn Service>>,
    rx: Receiver<Message>,
}

impl Kernel {
    fn new(rx: Receiver<Message>) -> Self {
        Kernel {
            services: std::collections::HashMap::new(),
            rx,
        }
    }

    fn register_service(&mut self, name: String, service: Box<dyn Service>) {
        self.services.insert(name, service);
    }

    fn run(&mut self) {
        loop {
            let message = self.rx.recv().unwrap();
            println!("Kernel received: {:?}", message);

            // In a real system, this would dispatch based on the message type.
            // For simplicity, we just broadcast to all services.
            for (_name, service) in &mut self.services {
                let reply_tx = self.rx.clone(); //Clone so that each service has its own sender
                service.handle_message(message.clone(), reply_tx);
            }
        }
    }
}

fn main() {
    let (tx, rx) = mpsc::channel();

    let mut kernel = Kernel::new(rx);

    //Register some services
    kernel.register_service("filesystem".to_string(), Box::new(FileSystem::new()));
    kernel.register_service("network".to_string(), Box::new(Network::new()));

    // Send some messages from the outside world.
    tx.send(Message::WriteRequest("my_file.txt".to_string(), "Hello, world!".to_string())).unwrap();
    tx.send(Message::ReadRequest("my_file.txt".to_string())).unwrap();

    kernel.run();
}
```