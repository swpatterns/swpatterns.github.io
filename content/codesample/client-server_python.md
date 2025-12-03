---
title: "Client-Server - Python"
date: 2025-12-03T14:32:00.129-05:00
draft: false
pattern_usage: ["Client-Server"]
language: ["Python"]
---
The Client-Server pattern is a distributed application structure that divides tasks among providers of a resource, called servers, and requesters of that resource, called clients. Here, a simple example uses Python's `socket` module to establish a TCP connection. The server listens for connections and responds with an uppercase version of the received data.  The client connects to the server, sends a message, and prints the server’s response. This implementation follows Python's clear syntax and utilizes standard library modules for networking, making it idiomatic and readable.  The use of separate scripts clearly delineates the roles of the client and server.

```python
# server.py
import socket

HOST = '127.0.0.1'  # Standard loopback interface address (localhost)
PORT = 65432        # Port to listen on (non-privileged ports are > 1023)

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    print(f"Server listening on {HOST}:{PORT}")
    conn, addr = s.accept()
    with conn:
        print(f"Connected by {addr}")
        while True:
            data = conn.recv(1024)
            if not data:
                break
            decoded_data = data.decode()
            print(f"Received: {decoded_data}")
            conn.sendall(decoded_data.upper().encode())
            print(f"Sent: {decoded_data.upper()}")

# client.py
import socket

HOST = '127.0.0.1'  # The server's hostname or IP address
PORT = 65432        # The port used by the server

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    message = "Hello, Server!"
    print(f"Sending: {message}")
    s.sendall(message.encode())
    data = s.recv(1024)
    print(f"Received: {data.decode()}")
```