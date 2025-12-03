
---
title: Correlation ID
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["transversal", "observability", "distributed systems"]
wikipedia: ""
diagramtype: "sequence"
diagram: "sequenceDiagram
    participant User
    participant API Gateway
    participant Service A
    participant Service B
    User->>API Gateway: Request
    API Gateway->>Service A: Request (CID: X)
    Service A->>Service B: Request (CID: X)
    Service B-->>Service A: Response
    Service A-->>API Gateway: Response
    API Gateway-->>User: Response
    "
code: true
---

The Correlation ID pattern is a technique used in distributed systems to track a single request as it flows across multiple services. It assigns a unique identifier to each request at its entry point (typically the API Gateway or initial client request) and propagates this identifier throughout all subsequent service calls and logs. This allows for end-to-end tracing and simplified debugging of complex interactions.

Without a correlation ID, understanding the complete path of a single request across multiple microservices can be extremely difficult, relying on manual correlation of timestamps and potentially incomplete logging. Correlation IDs enable developers and operations teams to quickly pinpoint the source of issues, analyze performance bottlenecks, and gain observability into system behavior.

## Usage

*   **Microservices Architecture:** Crucial for tracking requests as they traverse numerous independent services.
*   **Asynchronous Communication:** Essential when using message queues (e.g., Kafka, RabbitMQ) where request flow isn’t linear.
*   **Logging and Monitoring:** Used extensively in centralized logging systems (e.g., ELK stack, Splunk) and monitoring tools (e.g., Prometheus, Datadog) to correlate events.
*   **Distributed Transactions:** Aids in tracking the progress and potential failures of distributed transactions.
*   **User Session Tracking (Alternative):** While not its primary purpose, it can complement user session tracking, especially for operations not directly tied to a specific user session.

## Examples

*   **AWS X-Ray:** AWS X-Ray uses correlation IDs (specifically, trace IDs and segment IDs) to trace requests across AWS services.  When a request is made, X-Ray generates a unique trace ID and propagates it through service calls. Each segment represents a unit of work within a service.
*   **Google Cloud Trace:**  Similar to AWS X-Ray, Google Cloud Trace provides a mechanism to trace requests through Google Cloud services. It also leverages a unique trace ID that is automatically propagated by the Cloud Trace agent, allowing for performance analysis and error detection across distributed components.
*   **Zipkin:** An open-source distributed tracing system. Zipkin uses a "trace ID" as the correlation ID, and the libraries provided for various programming languages automatically propagate this ID through HTTP headers and message queues.
*   **Azure Application Insights:** Microsoft’s application performance management service automatically instruments applications and provides distributed tracing capabilities, using a correlation ID to tie together actions across different parts of the application and supporting infrastructure.
