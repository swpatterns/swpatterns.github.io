
---
title: Point-to-Point Channel
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "messaging"]
wikipedia: ""
diagramtype: "sequence"
diagram: "participant Sender\nparticipant Receiver\nSender->>Receiver: Message\nactivate Receiver\nReceiver->>Receiver: Process Message\nReceiver-->>Sender: Acknowledgement\ndeactivate Receiver"
code: true
---

The Point-to-Point Channel pattern facilitates direct, synchronous or asynchronous communication between two specific endpoints. It ensures that a message sent from one point is delivered to and processed by exactly one other point. This provides a focused communication pathway, differing from publish-subscribe models where messages can have multiple consumers.

This pattern is beneficial when a task needs to be offloaded to a dedicated worker, a request-response interaction is required, or a specific workflow necessitates a direct handoff of data between two components.  It simplifies communication by removing the need for complex routing or filtering mechanisms, ideal for scenarios with well-defined sender and receiver relationships.

## Usage

*   **Task Queues:** Distributing computationally intensive tasks from a web server to a background worker for processing.  The web server sends a task message to a queue (the channel), and a worker consumes and executes it.
*   **Remote Procedure Calls (RPC):** Invoking a method on a remote server as if it were a local call. The calling process sends a request message (the point), which is routed to the remote server, processed, and the response is sent back.
*   **Order Processing Systems:** When an order is placed in an e-commerce system, a message is sent to the fulfillment system for picking, packing, and shipping.
*   **Microservice Communication:** Allowing a specific microservice to request a specific operation from another, pre-defined microservice.

## Examples

*   **RabbitMQ:** RabbitMQ is a message broker that heavily utilizes point-to-point channels through its queues. A producer sends a message to a specific queue, and a single consumer (or a set of consumers acting as one logical unit) processes that message.  The binding between the exchange and queue defines the point-to-point connection.
*   **Redis Pub/Sub with Patterns:** While Redis is primarily known for its pub/sub, using patterns in the subscription allows for effectively creating point-to-point channels. A publisher sends to a channel, and a subscriber with a matching pattern receives the message.  If the pattern is specific enough, it acts as a direct channel.
*   **gRPC:** gRPC is a high-performance RPC framework.  Each method call is essentially a point-to-point communication, where the client sends a request to a specific server, and the server sends a response directly back.
