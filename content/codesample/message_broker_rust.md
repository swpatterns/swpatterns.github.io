---
title: "Message Broker - Rust"
date: 2025-12-03T15:08:56.255-05:00
draft: false
pattern_usage: ["Message Broker"]
language: ["Rust"]
---
The Message Broker pattern decouples application components by enabling them to communicate asynchronously through a central message intermediary, the broker. This promotes scalability and resilience. The Rust implementation uses channels (specifically `mpsc` - multiple producer, single consumer) to simulate the broker. Producers send messages to the broker's transmitting end, and the consumer receives them from the receiving end. This example demonstrates a simple broker with a string message type. It’s idiomatic Rust because it leverages ownership and borrowing through the channel, ensuring memory safety, and avoids shared mutable state, aligning with Rust’s concurrency model. The use of `move` ensures ownership is transferred to the thread.

```rust
use std::sync::mpsc;
use std::thread;

// Define a type for a message handler (function pointer)
type MessageHandler = fn(&str);

struct MessageBroker {
    sender: mpsc::Sender<String>,
}

impl MessageBroker {
    fn new() -> Self {
        let (sender, receiver) = mpsc::channel();

        // Spawn a thread to handle incoming messages
        thread::spawn(move || {
            let mut handlers: Vec<MessageHandler> = Vec::new();

            // Example handler registration (could be more dynamic)
            handlers.push(|msg| println!("Handler 1 received: {}", msg));
            handlers.push(|msg| println!("Handler 2 received: {}", msg));
            
            for msg in receiver {
                for handler in &handlers {
                    handler(&msg);
                }
            }
        });

        MessageBroker { sender }
    }

    fn publish(&self, message: String) {
        self.sender.send(message).unwrap();
    }
}

fn main() {
    let broker = MessageBroker::new();

    broker.publish("Hello, world!".to_string());
    broker.publish("Another message!".to_string());
    broker.publish("Rust message broker example".to_string());
    
    // Keep the main thread alive long enough for the broker thread to process messages.
    thread::sleep(std::time::Duration::from_millis(100));
}
```