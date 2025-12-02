
---
title: Canary Release
date: 2024-02-29T14:37:00Z
draft: false
pattern_types: ["behavioral", "deployment", "reliability"]
wikipedia: https://en.wikipedia.org/wiki/Canary_release
diagramtype: "sequence"
diagram: '[participant User]\n[participant Load Balancer]\n[participant Canary Instance]\n[participant Production Instance]\n\nUser -> Load Balancer: Request\nLoad Balancer -> Canary Instance: 1% of requests\nLoad Balancer -> Production Instance: 99% of requests\nCanary Instance -> Load Balancer: Response\nProduction Instance -> Load Balancer: Response\nLoad Balancer -> User: Response\n\n[note: Monitor Canary for errors & performance {bg:lightyellow}]'
code: true
---

The Canary Release pattern is a deployment strategy where a new version of software is rolled out to a small subset of users or servers before being made available to the entire infrastructure. This allows for real-world testing of the new version with minimal impact, enabling teams to detect and address any unforeseen issues, performance regressions, or bugs in a controlled manner. The "canary" acts as an early warning system, hence the name, alerting the team to potential problems before a wider deployment.

This pattern prioritizes risk reduction and user experience. By observing the canary in production, teams can validate key metrics, gather user feedback, and ensure the stability of the new release.  If the canary performs as expected, the rollout can proceed to more users; if issues arise, the new version can be quickly rolled back, preventing a widespread outage or negative impact.

## Usage

*   **Microservices Architecture:** Canary releases are exceptionally well-suited for microservices. New versions of individual services can be deployed to a small number of instances behind a load balancer, allowing for targeted testing and minimal disruption to other services.
*   **High-Traffic Websites & Applications:** Rolling out updates to a small percentage of users during peak hours allows for observation of performance under realistic load without affecting the majority of the user base.
*   **Complex System Updates:** When updates involve significant changes to core functionality or dependencies, a canary release provides a safety net to ensure compatibility and stability.
*   **A/B Testing:** Can be used in conjunction with A/B testing. A new version can be the "B" variant tested against a current version ("A") allowing business metrics to drive the percentage rollout.

## Examples

*   **Gmail:** Gmail frequently employs canary releases to test new features. A small percentage of Gmail users (often Google employees) may see a new interface or functionality before it's released to the general public. Monitoring these "canary" users’ behavior and reporting any issues helps refine the feature before a broad rollout.
*   **AWS CodeDeploy:** AWS CodeDeploy supports canary deployments for applications running on EC2, ECS, and other AWS services.  It allows configuring incremental deployment strategies, automatically shifting traffic to the new version while monitoring its health. If problems are detected, CodeDeploy can automatically halt the deployment or roll back to the previous version.
*   **Docker Swarm/Kubernetes:** Container orchestration platforms like Docker Swarm and Kubernetes have built-in support for rolling updates and, by extension, canary deployments.  You can specify the number of replicas for a new version and gradually increase them while monitoring performance.
*   **LaunchDarkly:** As a Feature Management platform, LaunchDarkly specifically facilitates canary releases (and many other deployment strategies) by allowing development teams to release features to specific users or percentage of traffic, monitor performance, and rollback instantly.
