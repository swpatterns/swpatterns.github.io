---
title: "Shared-Nothing - Rust"
date: 2025-12-03T15:13:26.292-05:00
draft: false
pattern_usage: ["Shared-Nothing"]
language: ["Rust"]
---
The Shared-Nothing architecture is a distributed computing model where each node in the system has its own private memory and communicates with other nodes solely via message passing. This avoids contention and locking issues inherent in shared-memory approaches.

This Rust code demonstrates a simplified Shared-Nothing system with two worker threads. Each worker receives tasks from a channel, processes them independently with its own data, and sends the results back through another channel. The main thread distributes tasks and collects results.  Rust's ownership and borrowing system, coupled with its message passing via channels (using the `std::sync::mpsc` module), naturally aligns with this pattern, ensuring data isolation and preventing race conditions without explicit locks. The use of `thread::spawn` creates independent execution contexts.

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    let num_workers = 2;
    let tasks = vec![1, 2, 3, 4, 5];

    let (tx, rx) = mpsc::channel();
    let (result_tx, result_rx) = mpsc::channel();

    for i in 0..num_workers {
        let rx_clone = rx.clone();
        let result_tx_clone = result_tx.clone();
        thread::spawn(move || {
            worker(i, rx_clone, result_tx_clone);
        });
    }

    // Send tasks to workers
    for task in tasks {
        tx.send(task).unwrap();
    }

    // Drop the original sender to signal no more tasks
    drop(tx);

    // Collect results
    let mut results = Vec::new();
    for _ in 0..tasks.len() {
        results.push(result_rx.recv().unwrap());
    }

    println!("Results: {:?}", results);
}

fn worker(id: usize, rx: mpsc::Receiver<i32>, result_tx: mpsc::Sender<i32>) {
    for task in rx {
        // Simulate some independent processing
        let result = task * (id + 1);
        result_tx.send(result).unwrap();
    }
}
```