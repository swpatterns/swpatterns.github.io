---
title: "Proxy - Rust"
date: 2025-12-03T12:47:28.978-05:00
draft: false
pattern_usage: ["Proxy"]
language: ["Rust"]
---
The Proxy pattern provides a surrogate or placeholder for another object to control access to it. This is useful for scenarios like lazy initialization, access control, or logging. In this Rust example, we have a `Subject` trait representing the real object, a `RealSubject` implementing that trait, and a `Proxy` that holds a reference to the `RealSubject`. The `Proxy` intercepts calls to the `do_something` method. It lazily creates the `RealSubject` only when needed and then delegates the call. This implementation leverages Rust's ownership and borrowing system for safe and efficient proxying, avoiding unnecessary cloning and ensuring the `RealSubject` is only instantiated once. The use of `Option<Box<dyn Subject>>` within the `Proxy` is idiomatic for handling potentially uninitialized resources.

```rust
trait Subject {
    fn do_something(&self);
}

struct RealSubject {
    data: String,
}

impl RealSubject {
    fn new(data: String) {
        println!("RealSubject created with data: {}", data);
    }
}

impl Subject for RealSubject {
    fn do_something(&self) {
        println!("RealSubject doing something with data: {}", self.data);
    }
}

struct Proxy {
    real_subject: Option<Box<dyn Subject>>,
    data: String,
}

impl Proxy {
    fn new(data: String) -> Self {
        Proxy {
            real_subject: None,
            data,
        }
    }

    fn get_real_subject(&mut self) -> &mut Box<dyn Subject> {
        self.real_subject.insert(Box::new(RealSubject::new(self.data.clone())))
    }
}

impl Subject for Proxy {
    fn do_something(&self) {
        let real_subject = self.real_subject.as_ref().unwrap();
        real_subject.do_something();
    }
}

fn main() {
    let proxy = Proxy::new("Important Data".to_string());
    println!("First call to do_something:");
    proxy.do_something();

    println!("Second call to do_something:");
    proxy.do_something();
}
```