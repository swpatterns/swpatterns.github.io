---
title: "Event-Driven Architecture - Go"
date: 2025-12-03T14:53:22.989-05:00
draft: false
pattern_usage: ["Event-Driven Architecture"]
language: ["Go"]
---
The Event-Driven Architecture (EDA) decouples components by allowing them to communicate through events. Components (event producers) emit events without knowing who will handle them, and other components (event consumers) subscribe to events they're interested in. This promotes scalability and flexibility.

This Go implementation uses channels to represent the event bus.  `Event` is an interface for all events.  `Subscriber` registers channels to receive specific event types. `Producer` publishes events to the bus.  The `main` function demonstrates a simple producer and subscriber setup.  Using interfaces and channels is idiomatic Go for concurrency and decoupling, making this a natural fit for EDA.  Error handling is included for channel operations.

```go
package main

import (
	"fmt"
	"time"
)

// Event is the interface for all events.
type Event interface {
	Type() string
}

// UserCreatedEvent represents a user creation event.
type UserCreatedEvent struct {
	UserID   int
	Username string
}

func (e *UserCreatedEvent) Type() string {
	return "UserCreated"
}

// Subscriber manages event subscriptions.
type Subscriber struct {
	eventChans map[string]chan Event
}

func NewSubscriber() *Subscriber {
	return &Subscriber{
		eventChans: make(map[string]chan Event),
	}
}

func (s *Subscriber) Subscribe(eventType string) <-chan Event {
	ch := make(chan Event, 10) // Buffered channel
	s.eventChans[eventType] = ch
	return ch
}

func (s *Subscriber) Unsubscribe(eventType string) {
	delete(s.eventChans, eventType)
}

// Producer publishes events to subscribers.
type Producer struct {
	subscriber *Subscriber
}

func NewProducer(subscriber *Subscriber) *Producer {
	return &Producer{subscriber: subscriber}
}

func (p *Producer) Publish(event Event) {
	eventType := event.Type()
	if ch, ok := p.subscriber.eventChans[eventType]; ok {
		select {
		case ch <- event:
			fmt.Println("Event published:", eventType)
		default:
			fmt.Println("Channel full, event dropped:", eventType)
		}
	} else {
		fmt.Println("No subscribers for event:", eventType)
	}
}

func main() {
	subscriber := NewSubscriber()
	userCreatedChan := subscriber.Subscribe("UserCreated")
	producer := NewProducer(subscriber)

	go func() {
		for event := range userCreatedChan {
			userCreatedEvent, ok := event.(*UserCreatedEvent)
			if ok {
				fmt.Printf("Received UserCreated event: ID=%d, Username=%s\n", userCreatedEvent.UserID, userCreatedEvent.Username)
			}
		}
	}()

	producer.Publish(&UserCreatedEvent{UserID: 1, Username: "Alice"})
	producer.Publish(&UserCreatedEvent{UserID: 2, Username: "Bob"})

	time.Sleep(1 * time.Second) // Allow events to be processed
	subscriber.Unsubscribe("UserCreated")
	producer.Publish(&UserCreatedEvent{UserID: 3, Username: "Charlie"}) // No subscribers
}
```