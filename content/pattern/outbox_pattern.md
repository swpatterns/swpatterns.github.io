
---
title: Outbox Pattern
date: 2024-02-29T18:22:04-00:00
draft: false
pattern_types: ["behavioral", "integration", "reliability"]
wikipedia: ""
diagramtype: "sequence"
diagram: mermaid
sequenceDiagram
    participant App as Application
    participant DB as Database
    participant MessageBroker as Message Broker
    App->>DB: Update data & Insert message to Outbox table
    DB-->>App: Transaction commit
    loop Polling
        MessageBroker->>DB: Query Outbox table for new messages
        DB-->>MessageBroker: Messages
        MessageBroker->>App: Publish each message
        MessageBroker-->>DB: Update message status in Outbox table (e.g., Sent)
    end

code: true
---

The Outbox Pattern addresses the challenge of reliably publishing events in a transactional context. When an application modifies its data and needs to publish an event to notify other services, ensuring both operations occur atomically is crucial.  Directly publishing events from the application can lead to eventual consistency issues if publishing fails after the database transaction succeeds, or vice versa.

This pattern solves this by introducing an "Outbox" – a table within the application’s database where all events intended for external systems are first persisted as data. A separate process, typically a reliable message broker or a background worker, then polls this Outbox table and publishes the events.  Because event persistence happens *within* the same database transaction as the data changes, atomicity is guaranteed.

## Usage

The Outbox Pattern is commonly used in microservice architectures to provide reliable event-driven communication. Specifically:

*   **Eventual Consistency:** When strong consistency across services isn’t strictly required, yet reliable notification is essential.
*   **Distributed Transactions:** As a replacement for complex and often problematic distributed transactions (two-phase commit).
*   **Decoupling:**  Decoupling the application logic from the specifics of the message broker. The application only needs to write to a database table.
*   **Reliable Messaging:** Ensuring that events are not lost even in the face of temporary network outages or message broker unavailability.

## Examples

*   **Apache Kafka with Debezium:** Debezium is a change data capture (CDC) platform that integrates with databases like PostgreSQL, MySQL and others. It monitors database changes, including insertions into an Outbox table, and streams those changes as Kafka events.  This lets applications publish events by simply writing to the Outbox without needing to directly interact with Kafka.

*   **Spring Cloud Stream with JDBC Outbox:** Spring Cloud Stream provides a framework for building event-driven microservices.  Combined with a JDBC Outbox implementation, it allows applications to persist events in a relational database. A binder component then periodically polls the Outbox table and publishes the events to a configured message broker (e.g., RabbitMQ, Kafka).  This simplifies event publishing and ensures transactional consistency within the Spring application context.

*   **Rails Event Store:** A Ruby gem that provides an event store implementation, often utilizing an Outbox table in the application's database.  Rails applications can then persist events to this Outbox as part of their database transactions, and a separate process handles publishing those events to downstream systems.
