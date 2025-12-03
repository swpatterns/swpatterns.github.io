---
title: "Monolith - Rust"
date: 2025-12-03T14:26:35.374-05:00
draft: false
pattern_usage: ["Monolith"]
language: ["Rust"]
---
The Monolith pattern refers to building an application as a single, unified unit. All functionalities and concerns are tightly coupled within one codebase. This contrasts with microservices, where functionality is broken down into independently deployable services. This Rust example embodies the Monolith pattern by placing web server logic, data access, and application logic within the same `main.rs` file and module structure, avoiding separate crates for different concerns. The tight coupling, demonstrated by direct function calls between components, is characteristic of this pattern. Rust’s module system helps organize the monolithic structure, but doesn’t inherently prevent it.

```rust
// main.rs

mod api;
mod database;
mod models;

use actix_web::{web, App, HttpResponse, HttpServer};
use database::Database;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let db = Database::new("my_data.db").await;

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(db))
            .service(api::get_data)
            .service(api::add_data)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
```

```rust
// api.rs

use actix_web::{get, post, web, HttpResponse, Responder};
use crate::database::Database;
use crate::models::Data;

#[get("/data")]
pub async fn get_data(db: web::Data<Database>) -> impl Responder {
    let data = db.get_all_data().await;
    HttpResponse::Ok().json(data)
}

#[post("/data")]
pub async fn add_data(db: web::Data<Database>, item: web::Json<Data>) -> impl Responder {
    db.insert_data(item.into_inner()).await;
    HttpResponse::Created().finish()
}
```

```rust
// database.rs

use sqlx::sqlite::{SqlitePool, SqlitePoolOptions};
use crate::models::Data;

pub struct Database {
    pool: SqlitePool,
}

impl Database {
    pub async fn new(database_url: &str) -> Self {
        let pool = SqlitePoolOptions::new()
            .max_connections(5)
            .connect(database_url)
            .await
            .expect("Failed to connect to database");

        Self { pool }
    }

    pub async fn get_all_data(&self) -> Vec<Data> {
        sqlx::query_as::<_, Data>("SELECT id, name FROM data")
            .fetch_all(&self.pool)
            .await
            .expect("Failed to fetch data")
    }

    pub async fn insert_data(&self, data: Data) {
        sqlx::query("INSERT INTO data (name) VALUES (?)")
            .bind(data.name)
            .execute(&self.pool)
            .await
            .expect("Failed to insert data");
    }
}
```

```rust
// models.rs

#[derive(sqlx::FromRow, serde::Serialize)]
pub struct Data {
    pub id: i64,
    pub name: String,
}
```