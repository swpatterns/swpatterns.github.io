---
title: "Publish-Subscribe - Go"
date: 2025-12-03T15:29:06.138-05:00
draft: false
pattern_usage: ["Publish-Subscribe"]
language: ["Go"]
---
The Publish-Subscribe (Pub/Sub) pattern enables decoupling of message senders (publishers) and message receivers (subscribers). Publishers emit events without knowing who, if anyone, is listening. Subscribers express interest in specific events and are notified when those events occur. This promotes loose coupling, making systems more flexible and maintainable.

The Go implementation uses goroutines and channels for asynchronous communication. A central `EventBus` struct holds a map of channels, where the event type is the key and the channel carries events of that type. Publishers use the `Publish` method to send events on the appropriate channel. Subscribers use the `Subscribe` method to receive events from the bus via a dedicated channel. This approach is idiomatic Go due to its concurrency primitives and emphasis on explicit communication through channels.

```go
package main

import (
	"fmt"
	"time"
)

// EventBus manages subscriptions and publishes events.
type EventBus struct {
	subscriptions map[string]chan interface{}
	mu            sync.RWMutex
}

// NewEventBus creates a new EventBus.
func NewEventBus() *EventBus {
	return &EventBus{
		subscriptions: make(map[string]chan interface{}),
	}
}

// Subscribe registers a subscriber to an event type.
func (eb *EventBus) Subscribe(eventType string) <-chan interface{} {
	eb.mu.Lock()
	defer eb.mu.Unlock()
	ch := make(chan interface{})
	eb.subscriptions[eventType] = ch
	return ch
}

// Publish sends an event to all subscribers of a given type.
func (eb *EventBus) Publish(eventType string, event interface{}) {
	eb.mu.RLock()
	defer eb.mu.RUnlock()
	ch, ok := eb.subscriptions[eventType]
	if ok {
		go func() { ch <- event }() // Use goroutine to avoid blocking publishers
	}
}

import "sync"

func main() {
	bus := NewEventBus()

	// Subscribe to "user.created" events
	userCreated := bus.Subscribe("user.created")
	go func() {
		for event := range userCreated {
			fmt.Printf("User Created Event: %v\n", event)
		}
	}()

	// Subscribe to "order.placed" events
	orderPlaced := bus.Subscribe("order.placed")
	go func() {
		for event := range orderPlaced {
			fmt.Printf("Order Placed Event: %v\n", event)
		}
	}()

	// Publish some events
	bus.Publish("user.created", map[string]interface{}{"id": 1, "name": "Alice"})
	bus.Publish("order.placed", map[string]interface{}{"order_id": "123", "user_id": 1, "total": 100.0})
	bus.Publish("user.created", map[string]interface{}{"id": 2, "name": "Bob"})

	time.Sleep(1 * time.Second) // Allow time for event processing
}
```