---
title: "Shared Kernel"
date: 2023-10-27T10:30:00-00:00
draft: false
pattern_types: ["DDD", "structural"]
wikipedia: "https://en.wikipedia.org/wiki/Shared_kernel_pattern"
diagramtype: "class"
diagram: "[SubsystemA] -- \"uses\" --> [Kernel]\n[SubsystemB] -- \"uses\" --> [Kernel]\n[Kernel] .. \"is a\" .. [DomainModel]"
code: true
---

The Shared Kernel pattern addresses the challenge of integrating two or more distinct bounded contexts in Domain-Driven Design. It arises when a small, well-defined part of the domain model is inherently shared and crucial to the operation of multiple contexts. Instead of duplicating this logic (leading to inconsistencies) or attempting a full integration (which can create a monolithic system), the Shared Kernel encapsulates this shared domain model within a dedicated kernel, acting as a bridge between the contexts. 

This kernel isn't merely a shared database schema; it encompasses the essential domain objects, rules, and logic that *must* be consistent across the participating systems.  Other parts of each bounded context remain independent, allowing them to evolve separately. The success of this pattern hinges on keeping the kernel truly small and focusing intensely on the minimal set of concepts that genuinely benefit from shared understanding.

## Usage

The Shared Kernel pattern is commonly used in situations like:

*   **Microservices Evolution:** When starting with a monolithic application and breaking it down into microservices, a Shared Kernel can help manage initially overlapping domains.
*   **Partner Integrations:** When integrating with external partners who have a shared understanding of certain domain concepts, a kernel can provide a common language and representation.
*   **Legacy System Integration:** Incorporating pieces of a legacy system’s domain logic into a newer system, while minimizing overall coupling.
*   **Limited Domain Overlap:** Scenarios where two teams are working on adjacent, but interconnected, parts of a larger business domain with a small area of shared, critical logic.

## Examples

1.  **E-commerce and Inventory Management:** An online e-commerce platform and a separate inventory management system might share a core understanding of `Product` (SKU, description, price, basic attributes).  Instead of each system maintaining its own potentially divergent `Product` model, they could use a Shared Kernel defining this core concept and its invariants.  The e-commerce system can then enrich the `Product` with marketing data; inventory management with stock levels, while both rely on the shared kernel for fundamental product information.

2.  **Banking – Accounts and Transactions:**  A banking system may consist of a “Core Banking” system responsible for managing accounts and a “Payments” system handling transaction processing. They share a fundamental understanding of “Money” & “Currency”. A Shared Kernel could model these concepts, ensuring both systems operate on a consistent definition of monetary value, exchange rates, and allowed precision. The Core Banking system might extend `Account` with regulatory information; the Payments system with transaction-specific details.