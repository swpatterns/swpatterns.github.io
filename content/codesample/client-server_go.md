---
title: "Client-Server - Go"
date: 2025-12-03T14:33:55.895-05:00
draft: false
pattern_usage: ["Client-Server"]
language: ["Go"]
---
The Client-Server pattern is a distributed application structure that divides tasks between providers of a resource (servers) and requesters of that resource (clients).  Here, a simple TCP server listens for connections and echoes back received messages. A client connects to the server, sends a message, receives the echoed response, and then disconnects.  The Go implementation utilizes goroutines and channels for concurrent handling of multiple clients, a cornerstone of Go’s concurrency model.  The `net` package provides the necessary tools for network communication, aligning with Go’s standard library approach for common tasks. Error handling is explicit, following Go's convention of checking return values.

```go
// server.go
package main

import (
	"bufio"
	"fmt"
	"log"
	"net"
)

func handleConnection(conn net.Conn) {
	defer conn.Close()
	reader := bufio.NewReader(conn)
	for {
		message, _ := reader.ReadString('\n')
		fmt.Print("Message Received:", string(message))
		conn.Write([]byte(message))
	}
}

func main() {
	ln, err := net.Listen("tcp", ":8080")
	if err != nil {
		log.Fatal(err)
	}
	defer ln.Close()

	fmt.Println("Server listening on :8080")

	for {
		conn, err := ln.Accept()
		if err != nil {
			log.Println(err)
			continue
		}
		go handleConnection(conn) // Handle each connection in a new goroutine
	}
}

// client.go
package main

import (
	"bufio"
	"fmt"
	"log"
	"net"
)

func main() {
	conn, err := net.Dial("tcp", "localhost:8080")
	if err != nil {
		log.Fatal("Error connecting:", err)
	}
	defer conn.Close()

	reader := bufio.NewReader(conn)
	fmt.Print("Enter message: ")
	message, _ := reader.ReadString('\n')
	conn.Write([]byte(message))

	response, _ := reader.ReadString('\n')
	fmt.Print("Server responded: ", string(response))
}
```