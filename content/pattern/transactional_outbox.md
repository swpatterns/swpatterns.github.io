---
title: Transactional Outbox
date: 2024-02-29T16:32:47-00:00
draft: false
pattern_types: ["behavioral", "integration", "reliability"]
wikipedia: ""
diagramtype: "sequence"
diagram: mermaid
sequenceDiagram
    participant Application
    participant Database
    participant MessageBroker
    Application->>Database: Begin Transaction\nUpdate Data\nInsert Outbox Message
    alt Transaction Successful
        Database-->>Application: Transaction Commit\nOutbox Message persisted
        Application->>MessageBroker: Publish Outbox Message (async)
    else Transaction Failed
        Database-->>Application: Transaction Rollback
        Application->>MessageBroker: No message published
    end

code: true
---

The Transactional Outbox pattern solves the problem of reliably publishing events in a microservices architecture when an event needs to be triggered as a direct result of a database transaction.  It ensures that events are *not* published if the transaction fails, maintaining data consistency. Instead of directly publishing events from the application code, the pattern introduces an "outbox" table within the same database transaction as the core business logic. A separate process then asynchronously reads and publishes events from this outbox.

This pattern is crucial in scenarios involving eventual consistency between services.  When data changes in one service, it needs to notify other interested services without risking data loss or duplication. Direct publishing can lead to inconsistency if the publish operation fails *after* the database commit. The Transactional Outbox avoids this by guaranteeing that event publication is tied to the success of the database transaction, offering a ‘least once’ delivery guarantee.

## Usage

The Transactional Outbox is broadly used in:

*   **Microservices Architectures:** Coordinating data changes and events between multiple independently deployable services.
*   **Event-Driven Systems:** Situations where business processes rely on asynchronous, reactive communication through events.
*   **Distributed Transactions (Saga Pattern):** As a reliable way to publish events that drive the Saga execution, ensuring atomicity across services
*   **Order Processing Systems:** When an order is created, updated, or cancelled, multiple events (e.g., `OrderCreated`, `OrderShipped`, `OrderCancelled`) need to be reliably published to inventory, shipping, and billing services.

## Examples

1.  **Debezium:** Debezium is a distributed platform for change data capture (CDC). It monitors database tables for changes and publishes those changes as events. Internally, Debezium often leverages a transactional outbox pattern (specifically the log-based CDC approach paired with outbox tables) to *reliably* capture changes from the database without missing updates, even during database failures. It reads the outbox to know which events need to be delivered.

2.  **Spring Cloud Stream with Kafka:**  Spring Cloud Stream simplifies the development of event-driven microservices using technologies like Apache Kafka.  When used together, an application can insert messages into an outbox table within its database transaction.  A separate binder component (provided by Spring Cloud Stream) polls this outbox table and reliably publishes the messages to Kafka, ensuring the event is only sent if the database transaction has been successfully committed.

3.  **Axon Framework:**  Axon Framework is a framework for building event-driven microservices in Java. It provides built-in support for the Transactional Outbox pattern, enabling developers to easily publish events as part of their database transactions.  Axon manages the outbox table and the event publishing process, abstracting away much of the complexity of implementing the pattern manually.