---
title: "Mediator - Go"
date: 2025-12-03T13:16:00.021-05:00
draft: false
pattern_usage: ["Mediator"]
language: ["Go"]
---
The Mediator pattern defines an object that encapsulates how a set of objects interact. This promotes loose coupling by preventing objects from referring to each other explicitly, and it simplifies objects' interaction.  Instead of objects communicating directly, they communicate through the Mediator.

This Go example simulates a chat room with colleagues. `Colleague` interface defines the basic behavior of participants. Concrete colleagues `Alice` and `Bob` communicate via `ChatRoom` (the Mediator).  The `ChatRoom` knows about all colleagues and handles message delivery.

It follows idiomatic Go by using interfaces to define contracts and structures to hold state.  The message handling is centralized within the `ChatRoom`, keeping individual colleagues simple.  Error handling is minimal for clarity, but could be expanded for a production system.  The use of maps to store colleagues is also standard Go practice.

```go
// colleague.go
package main

type Colleague interface {
	Send(message string)
	Receive(message string)
}

// alice.go
package main

import "fmt"

type Alice struct {
	room ChatRoom
}

func (a *Alice) Send(message string) {
	a.room.sendMessage(a, message)
}

func (a *Alice) Receive(message string) {
	fmt.Printf("Alice received: %s\n", message)
}

// bob.go
package main

import "fmt"

type Bob struct {
	room ChatRoom
}

func (b *Bob) Send(message string) {
	b.room.sendMessage(b, message)
}

func (b *Bob) Receive(message string) {
	fmt.Printf("Bob received: %s\n", message)
}

// chatroom.go
package main

type ChatRoom struct {
	colleagues map[Colleague]bool
}

func NewChatRoom() *ChatRoom {
	return &ChatRoom{
		colleagues: make(map[Colleague]bool),
	}
}

func (c *ChatRoom) Register(col Colleague) {
	c.colleagues[col] = true
}

func (c *ChatRoom) sendMessage(sender Colleague, message string) {
	for col := range c.colleagues {
		if col != sender {
			col.Receive(message)
		}
	}
}

// main.go
package main

func main() {
	room := NewChatRoom()

	alice := &Alice{room: room}
	bob := &Bob{room: room}

	room.Register(alice)
	room.Register(bob)

	alice.Send("Hello, Bob!")
	bob.Send("Hi, Alice! How are you?")
}
```