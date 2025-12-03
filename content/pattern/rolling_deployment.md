---
title: Rolling Deployment
date: 2024-02-29T14:35:00Z
draft: false
pattern_types: ["behavioral", "deployment"]
wikipedia: https://en.wikipedia.org/wiki/Rolling_update
diagramtype: "sequence"
diagram: "sequenceDiagram
    participant OldVersion
    participant NewVersion
    participant LoadBalancer
    participant Client

    Client->>LoadBalancer: Request
    alt LoadBalancer directs to OldVersion
        LoadBalancer->>OldVersion: Forward Request
        OldVersion->>Client: Response
    else LoadBalancer directs to NewVersion
        LoadBalancer->>NewVersion: Forward Request
        NewVersion->>Client: Response
    end
    loop Gradually replacing OldVersion with NewVersion
        NewVersion++
        OldVersion--
    end
    "
code: true
---

Rolling deployment is a software deployment strategy where new versions of an application are released to a subset of users or servers at a time, rather than all at once. This approach minimizes downtime and reduces the risk of widespread issues by allowing for gradual rollout and monitoring. If problems are detected, the deployment can be paused or rolled back, affecting only a small portion of the user base.

The core idea is to incrementally replace older instances with newer ones while maintaining application availability.  This contrasts with strategies like blue/green deployments, which involve completely switching traffic.  Rolling deployments often utilize load balancers and health checks to ensure only healthy instances serve traffic during the transition.

## Usage

Rolling deployments are widely used in modern software delivery pipelines for several reasons:

*   **Continuous Delivery/Continuous Integration (CI/CD):** They seamlessly integrate into automated CI/CD processes, enabling frequent and reliable releases.
*   **Microservices Architecture:**  Ideal for updating individual microservices without disrupting the entire application.
*   **High Availability:** Minimizes downtime, essential for critical applications.
*   **Risk Mitigation:** Limits the blast radius of potential bugs or compatibility issues.
*   **A/B Testing and Canary Releases:** Can be adapted for A/B testing by routing specific users or traffic to the new version.

## Examples

1.  **Kubernetes:** Kubernetes natively supports rolling updates for deployments. The `kubectl apply` command, combined with deployment configurations, handles the gradual replacement of pods, ensuring a specific number of pods are always available.  Kubernetes also provides health checks and rollback capabilities integral to the rolling deployment process.

2.  **AWS Elastic Beanstalk:** AWS Elastic Beanstalk provides a rolling update feature that simplifies deploying new versions of applications running on EC2 instances or containers. It manages capacity provisioning and health checks, automatically updating instances in batches and pausing if issues are detected.

3.  **Spinnaker:** This open-source, multi-cloud continuous delivery platform explicitly supports various deployment strategies, including rolling deployments (often called "canary"). Spinnaker provides advanced features like automated analysis of deployment metrics and intelligent rollback.