
---
title: Health Check Endpoint
date: 2024-02-29T16:21:32-08:00
draft: false
pattern_types: ["architectural", "observability"]
wikipedia: ""
diagramtype: "sequence"
diagram: "sequenceDiagram
    participant Client
    participant LoadBalancer
    participant ServiceA
    participant DatabaseA
    participant ServiceB
    participant CacheB

    Client->>LoadBalancer: GET /health
    LoadBalancer->>ServiceA: Health Check
    ServiceA->>DatabaseA: Connection Test
    alt Connection Successful
        DatabaseA-->>ServiceA: OK
    else Connection Failed
        DatabaseA-->>ServiceA: Error
    end
    ServiceA->>LoadBalancer: Service A Healthy/Unhealthy
    LoadBalancer->>ServiceB: Health Check
    ServiceB->>CacheB: Cache Lookup
    alt Cache Hit
        CacheB-->>ServiceB: OK
    else Cache Miss
        CacheB-->>ServiceB: Error
    end
    ServiceB->>LoadBalancer: Service B Healthy/Unhealthy
    LoadBalancer-->>Client: Overall Health Status
    "
code: true
---

The Health Check Endpoint pattern provides a way to expose an endpoint that reports the overall health and status of an application or service. This endpoint allows external systems, such as load balancers, monitoring tools, and other services, to determine if the application is running and able to handle requests. It's a crucial component for ensuring high availability and automated recovery in distributed systems.

This pattern prevents sending requests to unhealthy instances by informing monitoring systems and load balancers about the service status. It drastically reduces error rates for end-users and speeds up the detection of outages, enabling faster debugging and remediation. Health checks are typically lightweight and fast to execute to minimize overhead on the application.

## Usage

The Health Check Endpoint pattern is commonly used in:

*   **Microservices Architecture:** Essential for load balancers to route traffic only to healthy service instances.
*   **Cloud-Native Applications:** Integrated with cloud platform health monitoring and auto-scaling features.
*   **Containerized Environments (Docker, Kubernetes):** Used by orchestration systems to determine when to restart or replace failing containers.
*   **Continuous Integration/Continuous Deployment (CI/CD) Pipelines:** Verifies the successful deployment of new application versions.
*   **Monitoring and Alerting Systems:** Provides a simple and reliable way to monitor application availability.

## Examples

1.  **Kubernetes Liveness and Readiness Probes:** Kubernetes uses liveness probes to determine if a container needs to be restarted and readiness probes to determine if a container is ready to serve traffic. These probes are essentially health check endpoints that Kubernetes periodically calls.  A failing liveness probe will restart the container, while a failing readiness probe will remove the container from service endpoints.

2.  **AWS Elastic Load Balancing (ELB) Health Checks:** AWS ELB uses health checks to monitor the health of registered instances.  The ELB periodically sends requests to a specified path (e.g., `/health`) on each instance. If the instance doesn't respond with a 200 OK status code, it's considered unhealthy and removed from the load balancing rotation.

3.  **Spring Boot Actuator:** Spring Boot's Actuator module provides built-in endpoints for monitoring and managing applications, including a `/health` endpoint that reports on the overall health of the application and its dependencies (e.g., database connections, disk space). This can be easily customized to include specific checks relevant to the application's logic.
