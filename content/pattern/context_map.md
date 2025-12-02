---
title: Context Map
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["DDD", "strategic design"]
wikipedia: ""
diagramtype: "class"
diagram: "[Context] --|> [BoundedContext] : contains\n[BoundedContext] ..> [SharedKernel] : uses\n[BoundedContext] --|> [DomainModel] : models\n[BoundedContext] ..> [CustomerSuccessTeam] : maintained by\n[BoundedContext] --|> [StrategicGoal] : supports\n[Context] --|> [CoreDomain] : includes\n[Context] --|> [SupportingSubdomain] : includes\n[Context] --|> [GenericSubdomain] : includes\n[BoundedContext] [note: Owns a unique Domain Model]\n[StrategicGoal] [note: Business objectives]\n[CustomerSuccessTeam] [note: Team responsible for the context]"
code: true
---

The Context Map pattern is a strategic design technique for managing the complexity of a large domain by explicitly defining the boundaries between different areas of responsibility – Bounded Contexts. It visually represents the relationships and dependencies between these contexts, focusing on how they interact and influence each other. By clarifying these connections, it helps avoid integration issues, promotes autonomous teams, and aligns software development with business goals.

This pattern doesn't prescribe *how* contexts are integrated (e.g., APIs, events), but rather *that* their relationships are understood and documented. A context map helps organizations prioritize integration efforts, identify potential bottlenecks, and make informed decisions about system ownership, data consistency, and overall architecture. It’s a communication tool as much as a technical one.

## Usage

The Context Map is used in large organizations or projects with complex domains. Common scenarios include:

*   **Microservice architecture:** Defining clear boundaries services and the nature of their communication.
*   **Multiple teams working on a single product:** Giving each team autonomy over its own domain model and integration points.
*   **Mergers and acquisitions:** Integrating disparate systems and understanding the overlap or gaps in their functionality.
*   **Legacy system modernization:** Breaking down monolithic applications into manageable, contextually aligned components.
*   **Large-scale distributed systems:** Understanding the relationship between different systems and managing data flow.

## Examples

1.  **Amazon:** Amazon's domain is vast. A context map would identify Bounded Contexts like "Order Management," "Inventory," "Payment Processing," "Shipping," and "Customer Profiles." The relationships would demonstrate how these contexts interact – for example, "Order Management" uses the "Inventory" context to check product availability and the "Payment Processing" context for payment authorization. Each context is likely managed by a separate team, with specific data ownership and models.

2.  **Spotify:** Spotify can be broken down into Bounded Contexts such as “User Accounts,” “Music Catalog,” “Playlist Management,” “Recommendation Engine,” and "Payment/Subscription".  The “Recommendation Engine” relies heavily on data from “Playlist Management” and “User Accounts,” illustrating a strong dependency. Each context has a dedicated team and specific domain experts shaping its evolution, while the Context Map details how these parts fit together into a cohesive music streaming platform.