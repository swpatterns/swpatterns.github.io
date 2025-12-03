---
title: Shadow Deployment
date: 2024-02-29T15:30:00-00:00
draft: false
pattern_types: ["behavioral", "deployment", "reliability"]
wikipedia: ""
diagramtype: "sequence"
diagram: "sequenceDiagram
    participant User
    participant LoadBalancer
    participant ProductionSystem
    participant ShadowSystem
    User ->> LoadBalancer: Request
    LoadBalancer ->> ProductionSystem: Request (100%)
    alt Shadowing Enabled
        LoadBalancer ->> ShadowSystem: Request (copy)
        ShadowSystem ->> ShadowSystem: Process Request (no impact)
    end
    ProductionSystem -->> LoadBalancer: Response
    LoadBalancer -->> User: Response
    "
code: true
---

Shadow Deployment is a technique to test changes in a live production environment without impacting real users. It involves duplicating real production traffic to a new, "shadow" version of the application. This allows for observing the new system's behavior under realistic load, identifying potential issues like performance bottlenecks, errors, or unexpected side effects, before a full rollout. The shadow system doesn’t serve responses to users; it purely receives and processes requests for monitoring purposes.

This pattern mitigates risks associated with deploying untested code and is a crucial component of robust continuous delivery pipelines. It allows teams to gain confidence in new features, bug fixes, or infrastructure changes under production conditions. Post-deployment analysis of shadow traffic can also yield valuable insights into user behavior and system interactions, informing further optimizations and refinements.

## Usage

*   **New Feature Validation:** Testing the functionality and performance of a new feature with live traffic without exposing it to end-users.  This is vital for complex features that are difficult to test comprehensively in staging environments.
*   **Performance Testing:**  Evaluating the performance characteristics of a new application version under actual load conditions, detecting regressions or performance improvements.
*   **Database Schema Migrations:** Verifying the impact of database schema changes by running them against a shadow database populated with mirrored production data.
*   **Infrastructure Changes:** Validating changes to infrastructure components like caching layers, message queues, or load balancers without user disruption.
*   **Canary Release Preparation:** As a precursor to canary releases, shadow deployment provides a first line of defense, identifying critical issues before even a small subset of users are exposed.

## Examples

*   **Netflix:** Netflix extensively uses shadow deployment, particularly for components of their recommendation engine and billing system. They mirror production traffic to shadow instances to evaluate new ranking algorithms or billing logic without affecting user experience.  Any discrepancies are flagged and investigated before a full rollout.
*   **LinkedIn:** LinkedIn employs shadow deployment to test changes to their core serving infrastructure. By shadowing production requests against new code paths, they can assess the impact on latency, throughput, and error rates before serving the changes to real users. This allows them to maintain a high level of service reliability during frequent deployments.
*   **Istio (Service Mesh):** Istio, a popular service mesh, offers built-in support for traffic shadowing. You can configure it to mirror a percentage of traffic to a shadow version of a service, enabling testing and validation in a production setting. Traffic mirroring rules can be precisely controlled using Istio's configuration.