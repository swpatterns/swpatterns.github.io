---
title: Message Filter
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "middleware"]
wikipedia: ""
diagramtype: "sequence"
diagram: "sequenceDiagram
    participant Client
    participant MessageFilter
    participant Handler1
    participant Handler2
    participant DefaultHandler

    Client->>MessageFilter: send message
    MessageFilter->>Handler1: check if handles message
    alt Handler1 can process
        Handler1->>MessageFilter: returns true
        MessageFilter->>Handler1: forward message
        Handler1->>Client: process message
    else Handler1 cannot process
        MessageFilter->>Handler2: check if handles message
        alt Handler2 can process
            Handler2->>MessageFilter: returns true
            MessageFilter->>Handler2: forward message
            Handler2->>Client: process message
        else Handler2 cannot process
            MessageFilter->>DefaultHandler: handle message
            DefaultHandler->>Client: process message
        end
    end
    "
code: true
---

The Message Filter pattern involves defining multiple handlers, each responsible for processing a specific type of message. A filter component receives a message and iterates through the handlers, forwarding it to the first handler that accepts it. If no handler accepts the message, it's passed to a default handler.  This decoupling of message processing logic enhances maintainability and extensibility.

## Usage

This pattern is frequently applied in event-driven systems, message queues, and middleware pipelines. It allows for a flexible and scalable way to handle various message types without tightly coupling the message source to message consumers. Common use cases include:

*   **Web application request processing:** Filtering incoming HTTP requests based on URL patterns, headers, or content types and routing them to the appropriate controller.
*   **Email processing:** Filtering incoming emails based on sender, subject, or content and performing different actions, such as spam filtering, routing to folders, or triggering automated responses.
*   **Logging frameworks:** Filtering log messages based on severity level or source and directing them to different output destinations (e.g., console, file, database).
*   **Chatbots:** Classifying user messages by intent, and routing them to the appropriate function or logic block for processing.

## Examples

1.  **Spring Web MVC Filters (Java):** Spring MVC utilizes filters to intercept HTTP requests before they reach controllers. These filters can perform tasks like authentication, authorization, logging, or modifying the request/response. Each filter checks if it should process the request and, if so, executes its logic or passes it to the next filter in the chain. The `FilterChain` provides the mechanism for cascading filters.

2.  **Node.js Express Middleware (JavaScript):** Express middleware functions operate on the request and response objects, and can modify them or terminate the request-response cycle. They are organized in a pipeline, where each middleware function has the opportunity to process the request.  Similar to Spring filters, Express middleware checks if a request matches its criteria and either proceeds to handle it, or passes it on using `next()`. Common examples include authentication (`express-jwt`), logging (`morgan`), and CORS (`cors`).

3.  **RabbitMQ Exchanges and Queues (Message Broker):** RabbitMQ utilizes exchanges to route messages to queues based on binding rules. An exchange acts as a filter – it receives a message and routes it to one or more queues depending on the routing key and binding configuration. Different exchange types (direct, topic, fanout, headers) provide distinct filtering capabilities. This allows for message consumers to only receive relevant messages.