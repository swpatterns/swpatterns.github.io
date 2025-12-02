
---
title: "Adapter Container"
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "integration"]
wikipedia: ""
diagramtype: "class"
diagram: "[Client] --|> [Adapter]
[Adapter] --|> [Service]
[Service] --|> [ExistingService]
[ExistingService] [note: Legacy system with incompatible interface {bg:lightyellow}]"
code: true
---

The Adapter Container pattern addresses integration challenges when a client requires a service through a specific interface, but the available service provides a different, incompatible interface. This pattern encapsulates the legacy service within an adapter, translating requests from the client’s interface to the legacy service’s interface and vice-versa, without requiring modifications to either the client or the service. It’s a specific application of the Adapter pattern focusing on the scenario of wrapping an entire service container.

Essentially, the Adapter Container lays a new interface *over* an existing service container. This is useful when migrating to new technologies, supporting multiple integrations with varying needs, or needing to add standardized logging/monitoring to existing services without altering their core functionality.  The adapter handles all interaction details, presenting a clean and consistent contract to the outside world.

## Usage

The Adapter Container pattern is commonly used in:

*   **Microservices Architecture:** Integrating legacy monolithic applications with new microservices. The adapter provides a standardized API for the monolith, enabling microservices to interact with it.
*   **Cloud Migration:**  Exposing on-premise services to cloud environments through a consistent interface.
*   **API Gateway Implementation:** Acting as a layer between clients and backend services, handling authentication, rate limiting, and protocol translation.
*   **Third-Party Library Integration:**  Wrapping third-party libraries that don't conform to the project's coding standards or desired interface.

## Examples

1.  **AWS Lambda with Legacy Systems:**
    Imagine you have an older system that processes data via a specific database schema and API endpoints. You want to trigger this system from AWS Lambda. You can create an Adapter Container – a Lambda function that acts as an adapter. This adapter receives requests in a standard JSON format, translates them into the format required by the legacy system (e.g., specific database queries or API calls), and then relays the results back to the caller in a standard JSON format. This prevents needing to modify the legacy system to work with Lambda.

2.  **Spring Cloud Gateway:**
    Spring Cloud Gateway is a powerful API gateway built on Spring Framework 5 and above. It effectively implements the Adapter Container pattern. It allows you to define routes for requests and use filters to transform those requests before sending them to the backend services. For example, it can translate between different authentication schemes, add headers, modify request bodies, or call legacy systems via specific adapters. All of this is done without requiring changes to the backend services themselves - the Gateway adapts the requests.
