---
title: "Message Broker - Go"
date: 2025-12-03T15:08:40.051-05:00
draft: false
pattern_usage: ["Message Broker"]
language: ["Go"]
---
The Message Broker pattern decouples application components by allowing them to communicate via intermediary message queues. Publishers send messages to a topic (or exchange) without knowing about subscribers. Subscribers express interest in specific topics and receive messages as they arrive. This promotes scalability and resilience, as components can be added or removed without impacting others.

This Go implementation uses channels to act as message queues. A `Broker` struct manages a map of topics (strings) to channels. `Publish` sends a message to all subscribed channels. `Subscribe` returns a channel for a given topic, allowing consumers to listen for messages. This approach is idiomatic Go due to its emphasis on concurrency via channels and lightweight, composable structures. Goroutines would typically handle publishing and subscribing in a real application.

```go
package main

import "fmt"

// Broker manages message channels for different topics.
type Broker struct {
	topics map[string]chan interface{}
	mutex  chan struct{} // Simplified mutex for channel safety
}

// NewBroker creates a new Message Broker instance.
func NewBroker() *Broker {
	return &Broker{
		topics: make(map[string]chan interface{}),
		mutex:  make(chan struct{}, 1), // Buffered channel acts as a mutex
	}
}

// Publish sends a message to all subscribers of a topic.
func (b *Broker) Publish(topic string, message interface{}) {
	b.mutex <- struct{}{} // Acquire lock
	defer func() {
		<-b.mutex // Release lock
	}()

	subscribers, ok := b.topics[topic]
	if !ok {
		return // No subscribers for this topic
	}
	for _, sub := range b.topics[topic] {
		go func(ch chan interface{}) {
			ch <- message
		}(sub)
	}
}

// Subscribe returns a channel for a given topic.  If the topic doesn't exist, it's created.
func (b *Broker) Subscribe(topic string) <-chan interface{} {
	b.mutex <- struct{}{} // Acquire lock
	defer func() {
		<-b.mutex // Release lock
	}()

	if _, ok := b.topics[topic]; !ok {
		b.topics[topic] = make(chan interface{})
	}
	return b.topics[topic]
}

func main() {
	broker := NewBroker()

	topic1 := "news"
	sub1 := broker.Subscribe(topic1)
	sub2 := broker.Subscribe(topic1)

	go func() {
		broker.Publish(topic1, "Breaking news: Go is awesome!")
	}()

	go func() {
		msg1 := <-sub1
		fmt.Println("Subscriber 1 received:", msg1)
	}()

	go func() {
		msg2 := <-sub2
		fmt.Println("Subscriber 2 received:", msg2)
	}()

	// Keep the program running to receive messages
	var input string
	fmt.Scanln(&input)
}
```