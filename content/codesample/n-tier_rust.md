---
title: "N-tier - Rust"
date: 2025-12-03T14:38:49.011-05:00
draft: false
pattern_usage: ["N-tier"]
language: ["Rust"]
---
The N-tier pattern organizes an application into discrete layers, each performing a specific role. Typically, these tiers are presentation (UI), business logic, and data access. This separation enhances maintainability, testability, and allows for independent development/scaling of each tier.

This Rust example demonstrates a basic 3-tier structure: `presentation`, `business_logic`, and `data`. The `presentation` tier handles user interaction (stubs here). The `business_logic` tier contains the application's rules and logic, calling the `data` tier for persistence.  The `data` tier interacts with a simple in-memory vector as a "database".  Using separate modules and clearly defined interfaces adheres to Rust’s emphasis on modularity and data ownership, promoting code organization and preventing tight coupling through the use of structs and associated functions.  The error handling with `Result` is also a core Rust idiom.

```rust
// src/main.rs

mod presentation;
mod business_logic;
mod data;

fn main() {
    let mut presenter = presentation::Presenter::new();
    let mut service = business_logic::UserService::new(data::DataLayer::new());

    let user = service.create_user("Alice".to_string(), 30).unwrap();
    presenter.display_user(&user);

    match service.get_user(user.id) {
        Ok(retrieved_user) => {
            presenter.display_user(&retrieved_user);
        }
        Err(e) => {
            presenter.display_error(&e);
        }
    }
}

// src/presentation.rs
pub struct Presenter {}

impl Presenter {
    pub fn new() -> Self {
        Presenter {}
    }

    pub fn display_user(&self, user: &business_logic::User) {
        println!("User: {:?} ",user);
    }

    pub fn display_error(&self, error: &business_logic::UserError) {
        println!("Error: {:?}", error);
    }
}

// src/business_logic.rs
use crate::data;

#[derive(Debug)]
pub struct User {
    pub id: u32,
    pub name: String,
    pub age: u32,
}

#[derive(Debug)]
pub enum UserError {
    NotFound,
    InvalidAge,
}

pub struct UserService {
    data_layer: data::DataLayer,
    next_id: u32,
}

impl UserService {
    pub fn new(data_layer: data::DataLayer) -> Self {
        UserService { data_layer, next_id: 1 }
    }

    pub fn create_user(&mut self, name: String, age: u32) -> Result<User, UserError> {
        if age < 18 {
            return Err(UserError::InvalidAge);
        }

        let user = User {
            id: self.next_id,
            name,
            age,
        };
        self.data_layer.save_user(user.clone());
        self.next_id += 1;
        Ok(user)
    }

    pub fn get_user(&self, id: u32) -> Result<User, UserError> {
        match self.data_layer.get_user(id) {
            Some(user) => Ok(user),
            None => Err(UserError::NotFound),
        }
    }
}

// src/data.rs
#[derive(Debug)]
pub struct DataLayer {
    users: Vec<business_logic::User>,
}

impl DataLayer {
    pub fn new() -> Self {
        DataLayer { users: Vec::new() }
    }

    pub fn save_user(&mut self, user: business_logic::User) {
        self.users.push(user);
    }

    pub fn get_user(&self, id: u32) -> Option<business_logic::User> {
        self.users.iter().find(|user| user.id == id).cloned()
    }
}
```