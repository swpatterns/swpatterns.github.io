
---
title: Sidecar
date: 2023-11-21T10:30:00-00:00
draft: false
pattern_types: ["architectural", "system"]
wikipedia: https://en.wikipedia.org/wiki/Sidecar_(software_architecture)
diagramtype: "sequence"
diagram: sequenceDiagram
    participant App
    participant Sidecar
    participant ExternalService

    App->>Sidecar: Request (e.g., Logging, Metrics)
    Sidecar->>ExternalService: Communicate with external service
    ExternalService-->>Sidecar: Response
    Sidecar-->>App: Acknowledge
    note right of Sidecar:  Handles cross-cutting concerns without modifying app code
---

The Sidecar pattern involves deploying a secondary process (the “sidecar”) alongside a primary application in a supporting role. This sidecar is typically in a separate container but shares the same lifecycle as the main application, and it enhances the main application with functionality like logging, monitoring, security, or service discovery.  Crucially, the sidecar's concerns are distinct from the core business logic of the application, enabling loose coupling and independent scaling.

This pattern improves modularity and maintainability by isolating support functions.  It's especially beneficial in microservice architectures where consistent implementation of these supporting functions across multiple services can be challenging.  The sidecar approach allows teams to focus on developing core application features without being burdened by infrastructure concerns.

## Usage

The Sidecar pattern is commonly used in:

*   **Microservice Architectures:** Providing observability features (logging, tracing, metrics) to multiple microservices without requiring each service to implement them.
*   **Cloud-Native Applications:**  Managing service mesh concerns like traffic routing, load balancing, and security policies.
*   **Containerized Environments (Kubernetes):** Deploying auxiliary services alongside application containers, simplifying configuration and lifecycle management.
*   **Legacy Application Modernization:** Adding new features or capabilities to older applications without altering their core codebase.

## Examples

1.  **Istio Service Mesh:** Istio utilizes a sidecar proxy (Envoy) injected alongside each application container. This proxy handles all network communication, providing features like traffic management (routing, retries), security (authentication, authorization), and observability (metrics, tracing) without any code changes to the applications themselves.

2.  **Fluentd/Fluent Bit with Kubernetes:** When deploying applications to Kubernetes, Fluentd or Fluent Bit are often deployed as sidecar containers to collect logs from the application container and forward them to a centralized logging system like Elasticsearch or Splunk. This decouples logging from the application, simplifying operations and allowing for flexible log processing.  The applications don’t need specific logging libraries or configurations.

3.  **Ambassador API Gateway:** Ambassador, similar to Istio, leverages sidecar proxies based on Envoy. Deploying Ambassador as a sidecar allows for API management, authentication, and other gateway functions to be applied to services without service code changes.
