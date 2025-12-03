---
title: "Onion Architecture - Rust"
date: 2025-12-03T14:14:21.396-05:00
draft: false
pattern_usage: ["Onion Architecture"]
language: ["Rust"]
---
The Onion Architecture aims for a loose coupling between business logic and implementation details (like databases, UI, etc.). It structures the application in concentric layers: Domain (core business rules), Application (use cases orchestrating domain logic), and Infrastructure (details like persistence or messaging). Dependencies point inwards – inner layers know nothing of outer layers. This makes the core logic highly testable and resistant to changes in external dependencies.

This Rust example demonstrates a simplified Onion Architecture. The `domain` module holds core entities and logic. The `application` module defines services representing use cases that utilize the domain. Finally, `infrastructure` houses the actual repository implementation, and a basic `main` function acts as the entry point, orchestrating everything.  The use of traits in Rust (e.g., `UserRepository`) allows the application layer to interact with data access without knowing the concrete implementation. This exemplifies Rust’s ownership and borrowing system fostering clear dependencies, a core principle of the pattern.

```rust
// domain/src/lib.rs
pub mod user;

// domain/src/user.rs
#[derive(Debug, Clone, PartialEq)]
pub struct User {
    pub id: u32,
    pub name: String,
}

// application/src/lib.rs
pub mod user_service;

// application/src/user_service.rs
pub trait UserRepository {
    fn get_user(&self, id: u32) -> Option<User>;
    fn create_user(&mut self, name: String) -> User; 
}

pub struct UserService {
    user_repository: &'static mut dyn UserRepository,
}

impl UserService {
    pub fn new(user_repository: &'static mut dyn UserRepository) -> Self {
        UserService { user_repository }
    }

    pub fn get_user_name(&self, id: u32) -> Option<String> {
        self.user_repository.get_user(id).map(|user| user.name)
    }
    
    pub fn create_user_name(&mut self, name: String) -> String {
        let user = self.user_repository.create_user(name);
        user.name
    }
}


// infrastructure/src/lib.rs
pub mod user_repository;

// infrastructure/src/user_repository.rs
use crate::User;

pub struct InMemoryUserRepository {
    users: Vec<User>,
    next_id: u32,
}

impl InMemoryUserRepository {
    pub fn new() -> Self {
        InMemoryUserRepository {
            users: Vec::new(),
            next_id: 1,
        }
    }
}


impl UserRepository for InMemoryUserRepository {
    fn get_user(&self, id: u32) -> Option<User> {
        self.users.iter().find(|user| user.id == id).cloned()
    }

    fn create_user(&mut self, name: String) -> User {
        let user = User {
            id: self.next_id,
            name: name.clone(),
        };
        self.users.push(user.clone());
        self.next_id += 1;
        user
    }
}

// src/main.rs
use application::user_service::{UserService, UserRepository};
use infrastructure::user_repository::InMemoryUserRepository;

fn main() {
    let mut user_repository = InMemoryUserRepository::new();
    let mut user_service = UserService::new(&mut user_repository as &mut dyn UserRepository);

    let name1 = user_service.create_user_name("Alice".to_string());
    println!("Created user name: {}", name1);

    if let Some(name) = user_service.get_user_name(1) {
        println!("User name: {}", name);
    }
}
```