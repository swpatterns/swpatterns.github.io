
---
title: Supervisor-Worker
date: 2024-02-29T15:30:00Z
draft: false
pattern_types: ["behavioral", "concurrency"]
wikipedia: "https://en.wikipedia.org/wiki/Supervisor_pattern"
diagramtype: "sequence"
diagram: 'sequenceDiagram\n    participant Supervisor\n    participant Worker\n    Supervisor->>Worker: Start Task\n    Worker->>Worker: Perform Task\n    alt Task Failed\n        Worker->>Supervisor: Report Failure\n        Supervisor->>Supervisor: Handle Failure (Restart/Escalate)\n        Supervisor->>Worker: Start Task (Retry)\n    else Task Succeeded\n        Worker->>Supervisor: Report Success\n    end'
code: true
---

The Supervisor-Worker pattern addresses the challenges of managing and maintaining long-running processes or tasks.  A Supervisor component is responsible for monitoring and controlling one or more Worker components. The Workers perform the actual work, while the Supervisor ensures that Workers stay alive, restarts them if they fail, and handles failures gracefully. This separation of concerns enhances the reliability and resilience of the system.

## Usage

This pattern is widely used in distributed systems, microservices architectures, and any scenario requiring asynchronous task processing with guaranteed execution.  Specifically, it's beneficial when: tasks are time-consuming, workers may encounter unpredictable failures, resilience is crucial for system stability, and monitoring/control of worker state is needed. Common applications include background job processing, data ingestion pipelines, and managing worker nodes in a cluster.

## Examples

1. **Kubernetes:** Kubernetes utilizes the Supervisor-Worker pattern extensively.  The Control Plane (Supervisor) manages Pods (Workers). If a Pod crashes, the Control Plane automatically restarts it, ensuring the desired number of replicas are always running. Health probes define the criteria for determining worker failure.

2. **Celery (Python):** Celery is a distributed task queue system.  Celery’s worker processes execute tasks, and a Celery broker (often Redis or RabbitMQ) combined with the Celery client (Supervisor) manages the workers. If a worker becomes unresponsive, the Celery client detects this and restarts it, or spawns a new one. The Supervisor also handles task distribution and result retrieval.

3. **Systemd (Linux):** Systemd is a system and service manager for Linux. It functions as a Supervisor, managing services (Workers). Systemd defines configurations for each service, including restart policies (e.g., "on-failure") that dictate how a service should be handled if it terminates unexpectedly, effectively embodying the Supervisor-Worker pattern at the OS level.
