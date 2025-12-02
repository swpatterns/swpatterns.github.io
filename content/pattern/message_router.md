
---
title: Message Router
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "integration"]
wikipedia: ""
diagramtype: "class"
diagram: "[Client] -- \"sends message\" --> [MessageRouter]\n[MessageRouter] -- \"routes message\" --> [Handler1]\n[MessageRouter] -- \"routes message\" --> [Handler2]\n[MessageRouter] -- \"routes message\" --> [HandlerN]\n[Handler1] .. \"processes message\" .. [Message]\n[Handler2] .. \"processes message\" .. [Message]\n[HandlerN] .. \"processes message\" .. [Message]\n[note: Message Router decouples senders from receivers {bg:lightyellow}]"
code: true
---

The Message Router pattern is a behavioral pattern that centralizes the control of message distribution within a system. It receives messages from clients and routes them to the appropriate handler(s) based on message type, content, or other defined criteria. This promotes loose coupling, allowing clients to send messages without knowing the details of the destination handlers.

This pattern improves system maintainability and scalability. Adding or removing handlers doesn’t require changes to the clients.  It also facilitates different routing strategies and allows for complex workflows to be managed in a centralized manner.  Essentially, it's a simplified publish-subscribe pattern where the routing logic is concentrated in the router itself.

## Usage

The Message Router pattern is commonly used in:

*   **Microservices architectures:** To route requests between different services.
*   **Event-driven systems:** To distribute events to subscribers based on event type.
*   **GUI applications:** To handle different user actions (events) and dispatch them to appropriate handlers.
*   **Messaging queues:** As a component that decides where messages should be placed in different queues.
*   **API gateways:** To route API requests to backend services.

## Examples

1.  **Apache Kafka:** Kafka utilizes a message router through its topic-based architecture. Producers send messages to specific topics, and consumers subscribe to those topics, effectively routing messages based on the topic name.  Kafka brokers act as the message routers, ensuring messages reach the correct consumers.

2.  **Node.js EventEmitter:** The `EventEmitter` class in Node.js is a direct implementation of this pattern.  It allows objects to emit named events that can be listened to by other objects.  The `EventEmitter` acts as a router, dispatching events to all registered listeners.

3.  **AWS Simple Notification Service (SNS):** SNS allows applications to publish messages to topics, and subscriptions determine which endpoints (e.g., SQS queues, email addresses, HTTP endpoints) receive those messages. SNS acts as the message router, facilitating fan-out messaging.
