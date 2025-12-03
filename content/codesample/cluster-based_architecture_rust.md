---
title: "Cluster-based Architecture - Rust"
date: 2025-12-03T15:17:38.920-05:00
draft: false
pattern_usage: ["Cluster-based Architecture"]
language: ["Rust"]
---
The Cluster-based Architecture pattern distributes tasks across a collection of independent worker nodes (a cluster) to achieve parallelism and potentially fault tolerance. Each worker handles a subset of the overall workload. This example demonstrates a simple cluster for calculating the sum of squares of numbers. A `Worker` struct holds a portion of the data and calculates its partial sum. A `Cluster` manages distributing the data and aggregating results. This is idiomatic Rust as it leverages `threads` for concurrency, `Arc` for shared ownership of data across threads, and `Mutex` for safe access to the shared result accumulator.  The structure promotes data isolation and prevents race conditions.

```rust
use std::thread;
use std::sync::{Arc, Mutex};

struct Worker {
    data: Vec<i32>,
}

impl Worker {
    fn new(data: Vec<i32>) -> Self {
        Worker { data }
    }

    fn process(&self) -> i32 {
        self.data.iter().map(|&x| x * x).sum()
    }
}

struct Cluster {
    workers: Vec<Worker>,
    result: Arc<Mutex<i32>>,
}

impl Cluster {
    fn new(data: Vec<i32>, num_workers: usize) -> Self {
        let chunk_size = (data.len() + num_workers - 1) / num_workers; // Ensure even distribution
        let workers: Vec<Worker> = data
            .chunks(chunk_size)
            .map(|chunk| Worker::new(chunk.to_vec()))
            .collect();

        Cluster {
            workers,
            result: Arc::new(Mutex::new(0)),
        }
    }

    fn execute(&self) {
        let result = Arc::clone(&self.result);
        let mut handles = vec![];

        for worker in &self.workers {
            let worker_data = worker.data.clone();
            let result_clone = result.clone();
            let handle = thread::spawn(move || {
                let partial_sum = worker.process();
                let mut guard = result_clone.lock().unwrap();
                *guard += partial_sum;
            });
            handles.push(handle);
        }

        for handle in handles {
            handle.join().unwrap();
        }
    }

    fn get_result(&self) -> i32 {
        *self.result.lock().unwrap()
    }
}


fn main() {
    let data: Vec<i32> = (1..=100).collect();
    let num_workers = 4;

    let cluster = Cluster::new(data, num_workers);
    cluster.execute();

    let total_sum_of_squares = cluster.get_result();
    println!("Total sum of squares: {}", total_sum_of_squares);
}
```