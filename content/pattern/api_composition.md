---
title: API Composition
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["architectural", "integration"]
wikipedia: ""
diagramtype: "sequence"
diagram: "sequenceDiagram
    participant Client
    participant Orchestrator
    participant API_A
    participant API_B

    Client->>Orchestrator: Request data
    activate Orchestrator
    Orchestrator->>API_A: Request part A
    activate API_A
    API_A-->>Orchestrator: Return part A
    deactivate API_A
    Orchestrator->>API_B: Request part B
    activate API_B
    API_B-->>Orchestrator: Return part B
    deactivate API_B
    Orchestrator->>Orchestrator: Combine A & B
    Orchestrator-->>Client: Return composed data
    deactivate Orchestrator
    "
code: true
---

API Composition is an architectural pattern that allows building new APIs by combining multiple existing APIs. Instead of creating monolithic APIs that handle all functionality, or requiring clients to interact with numerous individual APIs, an orchestrator API aggregates and transforms data from several backend APIs to present a unified and tailored interface. This promotes reusability, flexibility, and faster development cycles by leveraging existing services rather than duplicating efforts.

This pattern is particularly useful in microservices architectures where services are independently deployable and responsible for specific business capabilities. It helps to shield clients from the underlying complexity of the microservice landscape, presenting a simplified view and avoiding the "API sprawl" problem. It facilitates the creation of specialized APIs optimized for specific client needs without altering existing backend services.

## Usage

API composition is frequently used in:

*   **Backend for Frontend (BFF):** Creating separate APIs tailored to the specific requirements of different client applications (e.g., mobile, web, IoT).
*   **Microservices Orchestration:** Coordinating interactions between multiple microservices to fulfill a user request.
*   **Legacy System Integration:** Wrapping older, less flexible APIs to provide a modern, streamlined interface.
*   **Data Aggregation:** Combining data from various sources (APIs) into a single, coherent dataset.

## Examples

1.  **Netflix:** Netflix uses API composition extensively. Their different client applications (TV, mobile, web) all need data related to user profiles, movie catalogs, recommendations, and playback. Rather than having each client call multiple backend services directly, Netflix employs BFFs using API composition to aggregate and transform data specifically for each client, optimizing the experience. For instance, the mobile app might require a smaller, more focused data set than the full web interface.

2.  **AWS AppSync:** AWS AppSync is a managed service that simplifies building GraphQL APIs. It relies heavily on API composition by allowing developers to define resolvers that fetch data from various data sources, including AWS Lambda functions, DynamoDB, RDS databases, and other HTTP APIs.  AppSync then handles the composition of this data based on the GraphQL query, presenting a single, unified GraphQL endpoint to clients. This decoupling from data source implementation is a prime example of API Composition in action.

3. **Shopify:** Shopify's storefront API exemplifies this pattern. Instead of requiring merchants to directly interact with APIs for product management, order processing, inventory, and shipping, Shopify offers a unified storefront API that composes data from these underlying services. This provides a consistent and streamlined experience for developers building custom storefronts or integrating with third-party platforms.