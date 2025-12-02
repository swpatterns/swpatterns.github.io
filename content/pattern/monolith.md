
---
title: Monolith
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["architectural", "traditional"]
wikipedia: https://en.wikipedia.org/wiki/Monolithic_application
diagramtype: "component"
diagram: "[Component: Application]\n[Component: UI] --> [Component: Application]\n[Component: Business Logic] --> [Component: Application]\n[Component: Data Access] --> [Component: Application]\n[Component: Database] --> [Component: Data Access]\n[note: All components tightly coupled within a single deployable unit {bg:lightgrey}]"
code: true
---

The Monolith is a traditional software architectural style that structures an application as a single, self-contained unit. All components – user interface, business logic, data access, and database – are bundled together and deployed as one. This approach simplifies initial development and deployment, as everything resides in a single codebase and environment.

However, as the application grows in complexity, the monolith can become difficult to understand, maintain, and scale. Changes in one part of the application can have unintended consequences in others, and the entire application needs to be redeployed for even minor updates.  Despite these drawbacks, the monolith remains a common starting point for many projects, especially those with limited scope or resources.

## Usage

The Monolith pattern is commonly used in:

*   **Small to Medium-Sized Applications:** Where the complexity is manageable and the benefits of microservices don't outweigh the overhead.
*   **Rapid Prototyping:**  Its simplicity allows for quick development and iteration.
*   **Legacy Systems:** Many older applications were originally built as monoliths and are still in use today.
*   **Teams with Limited DevOps Experience:**  Deploying and managing a single unit is easier than coordinating multiple microservices.

## Examples

*   **WordPress:**  Initially designed as a monolithic application, WordPress handles content management, user authentication, themes, and plugins within a single codebase. While it has evolved to support some plugin isolation, the core remains a monolith.
*   **Ruby on Rails Applications (Early Stages):** A typical "Rails" application, especially when first created, often follows a monolithic architecture. All the application's layers (model, view, controller) are tightly integrated within the same deployment unit. As these applications grow, developers often consider breaking them down into microservices.
*   **Early Netflix:** Before its widespread adoption of microservices, Netflix was a monolithic application. It handled everything from user accounts and recommendations to video streaming within a single system. The challenges of scaling and maintaining this monolith led to its eventual decomposition.
