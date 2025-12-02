
---
title: Ambassador
date: 2024-02-29T10:34:00Z
draft: false
pattern_types: ["behavioral", "microservices", "distributed systems"]
wikipedia: https://en.wikipedia.org/wiki/Proxy_pattern
diagramtype: "sequence"
diagram: 'sequenceDiagram\n  participant Client\n  participant Ambassador\n  participant Backend\n  Client->>Ambassador: Request\n  activate Ambassador\n  Ambassador->>Backend: Forward Request\n  activate Backend\n  Backend-->>Ambassador: Response\n  deactivate Backend\n  Ambassador-->>Client: Return Response'
code: true
---

The Ambassador pattern provides a single point of entry for a system (or set of backend services) while abstracting away the internal complexity. It acts as a forward-facing proxy that handles requests, potentially transforming them, adding security, and routing them to the appropriate backend.  This decouples clients from the backend implementation details, allowing for independent evolution and scaling of both.

## Usage

The Ambassador pattern is frequently used in microservice architectures to manage external access to internal services. It’s beneficial when you need to:

*   **Shield Backend Complexity:** Hide the internal structure and endpoints of services from external clients.
*   **Implement Cross-Cutting Concerns:** Add features like authentication, authorization, rate limiting, and monitoring without modifying the backend services themselves.
*   **Facilitate Versioning:**  Manage different versions of backend services and handle request routing based on versioning schemes.
*   **Simplify Client Interaction:**  Provide a consistent and simplified interface for clients, even as the backend evolves.
*   **Enable Protocol Translation:**  Expose services via one protocol (e.g., REST) while backend services use a different protocol (e.g., gRPC).

## Examples

1.  **Kong API Gateway:** Kong is a widely used open-source API gateway often deployed as an “Ambassador” in front of microservices. It provides features like authentication, rate limiting, transformation, and observability. Clients interact with Kong, and Kong forwards requests to the appropriate backend service based on configured routes and plugins.

2.  **AWS API Gateway:** Amazon's API Gateway is a fully managed service that acts as a front door for applications to access data, business logic, or functionality from your backend services. Similar to Kong, it handles request routing, authentication, authorization, and other critical functions, shielding the backend from direct client access.

3.  **Istio Ingress Gateway:** In a service mesh like Istio, the Ingress Gateway functions as an Ambassador. It handles incoming traffic from outside the mesh, enforcing policies and routing requests to services within the mesh.  This allows for consistent management of external access points across a fleet of microservices.
