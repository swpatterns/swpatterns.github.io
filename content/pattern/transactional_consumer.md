
---
title: Transactional Consumer
date: 2024-02-29T16:52:34-00:00
draft: false
pattern_types: ["behavioral", "integration", "reliability"]
wikipedia: ""
diagramtype: "sequence"
diagram: "sequenceDiagram\n  participant Consumer\n  participant MessageBroker\n  participant Database\n  Consumer->>MessageBroker: Request Batch of Messages\n  MessageBroker-->>Consumer: Deliver Batch of Messages\n  Consumer->>Database: Begin Transaction\n  loop For each message in batch\n    Consumer->>Database: Process Message\n    alt Processing Fails\n      Database-->>Consumer: Rollback Transaction\n      Consumer->>MessageBroker: Nack message\n      stop\n    end\n  end\n  Database-->>Consumer: Commit Transaction\n  Consumer->>MessageBroker: Ack Batch"
code: true
---

The Transactional Consumer pattern ensures that messages received from a message broker are processed reliably and atomically. It handles message consumption within a database transaction, allowing for either complete processing of a message batch or a full rollback in case of failure. This prevents partial updates and ensures data consistency. The pattern relies on the broker's ability to acknowledge messages at a batch level and negatively acknowledge individual messages, allowing for redelivery of failed messages.

This pattern is especially useful in scenarios where message processing involves writing to multiple tables or performing complex operations that must be either entirely successful or entirely undone.  It is critical for maintaining data integrity in distributed systems where failures are expected. It enables "exactly-once" processing semantics (or at least a very strong approximation) despite the inherent "at-least-once" delivery guarantees of most message brokers.

## Usage

*   **Financial Transactions:** Applying debits and credits across multiple accounts. A failure in applying one part of the transaction must roll back all changes.
*   **Order Processing:** Updating inventory, creating shipping labels, and charging the customer. An incomplete order due to a system failure needs rollback.
*   **Event Sourcing:** When reapplying a stream of events to rebuild state, ensuring all events are processed or none are.
*   **Data Pipelines:** Processing a batch of data records where intermediate states are not consistent until the whole batch is applied.

## Examples

*   **Apache Kafka with Debezium & Spring:** Debezium captures database changes as Kafka events. A Spring application consuming these events can use the `KafkaTransactionManager` within a `@Transactional` method. If any database operation within the method fails, Spring automatically rolls back the transaction and Debezium, in conjunction with Kafka's configuration (e.g., `acks=all`, `enable.idempotence=true`), ensures the message is retried.
*   **RabbitMQ with pika and SQLAlchemy:** Using the `pika` Python library to consume messages from RabbitMQ and `SQLAlchemy` to interact with a database. You would begin a SQLAlchemy transaction, process each message, and commit or rollback the transaction based on success or failure.  The consumer would negatively acknowledge any messages that cause a rollback to allow for redelivery.  Idempotency should be considered within the message processing logic for ultimate safety.
*   **AWS SQS with DynamoDB & AWS Lambda:** An AWS Lambda function triggered by messages in SQS can use DynamoDB Transactions to process messages atomically. The Lambda function would read a batch of messages, initiate a DynamoDB transaction, process each message’s data, and then commit or rollback the transaction. SQS's visibility timeout and dead-letter queue features provide the necessary mechanisms for handling failures and redelivering messages.
