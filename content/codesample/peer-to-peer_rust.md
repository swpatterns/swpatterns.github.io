---
title: "Peer-to-Peer - Rust"
date: 2025-12-03T06:25:39.709-05:00
draft: false
pattern_usage: ["Peer-to-Peer"]
language: ["Rust"]
---
The Peer-to-Peer (P2P) pattern enables direct communication and resource sharing between nodes (peers) in a network, removing the need for a central server. This example uses Rust's asynchronous runtime (tokio) and UDP sockets to simulate a simple P2P network where peers can broadcast messages to each other. Each peer listens for incoming broadcasts and re-broadcasts received messages (excluding its own) to other peers.  This implementation leverages Rust's ownership and borrowing system for safe concurrent access to the socket and message buffer. Tokio provides the non-blocking IO necessary for an efficient P2P interaction.  Error handling is included for robustness.

```rust
use std::net::UdpSocket;
use std::str;
use tokio::net::UdpFramed;
use tokio::io::{AsyncBufReadExt, BufReader};
use tokio::time::{self, Duration};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let socket = UdpSocket::bind("127.0.0.1:8080")?;
    let socket = UdpFramed::new(socket);

    let mut reader = BufReader::new(socket);
    let mut buffer = Vec::new();

    println!("P2P Peer started. Listening on 127.0.0.1:8080");

    let mut interval = time::interval(Duration::from_millis(100));

    loop {
        interval.tick().await;

        // Receive messages
        while let Some(line) = reader.lines().next_line().await? {
            let message = line.trim();
            if message != "" && message != "ping" {
                println!("Received: {}", message);
                broadcast_message(&socket, message).await?;
            }
        }

        // Periodically send a ping to keep connections alive (optional)
        broadcast_message(&socket, "ping").await?;
    }
}

async fn broadcast_message(socket: &UdpFramed<UdpSocket>, message: &str) -> Result<(), Box<dyn std::error::Error>> {
    let peers = vec!["127.0.0.1:8081", "127.0.0.1:8082"]; // An example peer list
    for peer in &peers {
        socket.send_to(message.as_bytes(), peer).await?;
    }
    Ok(())
}
```