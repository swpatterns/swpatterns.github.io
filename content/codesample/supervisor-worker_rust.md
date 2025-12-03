---
title: "Supervisor-Worker - Rust"
date: 2025-12-03T15:37:02.141-05:00
draft: false
pattern_usage: ["Supervisor-Worker"]
language: ["Rust"]
---
The Supervisor-Worker pattern decouples task management (the Supervisor) from task execution (the Workers). The Supervisor distributes work to a pool of Workers, typically via a channel. This allows for concurrency, resilience (workers can fail independently), and scalability.

This Rust implementation uses `std::thread` for worker threads and `std::sync::mpsc` for message passing. The `Supervisor` spawns a fixed number of `Worker` threads, each receiving a channel endpoint. Tasks (represented as strings here) are sent to the workers through a shared channel. The workers handle and print the tasks.  Rust’s ownership and borrowing system manage data safety between threads, eliminating the need for explicit locks in this simple case. The use of channels provides a clear, idiomatic way to pass data between threads without shared mutable state.

```rust
use std::sync::mpsc;
use std::thread;

const NUM_WORKERS = 4;

struct Supervisor {
    tx: mpsc::Sender<String>,
}

impl Supervisor {
    fn new(rx_ends: Vec<mpsc::Receiver<String>>) -> Self {
        let (tx, _) = mpsc::channel();
        for rx in rx_ends {
            thread::spawn(move || {
                Worker::new(rx);
            });
        }
        Supervisor { tx }
    }

    fn dispatch(&self, task: String) {
        self.tx.send(task).unwrap();
    }
}

struct Worker {
    rx: mpsc::Receiver<String>,
}

impl Worker {
    fn new(rx: mpsc::Receiver<String>) {
        loop {
            match rx.recv() {
                Ok(task) => {
                    println!("Worker processing task: {}", task);
                    // Simulate work
                    std::thread::sleep(std::time::Duration::from_millis(500));
                }
                Err(_) => {
                    println!("Worker shutting down");
                    break;
                }
            }
        }
    }
}

fn main() {
    let mut rx_ends = Vec::new();
    for _ in 0..NUM_WORKERS {
        let (tx, rx) = mpsc::channel();
        rx_ends.push(rx);
    }

    let supervisor = Supervisor::new(rx_ends);

    supervisor.dispatch("Task 1".to_string());
    supervisor.dispatch("Task 2".to_string());
    supervisor.dispatch("Task 3".to_string());
    supervisor.dispatch("Task 4".to_string());
    supervisor.dispatch("Task 5".to_string());

    // Allow workers to finish
    std::thread::sleep(std::time::Duration::from_secs(2));
}
```