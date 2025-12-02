
---
title: Message Bus
date: 2024-02-29T16:12:53-00:00
draft: false
pattern_types: ["behavioral", "integration", "system"]
wikipedia: https://en.wikipedia.org/wiki/Message_bus
diagramtype: "sequence"
diagram: mermaid
sequenceDiagram
    participant Publisher
    participant MessageBus
    participant SubscriberA
    participant SubscriberB

    Publisher->>MessageBus: Publish Message ("Event Data")
    MessageBus->>SubscriberA: Dispatch Message
    MessageBus->>SubscriberB: Dispatch Message
    SubscriberA->>SubscriberA: Process Message
    SubscriberB->>SubscriberB: Process Message

code: true
---

The Message Bus pattern provides a loosely coupled architecture that facilitates communication between different components (services, modules, applications) within a system.  It acts as a central intermediary, allowing publishers to send messages without knowing specifically who the subscribers are, and allowing subscribers to receive messages they are interested in without needing to know who publishes them. This decoupling promotes scalability, maintainability, and flexibility.

## Usage

The Message Bus pattern is widely used in modern software architectures, especially in microservices environments and event-driven systems. Common scenarios include:

*   **Decoupling Microservices:** Enabling independent deployment and scaling of services by communicating through asynchronous messages.
*   **Event Notification:**  Alerting multiple interested components when a specific event occurs (e.g., user registration, order placement).
*   **Real-time Data Streaming:**  Distributing data updates to subscribers as they happen (e.g., stock prices, sensor readings).
*   **Integration of Heterogeneous Systems:** Connecting applications written in different languages or using different technologies.
*   **Workflow Orchestration:** Coordinating complex business processes by passing messages between different steps.

## Examples

*   **RabbitMQ:** A popular open-source message broker that implements the Advanced Message Queuing Protocol (AMQP).  It’s used extensively for decoupling services and handling asynchronous tasks in applications like e-commerce platforms, financial systems, and social networks. Publishers send messages to *exchanges*, which route them to queues based on defined *bindings*. Subscribers then consume messages from these queues.

*   **Kafka:**  A distributed streaming platform designed for high-throughput, fault-tolerant real-time data feeds. Often employed for collecting and processing large volumes of event data, such as website activity, logs, and sensor data. Kafka uses the concept of *topics* (message categories) and *partitions* (dividing topics for parallelism). Producers write to topics, and consumers read from them.

*   **AWS SQS/SNS:** Amazon's Simple Queue Service (SQS) and Simple Notification Service (SNS) provide managed message queue and publish/subscribe capabilities, respectively. These services are frequently used in serverless architectures for decoupling Lambda functions and other AWS services.  SNS allows for fan-out messaging to multiple SQS queues or other endpoints.
