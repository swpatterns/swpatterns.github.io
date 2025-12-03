---
title: "Client-Server - Rust"
date: 2025-12-03T14:34:15.102-05:00
draft: false
pattern_usage: ["Client-Server"]
language: ["Rust"]
---
The Client-Server pattern involves dividing a system into two distinct parts: the client, which requests services, and the server, which provides those services. This example uses Rust's standard library for TCP networking to implement a simple echo server and client. The server listens for connections on a specified port and echoes back any data received. The client connects to the server, sends a message, receives the echoed response, and prints it. This implementation prominently leverages Rust’s ownership and error handling systems, using `Result` for robust communication and ensuring memory safety throughout the network operations.  Utilizing `std::io` for reading/writing is standard practice in Rust networking.

```rust
use std::io::{self, Read, Write};
use std::net::{TcpListener, TcpStream};
use std::thread;

// Server
fn handle_client(mut stream: TcpStream) -> io::Result<()> {
    let mut buffer = [0; 1024];
    loop {
        let bytes_read = stream.read(&mut buffer)?;
        if bytes_read == 0 {
            return Ok(());
        }
        stream.write_all(&buffer[..bytes_read])?;
    }
}

fn main() -> io::Result<()> {
    let listener = TcpListener::bind("127.0.0.1:8080")?;
    println!("Server listening on 127.0.0.1:8080");

    for stream in listener.incoming() {
        match stream {
            Ok(stream) => {
                thread::spawn(move || {
                    handle_client(stream).unwrap_or_else(|error| eprintln!("Error handling client: {}", error));
                });
            }
            Err(e) => {
                eprintln!("Connection failed: {}", e);
            }
        }
    }

    Ok(())
}

// Client (separate file for clarity - client.rs can be compiled and run independently)
// file: client.rs
use std::io::{self, Read, Write};
use std::net::TcpStream;

fn main() -> io::Result<()> {
    let mut stream = TcpStream::connect("127.0.0.1:8080")?;
    let message = "Hello, Server!";
    stream.write(message.as_bytes())?;
    println!("Sent: {}", message);

    let mut buffer = [0; 1024];
    let bytes_read = stream.read(&mut buffer)?;
    let response = String::from_utf8_lossy(&buffer[..bytes_read]);
    println!("Received: {}", response);

    Ok(())
}
```