---
title: "Projection"
date: 2023-10-27T14:35:00-00:00
draft: false
pattern_types: ["behavioral", "data"]
wikipedia: "https://en.wikipedia.org/wiki/Project_(data_management)"
diagramtype: "class"
diagram: "[Client] --|> [Projector] : uses\n[DataSource] --|> [Projector] : provides data\n[Projector] --> [DataView] : creates\n[DataView] --x-- [Client] : observed by"
code: true
---

The Projection pattern addresses the problem of efficiently delivering only the data required by a client or use case, preventing over-fetching and improving performance. Instead of exposing the entire data model, a *projector* transforms the source data into a simplified *data view* specifically tailored for the consumer. This enhances decoupling, as changes to the source data model don't necessarily require changes to how the data is consumed.

This pattern is especially useful in scenarios involving diverse clients with varying data needs, such as building APIs, creating read models for specific user interfaces, and implementing event sourcing systems. It's crucial for managing complexity and optimizing data transfer in distributed systems and microservice architectures.

## Usage

*   **API Gateways/Backend for Frontends (BFF):**  A BFF often uses projection to tailor API responses to the precise requirements of specific client applications (e.g., mobile app vs. web dashboard). This avoids sending unnecessary data over the network.
*   **Read Models in CQRS:** In Command Query Responsibility Segregation (CQRS), projection transforms write-side events into optimized read models for quick querying, offering a focused data view for each query.
*   **Data Warehousing and ETL:**  Transforming data from operational systems into denormalized, aggregated schemas optimized for analytical queries is a classic projection use case.
*   **GraphQL:** GraphQL intrinsically uses projections, allowing the client to request only specific fields from the data graph.

## Examples

1.  **GraphQL:**  GraphQL is a query language for your API, and a runtime for fulfilling those queries with your existing data. Clients specify exactly which fields they need in a query, and the GraphQL server projects only those fields from the underlying data sources. For example, a client might request only the `name` and `email` fields of a `User` object, while the database contains additional fields like `passwordHash` and `registrationDate` which are never transmitted.

2.  **React with Redux (Selectors):**  In a React application using Redux, components often only need a small portion of the global application state. *Selectors* act as projectors: they take the entire Redux state as input and extract and transform the specific data required by a component.  Instead of passing the whole state to a component, a selector projects out a customized data view, enhancing performance and component decoupling.  For instance, a user profile component might use a selector to project only the `username`, `profilePicture`, and `bio` from a larger `user` object within the Redux store.

3.  **Hibernate/JPA (DTOs and Projections):** JPA provides the ability to project data into Data Transfer Objects (DTOs).  Rather than retrieving entire entities from the database, you can define a "projection" that maps only the required fields to a simple Java class (the DTO).  This reduces database load and network traffic, similar to the benefit from GraphQL. For example, when displaying a list of product names and prices, you can project data into a `ProductSummary` DTO instead of fetching the full `Product` entity.