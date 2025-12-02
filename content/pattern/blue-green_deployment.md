---
title: Blue-Green Deployment
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["deployment", "operational"]
wikipedia: https://en.wikipedia.org/wiki/Blue%E2%80%93green_deployment
diagramtype: "sequence"
diagram: mermaid
sequenceDiagram
    participant User
    participant LoadBalancer
    participant BlueEnvironment
    participant GreenEnvironment
    participant DeploymentSystem

    User->>LoadBalancer: Request
    activate LoadBalancer
    LoadBalancer->>BlueEnvironment: Route Request (Initially)
    activate BlueEnvironment
    BlueEnvironment-->>LoadBalancer: Response
    deactivate BlueEnvironment
    LoadBalancer-->>User: Response
    deactivate LoadBalancer

    DeploymentSystem->>GreenEnvironment: Deploy New Version
    activate GreenEnvironment
    GreenEnvironment->>GreenEnvironment: Testing & Validation
    GreenEnvironment-->>DeploymentSystem: Deployment Complete & Healthy
    deactivate GreenEnvironment

    DeploymentSystem->>LoadBalancer: Switch Traffic to Green
    activate LoadBalancer
    LoadBalancer->>GreenEnvironment: Route Request
    activate GreenEnvironment
    GreenEnvironment-->>LoadBalancer: Response
    deactivate GreenEnvironment
    LoadBalancer-->>User: Response
    deactivate LoadBalancer

    DeploymentSystem->>BlueEnvironment: Keep as Fallback
    deactivate DeploymentSystem

code: true
---

Blue-Green Deployment is a release strategy that reduces downtime and risk by running two identical environments, 'blue' and 'green'.  The 'blue' environment serves all production traffic, while the 'green' environment is kept as a staging area for new releases. Once the new version is deployed and tested in the 'green' environment to ensure it's working correctly, traffic is switched from 'blue' to 'green'. 

This approach allows for instant rollbacks. If issues arise in the 'green' environment after the switch, directing traffic back to the 'blue' environment is a simple configuration change, minimizing downtime. It's beneficial for achieving continuous delivery and mitigating the impact of potentially faulty deployments.

## Usage

Blue-Green Deployment is commonly applied in scenarios demanding high availability and minimal downtime, such as:

*   **Web Applications:** Ensuring a seamless user experience during updates.
*   **Microservices Architectures:** Facilitating independent deployments of individual services without disrupting overall system functionality.
*   **Database Schema Changes:** Allowing schema updates to be tested thoroughly before going live, with a quick rollback option.
*   **Critical Business Systems:** Where any downtime directly translates to financial losses or reputational damage.

## Examples

*   **AWS Elastic Beanstalk:** Supports Blue/Green deployments directly, managing the creation and switching of environments for you.  You deploy a new version to the "green" environment, test it against a load-balanced test version, and then promote the "green" environment to production, seamlessly swapping traffic.
*   **Google Kubernetes Engine (GKE):**  Utilizes Kubernetes deployments and services to orchestrate Blue-Green deployments. You can deploy a new version as a separate deployment and then gradually shift traffic using service updates or ingress controllers.
*   **Azure App Service:** Offers swap deployment slots, effectively implementing a Blue-Green strategy. You deploy the new version to a staging slot ("green"), warm it up, and then swap it with the production slot ("blue").  The old production slot remains as a rollback option.