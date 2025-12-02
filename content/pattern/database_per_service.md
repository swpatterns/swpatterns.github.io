
---
title: Database per Service
date: 2024-02-29T15:30:00Z
draft: false
pattern_types: ["architectural", "DDD", "microservices"]
wikipedia: "https://martinfowler.com/bliki/DatabasePerService.html"
diagramtype: "class"
diagram: "[ServiceA] --|> [DatabaseA] : owns\n[ServiceB] --|> [DatabaseB] : owns\n[ServiceC] --|> [DatabaseC] : owns\n[note: Each service owns its database {bg:lightgreen}]"
code: true
---

The Database per Service pattern dictates that each microservice should have its own dedicated database. This contrasts with a shared database approach where multiple services access a single database, which is a common anti-pattern in microservice architectures. The key principle is to decouple data storage from the services themselves, allowing each service full control over its data model and technology choices.

This pattern enhances a microservice's autonomy, resilience, and scalability. Independent databases allow services to evolve without impacting others, support different database technologies best suited for their specific needs, and minimize contention. While it introduces operational complexity, this complexity is often outweighed by the benefits of loose coupling and increased agility.

## Usage

The Database per Service pattern is commonly used in:

*   **Microservice Architectures:** This is the primary use case, where independent services require independent data management.
*   **Domain-Driven Design (DDD):** When applying DDD, each bounded context naturally aligns with a dedicated database ensuring data consistency within the context but allowing flexible data representation across different contexts.
*   **Large-Scale Web Applications:** Breaking down monolithic databases into smaller, service-specific databases simplifies scaling, maintenance, and independent deployments.
*   **Cloud-Native Applications:** The pattern fits well with cloud-based database services that facilitate scaling and management of multiple instances.

## Examples

*   **Netflix:**  Netflix famously utilizes this pattern. Different functional areas such as user accounts, recommendations, streaming data, and billing, each operate with their own database tailored to their precise requirements. For instance, the recommendation service might employ a graph database for efficient relationship analysis, while the user account service uses a relational database for structured user data.
*   **Amazon:** Amazon's e-commerce platform is built on a microservices architecture, and each service (e.g., product catalog, shopping cart, order processing) has its own database. This allows Amazon to scale individual services independently based on demand. Their use of different database technologies (relational, NoSQL, etc.) is also enabled by this pattern, optimised to each service’s workload.
*   **Spotify:** Spotify leverages database per service in their backend. Different microservices like user profiles, music catalog, playlists, and payments each have their own dedicated databases. This separation allows Spotify to update and scale different parts of its application without affecting others.
