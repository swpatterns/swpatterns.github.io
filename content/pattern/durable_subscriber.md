
---
title: "Durable Subscriber"
date: 2024-02-29T14:32:17-00:00
draft: false
pattern_types: ["behavioral", "message-queue"]
wikipedia: ""
diagramtype: "class"
diagram: "[Subscriber] --|> [AbstractSubscriber]\n[MessageQueue] --|> [DurableSubscriber]\n[DurableSubscriber] ..> [PersistenceStorage]: uses\n[AbstractSubscriber] --|> [NonDurableSubscriber]"
code: true
---

The Durable Subscriber pattern addresses the reliability of message consumption in messaging systems.  It ensures that a subscriber receives all messages published to a topic, even if the subscriber is temporarily offline or disconnects. This is achieved by persistently storing messages intended for the subscriber until they are successfully processed and acknowledged.

This pattern is critical in scenarios where message loss is unacceptable, such as financial transactions, critical system updates, or commands to remote devices. Traditional message queues often employ a "queue-based" approach where messages are removed from the queue upon delivery, potentially losing them if the subscriber fails to process them. Durable Subscribers avoid this by maintaining a copy of the messages, guaranteeing eventual delivery.

## Usage

*   **Financial Systems:** Guaranteeing every transaction event is processed, even with intermittent connectivity issues.
*   **IoT Device Management:**  Ensuring commands sent to offline devices are reliably delivered and executed when they come back online.
*   **Order Processing:** Making sure every order placed is ultimately handled, avoiding lost sales due to temporary system failures.
*   **Event Sourcing:** Reliably delivering events to subscribers building read models, even if the read model components are unavailable.

## Examples

*   **Apache Kafka:** Kafka's consumer groups utilize a concept similar to durable subscribers.  Each partition of a topic is assigned to a consumer within the group. Kafka retains messages for a configurable period (or until disk space is exhausted), allowing consumers to rejoin the group and resume consumption from their last committed offset, effectively making them durable.

*   **RabbitMQ with Persistence:** RabbitMQ, when configured with durable queues and persistent messages, can achieve durable subscription.  Messages are written to disk, surviving broker restarts. Subscribers can acknowledge messages after processing; if a subscriber fails before acknowledgement, the message remains in the queue to be delivered to another subscriber (or the same one when it reconnects).

*   **Amazon SQS with Dead-Letter Queues:** While not a direct durable subscriber implementation, Amazon SQS uses Dead-Letter Queues in conjunction with visibility timeouts to achieve similar outcomes.  If a message isn't processed within the timeout, it becomes visible again, allowing re-delivery.  Unprocessed messages after a set number of attempts are moved to a Dead-Letter Queue for further investigation, thereby ensuring eventual handling or explicit failure management.
