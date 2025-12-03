---
title: "Blackboard - Rust"
date: 2025-12-03T15:25:10.558-05:00
draft: false
pattern_usage: ["Blackboard"]
language: ["Rust"]
---
The Blackboard pattern is a computational problem-solving technique where multiple independent knowledge sources (agents) collaborate to solve a complex problem. A shared data structure, called the blackboard, holds the evolving problem state. Agents examine the blackboard, and if their knowledge applies, they modify it. This process continues until a solution is found.

The Rust example below uses channels for communication between agents and a `Mutex` to protect the blackboard data. Each agent is a thread that attempts to process the blackboard content.  The blackboard itself is a `Vec<String>`, and agents look for specific prefixes indicating what data they are meant to handle. This approach leverages Rust's ownership and concurrency features for a safe and efficient implementation, emphasizing immutability and message passing.

```rust
use std::sync::{Arc, Mutex};
use std::thread;
use std::sync::mpsc;

fn main() {
    let blackboard = Arc::new(Mutex::new(vec!["Initial data".to_string()]));
    let (tx, rx) = mpsc::channel();

    // Agent 1: Adds a prefix to identify its data
    let board_clone1 = Arc::clone(&blackboard);
    let tx1 = tx.clone();
    thread::spawn(move || {
        loop {
            let mut board = board_clone1.lock().unwrap();
            if board.first().unwrap().starts_with("Initial") {
                board.push("Agent1_Processed:".to_string() + board.first().unwrap());
                tx1.send(()).unwrap();
            }
            drop(board); // Explicitly drop the lock
            thread::sleep(std::time::Duration::from_millis(100));
        }
    });

    // Agent 2: Appends data to the existing entry
    let board_clone2 = Arc::clone(&blackboard);
    let tx2 = tx.clone();
    thread::spawn(move || {
        loop {
            let mut board = board_clone2.lock().unwrap();
            if board.last().unwrap().starts_with("Agent1_Processed:") {
                board.push("Agent2_Appended".to_string() + board.last().unwrap());
                tx2.send(()).unwrap();
            }
            drop(board);
            thread::sleep(std::time::Duration::from_millis(100));
        }
    });

    // Main thread: Monitors for completion
    let mut completion_count = 0;
    while completion_count < 2 {
        rx.recv().unwrap();
        completion_count += 1;
    }

    println!("Blackboard contents: {:?}", blackboard.lock().unwrap());
}
```