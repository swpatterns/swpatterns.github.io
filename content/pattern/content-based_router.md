
---
title: "Content-Based Router"
date: 2023-10-27T10:00:00Z
draft: false
pattern_types: ["behavioral", "integration"]
wikipedia: ""
diagramtype: "activity"
diagram: "graph TD; A[Client] --> B{Router}; B -- Message Content: Type A --> C[Service A]; B -- Message Content: Type B --> D[Service B]; B -- Message Content: Default --> E[Default Service];"
code: true
---

The Content-Based Router pattern dynamically routes messages to different recipients or endpoints based on the content of the message itself. Unlike address-based routing which uses a header field to determine the destination, content-based routing examines the message body, properties, or payload to make a routing decision. This allows for greater flexibility and decoupling between sender and receiver, as senders don’t need to know the specific endpoints for each type of message.

This pattern is particularly useful in systems with complex integration requirements, microservices architectures, or message brokers where different services handle different types of data. It avoids the need for a central dispatcher to be tightly coupled to the specific logic of each service, promoting a more scalable and maintainable design. This is a very common pattern in Enterprise Integration Patterns (EIP).

## Usage

*   **Microservices Communication:** Route requests to specific microservices based on the data being requested (e.g., user data goes to the user service, product data to the product service).
*   **Event-Driven Architectures:** Dispatch events to different event handlers based on the event type or the data contained within the event. This is common with message brokers like Kafka or RabbitMQ.
*   **Data Processing Pipelines:**  Direct different data streams to separate processing stages depending on their data format or semantic content.
*   **Workflow Engines:** Route tasks or messages to different workflow steps based on the output of previous steps.

## Examples

*   **Apache Camel:** Camel is a widely-used integration framework that heavily utilizes content-based routing through its routing engine.  You define routing rules based on the message body using expressions (e.g., Simple expressions or XPath) to direct messages to specific components or endpoints.  For example, routing order messages based on the order total amount.

*   **Spring Cloud Stream:** Provides a flexible approach to building event-driven applications. Using binder-specific functionality (e.g., Kafka headers), messages can be filtered or routed to specific consumer groups based on their content.  For instance, routing log events based on the log level (INFO, WARN, ERROR) to different destinations.

*   **Kafka Streams:** Kafka's stream processing library allows routing of data streams based on content. You can use `KStream::filter` operations combined with multiple stream branches to achieve content-based routing to different data processing nodes. For example, routing data for different geographical regions.
