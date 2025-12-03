---
title: "Pipes and Filters - Rust"
date: 2025-12-03T15:21:15.350-05:00
draft: false
pattern_usage: ["Pipes and Filters"]
language: ["Rust"]
---
The Pipes and Filters pattern processes a stream of data through a series of independent processing components (filters) connected by channels (pipes). Each filter performs a specific transformation on the data and passes the result to the next filter. This promotes modularity, reusability, and simplifies complex data processing pipelines.

This Rust implementation uses channels (`std::sync::mpsc`) to connect filters. Each filter is a separate function that receives data from a channel, processes it, and sends the result to another channel. The `main` function sets up the pipeline by creating the channels and spawning threads to run the filters concurrently.  The use of functions and channels aligns with Rust's ownership and concurrency models, making it a natural fit for this pattern.  Error handling is simplified for brevity but would be more robust in a production setting.

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    // Create channels
    let (tx1, rx1) = mpsc::channel();
    let (tx2, rx2) = mpsc::channel();
    let (tx3, rx3) = mpsc::channel();

    // Input data
    let input_data = vec![1, 2, 3, 4, 5];

    // Spawn threads for filters
    let handle1 = thread::spawn(move || {
        for item in input_data {
            tx1.send(item * 2).unwrap();
        }
        drop(tx1); // Signal end of stream
    });

    let handle2 = thread::spawn(move || {
        for item in rx1 {
            tx2.send(item.to_string()).unwrap();
        }
        drop(tx2);
    });

    let handle3 = thread::spawn(move || {
        for item in rx2 {
            tx3.send(format!("Result: {}", item)).unwrap();
        }
        drop(tx3);
    });

    // Process the output
    for item in rx3 {
        println!("{}", item);
    }

    // Wait for threads to finish
    handle1.join().unwrap();
    handle2.join().unwrap();
    handle3.join().unwrap();
}
```