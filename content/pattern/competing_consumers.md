---
title: Competing Consumers
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["concurrency", "behavioral"]
wikipedia: ""
diagramtype: "sequence"
diagram: mermaid
sequenceDiagram
    participant MessageQueue
    participant Consumer1
    participant Consumer2

    loop Message Processing
        MessageQueue->>Consumer1: Get Message
        MessageQueue->>Consumer2: Get Message
        Consumer1->>Consumer1: Process Message
        Consumer2->>Consumer2: Process Message
    end

code: true
---

The Competing Consumers pattern addresses the challenge of parallel processing of work items from a shared queue. Multiple consumers compete for messages in the queue, processing them independently and concurrently. This approach significantly improves throughput and responsiveness, especially when processing time for each task is variable.  It’s crucial to ensure that consumers are independent and do not rely on a specific processing order, and that message processing is idempotent to handle potential duplicate consumption.

## Usage

The Competing Consumers pattern is commonly used in scenarios with a high volume of independent tasks that need to be processed quickly. 
* **Background Job Processing:**  Processing tasks like image resizing, sending emails, or generating reports can be offloaded to a message queue and handled by multiple worker processes.
* **Data Ingestion & Transformation:**  Extracting, transforming, and loading (ETL) processes often benefit from concurrent consumers handling different parts of the data stream.
* **Event Handling:**  Systems responding to events (like user actions or sensor readings) can utilize this pattern to ensure timely processing, even under peak load.
* **Distributed Systems:** This pattern is fundamental in building resilient and scalable distributed systems where work partitioning is essential.

## Examples

* **RabbitMQ with Spring Cloud Stream:**  Spring Cloud Stream utilizes message brokers like RabbitMQ to implement the Competing Consumers pattern. Multiple instances of a Spring Boot application can bind to the same queue, and each instance will independently consume and process messages. RabbitMQ handles the message distribution and ensures each message is delivered to one consumer.

* **Amazon SQS with AWS Lambda:** Amazon Simple Queue Service (SQS) can be used as a message queue, and AWS Lambda functions can be configured as triggered consumers. Multiple Lambda functions can be concurrently invoked by messages appearing in the SQS queue, providing parallel processing of tasks such as data validation or thumbnail generation.  SQS provides visibility timeout mechanisms to manage potential processing failures and deduplication features to help with idempotency.