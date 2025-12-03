---
title: "Observer - Rust"
date: 2025-12-03T13:25:54.279-05:00
draft: false
pattern_usage: ["Observer"]
language: ["Rust"]
---
The Observer pattern defines a one-to-many dependency between objects.  A subject maintains a list of its dependents, called observers, and automatically notifies them of any state changes. This promotes loose coupling; the subject doesn't need to know concrete observer classes, only that they implement a common interface.

This Rust implementation utilizes the `Arc` and `Mutex` to allow safe sharing of the subject's state between threads (observers could potentially be in different threads).  We define traits for `Subject` and `Observer`. The `Subject` holds a vector of `Observer` trait objects and notifies them when its state changes, using a callback through the `notify_observers` method.  The code employs Rust’s ownership and borrowing rules, and `Arc` with `Mutex` to safely handle the shared state, showcasing idiomatic Rust concurrency.

```rust
use std::sync::{Arc, Mutex};
use std::cell::RefCell;

// Define the Observer trait
trait Observer {
    fn update(&self, message: &str);
}

// Define the Subject trait
trait Subject {
    fn attach(&mut self, observer: &dyn Observer);
    fn detach(&mut self, observer: &dyn Observer);
    fn notify_observers(&self, message: &str);
}

// Concrete Subject
struct NewsAgency {
    observers: RefCell<Vec<Box<dyn Observer>>>,
    news: Arc<Mutex<String>>,
}

impl NewsAgency {
    fn new() -> Self {
        NewsAgency {
            observers: RefCell::new(Vec::new()),
            news: Arc::new(Mutex::new(String::from("Initial News"))),
        }
    }
}

impl Subject for NewsAgency {
    fn attach(&mut self, observer: &dyn Observer) {
        self.observers.borrow_mut().push(Box::new(observer.clone())); // Clone to satisfy ownership
    }

    fn detach(&mut self, observer: &dyn Observer) {
        self.observers.borrow_mut().retain(|o| {
            let ptr1 = o.as_ref() as *const dyn Observer;
            let ptr2 = observer as *const dyn Observer;
            ptr1 != ptr2
        });
    }

    fn notify_observers(&self, message: &str) {
        let news = self.news.lock().unwrap();
        for observer in self.observers.borrow().iter() {
            observer.update(&format!("Breaking News: {} - {}", message, news));
        }
    }
}


// Concrete Observer
struct Subscriber {
    name: String,
}

impl Subscriber {
    fn new(name: String) -> Self {
        Subscriber { name }
    }
}

impl Observer for Subscriber {
    fn update(&self, message: &str) {
        println!("{} received update: {}", self.name, message);
    }
}

// Clone implementation to satisfy the trait bound in attach
impl Clone for Subscriber {
    fn clone(&self) -> Self {
        Subscriber{name: self.name.clone()}
    }
}


fn main() {
    let agency = NewsAgency::new();

    let subscriber1 = Subscriber::new(String::from("Alice"));
    let subscriber2 = Subscriber::new(String::from("Bob"));

    agency.attach(&subscriber1);
    agency.attach(&subscriber2);

    agency.notify_observers("The stock market crashed!");

    agency.detach(&subscriber1);

    agency.notify_observers("The market recovered slightly.");
}
```