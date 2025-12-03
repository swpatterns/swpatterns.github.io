
---
title: Inbox Pattern
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "integration"]
wikipedia: ""
diagramtype: "sequence"
diagram: "sequenceDiagram
  participant Client
  participant Application
  participant Inbox
  participant Handler1
  participant Handler2

  Client -> Application: Sends Message
  Application ->> Inbox: Stores Message
  Inbox ->> Handler1: Dispatches Message (Priority 1)
  Handler1 ->> Application: Processes Message
  Inbox ->> Handler2: Dispatches Message (Priority 2)
  Handler2 ->> Application: Processes Message
  "
code: true
---

The Inbox Pattern is a technique for decoupling message producers from message consumers in a system. It introduces an inbox component that acts as a central point for receiving messages. Producers simply send messages to the inbox, without needing to know about or directly interact with the consumers. The inbox then dispatches these messages to the appropriate consumers, often based on message type or priority.

This pattern is particularly useful in distributed systems or microservice architectures where direct communication between services can lead to tight coupling and increased complexity. It promotes asynchronous processing, allowing producers to continue their work without waiting for consumers to respond.  The inbox also provides a history of messages and can facilitate replaying them for debugging or reprocessing.

## Usage

The Inbox Pattern is commonly used in:

*   **Microservices:**  For reliable asynchronous communication between services. A service's inbox ensures messages aren't lost if consumers are temporarily unavailable.
*   **Event-Driven Architectures:** As the central point for receiving and distributing events within the system, ensuring that all interested parties are notified.
*   **Command Query Responsibility Segregation (CQRS):** The command side often uses an inbox to accept commands and reliably pass them to the command handlers.
*   **Background Job Processing:**  Distributing tasks to worker processes without blocking the main application thread.

## Examples

1.  **RabbitMQ:** RabbitMQ is a popular message broker that implicitly implements the Inbox Pattern. Producers publish messages to exchanges (the inbox), which then route those messages to queues based on bindings. Consumers subscribe to queues to receive and process messages.

2.  **AWS SQS (Simple Queue Service):**  SQS provides a managed message queue service. Applications send messages to SQS queues (the inbox).  Other applications or AWS Lambda functions then poll these queues to retrieve and process messages. SQS also offers features like message retention and dead-letter queues for handling failures enhancing the reliability of the inbox.

3.  **Kafka:** Although more than a simple message queue, Kafka's topics can be viewed as inboxes. Producers write messages to topics (the inbox), and consumers subscribe to topics to read messages. Kafka’s persistence and replication further bolster the inbox’s reliability.
