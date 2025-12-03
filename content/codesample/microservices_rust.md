---
title: "Microservices - Rust"
date: 2025-12-03T14:43:59.862-05:00
draft: false
pattern_usage: ["Microservices"]
language: ["Rust"]
---
The Microservices pattern structures an application as a collection of loosely coupled, independently deployable services, modeled around a business domain. Each service owns its data and communicates via lightweight mechanisms, often a REST API. This example demonstrates a simplified order and payment service interaction.  We use Rust's strong typing and ownership system to ensure data integrity between services.  `tokio` handles asynchronous networking, crucial for microservice communication.  The `serde` crate facilitates serialization/deserialization for API requests and responses, a common practice in Rust web services.  Error handling uses `Result` for clarity and robustness.

```rust
// order_service/src/main.rs
use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize)]
struct Order {
    id: Uuid,
    items: Vec<String>,
    total: f64,
}

#[get("/orders/{id}")]
async fn get_order(id: web::Path<Uuid>) -> impl Responder {
    // In a real app, this would fetch from a database.
    let order = Order {
        id: id.into_inner(),
        items: vec!["item1".to_string(), "item2".to_string()],
        total: 100.0,
    };
    HttpResponse::Ok().json(order)
}

#[post("/orders")]
async fn create_order(order: web::Json<Order>) -> impl Responder {
    // In a real app, this would save to a database and potentially
    // trigger events for other services (e.g., payment).
    HttpResponse::Created().json(order.into_inner())
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(get_order)
            .service(create_order)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}

// payment_service/src/main.rs
use actix_web::{post, web, App, HttpResponse, HttpServer, Responder};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize)]
struct PaymentRequest {
    order_id: Uuid,
    amount: f64,
}

#[derive(Debug, Serialize, Deserialize)]
struct PaymentResponse {
    status: String,
}

#[post("/payments")]
async fn process_payment(req: web::Json<PaymentRequest>) -> impl Responder {
    // Simulate payment processing.
    let status = if req.amount > 0.0 {
        "success".to_string()
    } else {
        "failed".to_string()
    };

    HttpResponse::Ok().json(PaymentResponse { status })
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(process_payment)
    })
    .bind("127.0.0.1:8081")?
    .run()
    .await
}
```