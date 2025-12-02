
---
title: Twelve-Factor App
date: 2024-02-29T10:30:00-00:00
draft: false
pattern_types: ["architectural", "best practice", "web"]
wikipedia: https://en.wikipedia.org/wiki/Twelve-factor_App
diagramtype: "sequence"
diagram: '''sequence
participant App
participant Config
participant Logs
participant Build
participant Release

App->>Config: Read Configuration
App->>Logs: Write Logs
Build->>Release: Create Release
Release->>App: Deploy App
'''
code: true
---

The Twelve-Factor App is a methodology for building software-as-a-service apps. It's a set of twelve guiding principles that help developers create portable, scalable, and maintainable applications, especially suited for modern cloud environments. These factors cover aspects like codebase, dependencies, configuration, backing services, build/release/run stages, and processes.

This pattern is crucial for DevOps practices, microservices architecture, and any application intended for cloud deployment (e.g., AWS, Azure, Google Cloud).  By adhering to these guidelines, teams can significantly reduce deployment friction, improve application resilience, and better utilize the benefits of cloud platforms while decreasing vendor lock-in and improving overall development speed.

## Usage

The Twelve-Factor App pattern is commonly applied in:

*   **Microservices development:** Each microservice is treated as a separate "app" and benefits from independent deployability and scalability.
*   **Cloud-native applications:**  Designed from the start for platforms like Heroku, Cloud Foundry, and Kubernetes.
*   **Continuous Integration/Continuous Deployment (CI/CD) pipelines:** Facilitates automated building, testing, and deployment processes.
*   **SaaS applications:** The original target use case, ensuring portability and scalability for multi-tenant environments.

## Examples

1.  **Heroku:** Heroku is a Platform-as-a-Service (PaaS) explicitly designed around the Twelve-Factor App methodology. It enforces configuration through environment variables, treats logs as event streams, and provides a buildpack system that aligns with the dependency management and build stages.  Dependencies are declared, and the platform handles their installation.

2.  **Docker and Kubernetes:**  Docker containers encapsulate the application and its dependencies, directly addressing the "Dependencies" factor. Kubernetes builds on this by providing a platform for automated deployment, scaling, and management of these containers, supporting the "Build, Release, Run" and "Processes" factors.  Configuration is commonly supplied via Kubernetes ConfigMaps and Secrets.

3. **Netlify:** A platform focusing on static site and frontend web application deployment. Promotes environment variables for configuration (Factor 6), and provides built-in support for logging and dependency management (npm, yarn, etc.). Its serverless functions also align well with the "Stateless processes" factor (Factor 8).
