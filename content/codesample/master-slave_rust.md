---
title: "Master-Slave - Rust"
date: 2025-12-03T15:33:04.659-05:00
draft: false
pattern_usage: ["Master-Slave"]
language: ["Rust"]
---
The Master-Slave pattern involves one component (the Master) controlling and coordinating the actions of one or more other components (the Slaves). The Master distributes tasks to the Slaves, and the Slaves perform those tasks, potentially returning results to the Master. This pattern is useful for parallel processing or distributing work across multiple resources.

In this Rust example, we use `std::thread` to simulate the Master-Slave relationship. The `Master` thread generates tasks (numbers to square) and sends them to `Slave` threads via channels (`mpsc`). Each `Slave` receives a number, squares it, and sends the result back to the `Master`. The `Master` then collects and prints the results.  This implementation leverages Rust's ownership and borrowing system, along with its concurrency primitives, for safe and efficient parallel execution. The use of channels for communication is a standard Rust approach for thread synchronization.

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    let num_slaves = 4;
    let tasks = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let (tx, rx) = mpsc::channel();

    // Spawn Slave threads
    for i in 0..num_slaves {
        let rx_clone = rx.clone();
        thread::spawn(move || {
            loop {
                match rx_clone.recv() {
                    Ok(task) => {
                        let result = task * task;
                        println!("Slave {} processed task {} and got result {}", i, task, result);
                    }
                    Err(_) => {
                        println!("Slave {} shutting down", i);
                        break;
                    }
                }
            }
        });
    }

    // Master sends tasks to Slaves
    for task in tasks {
        tx.send(task).unwrap();
    }

    // Drop the original transmitter to signal the slaves to exit
    drop(tx);

    // Wait for all slaves to finish (optional, for cleaner shutdown)
    for _ in 0..num_slaves {
        thread::joinall(vec![]); // The threads are already spawned
    }
}
```