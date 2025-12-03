---
title: "Object Pool - Rust"
date: 2025-12-03T11:14:03.892-05:00
draft: false
pattern_usage: ["Object Pool"]
language: ["Rust"]
---
The Object Pool pattern manages a collection of reusable objects to reduce the overhead of frequent creation and destruction. It improves performance, especially with resource-intensive objects. This Rust implementation uses a `RefCell` to allow interior mutability within the pool, and `Mutex` for thread-safe access.  The `get()` method attempts to retrieve a free object; if none are available, it creates a new one (up to a limit). `release()` returns an object to the pool for reuse. This leverages Rust’s ownership and borrowing system while safely handling concurrent access through `Mutex` and `RefCell`, mirroring common practices for managing shared state in Rust.

```rust
use std::cell::RefCell;
use std::sync::{Arc, Mutex};

struct MyObject {
    data: i32,
}

impl MyObject {
    fn new(data: i32) -> Self {
        println!("Creating new object with data: {}", data);
        MyObject { data }
    }
}

struct ObjectPool {
    pool: Mutex<RefCell<Vec<MyObject>>>,
    max_size: usize,
}

impl ObjectPool {
    fn new(max_size: usize) -> Self {
        ObjectPool {
            pool: Mutex::new(RefCell::new(Vec::new())),
            max_size,
        }
    }

    fn get(&self) -> Option<MyObject> {
        let mut pool = self.pool.lock().unwrap();
        if let Some(obj) = pool.pop() {
            Some(obj)
        } else {
            if pool.len() < self.max_size {
                let new_obj = MyObject::new(42);
                pool.push(new_obj);
                Some(pool.pop().unwrap())
            } else {
                None
            }
        }
    }

    fn release(&self, obj: MyObject) {
        let mut pool = self.pool.lock().unwrap();
        pool.push(obj);
    }
}

fn main() {
    let pool = Arc::new(ObjectPool::new(3));

    let pool_clone1 = Arc::clone(&pool);
    let pool_clone2 = Arc::clone(&pool);

    // Use objects from the pool
    let obj1 = pool_clone1.get();
    let obj2 = pool_clone2.get();

    if let Some(o1) = obj1 {
        println!("Object 1 data: {}", o1.data);
        pool_clone1.release(o1);
    }

    if let Some(o2) = obj2 {
        println!("Object 2 data: {}", o2.data);
        pool_clone2.release(o2);
    }

    // Request more objects than the pool's max size
    let mut handles = vec![];
    for _ in 0..5 {
      let pool_clone = Arc::clone(&pool);
      handles.push(std::thread::spawn(move || {
        if let Some(obj) = pool_clone.get() {
          println!("Object from thread data: {}", obj.data);
          pool_clone.release(obj);
        } else {
          println!("Object pool is full!");
        }
      }));
    }

    for handle in handles {
      handle.join().unwrap();
    }
}
```