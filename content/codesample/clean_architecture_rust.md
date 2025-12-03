---
title: "Clean Architecture - Rust"
date: 2025-12-03T14:18:32.013-05:00
draft: false
pattern_usage: ["Clean Architecture"]
language: ["Rust"]
---
The Clean Architecture pattern separates the application into concentric layers: Entities, Use Cases, Interface Adapters, and Frameworks & Drivers. The core business logic resides in the inner layers (Entities & Use Cases) and is independent of external concerns like databases or UI. Outer layers implement interfaces defined by inner layers, controlling the flow of data *to* and *from* the core.  This example demonstrates a simplified Clean Architecture with an entity, a use case, and a basic CLI interface adapter.  Rust's ownership and borrowing system aids in enforcing clear data flow boundaries, strong dependency inversion enabled through traits, and the compartmentalization central to this architecture.

```rust
// entities/user.rs
pub struct User {
    pub id: u32,
    pub name: String,
}

// use_cases/user_service.rs
pub trait UserRepository {
    fn get_user(&self, id: u32) -> Option<User>;
}

pub struct UserService<'a> {
    user_repository: &'a dyn UserRepository,
}

impl<'a> UserService<'a> {
    pub fn new(user_repository: &'a dyn UserRepository) -> Self {
        UserService { user_repository }
    }

    pub fn get_user_name(&self, id: u32) -> Option<String> {
        self.user_repository.get_user(id).map(|user| user.name)
    }
}

// interface_adapters/cli.rs
pub struct InMemoryUserRepository {
    users: Vec<User>,
}

impl InMemoryUserRepository {
    pub fn new(users: Vec<User>) -> Self {
        InMemoryUserRepository { users }
    }
}

impl UserRepository for InMemoryUserRepository {
    fn get_user(&self, id: u32) -> Option<User> {
        self.users.iter().find(|user| user.id == id).cloned()
    }
}

pub fn main() {
    let users = vec![
        User { id: 1, name: "Alice".to_string() },
        User { id: 2, name: "Bob".to_string() },
    ];
    let user_repository = InMemoryUserRepository::new(users);
    let user_service = UserService::new(&user_repository);

    if let Some(name) = user_service.get_user_name(1) {
        println!("User 1's name: {}", name);
    } else {
        println!("User 1 not found.");
    }
}
```