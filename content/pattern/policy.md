---
title: Policy
date: 2024-02-29T16:10:00-00:00
draft: false
pattern_types: ["behavioral", "DDD"]
wikipedia: https://en.wikipedia.org/wiki/Policy_pattern
diagramtype: "class"
diagram: "[Client] -- 'needs to execute' --> [Policy]
    [Policy] <|-- [ConcretePolicyA]
    [Policy] <|-- [ConcretePolicyB]
    [ConcretePolicyA] ..> [Resource] : applies to
    [ConcretePolicyB] ..> [Resource] : applies to
    [Resource] -- 'uses' --> [Context]
    "
code: true
---

The Policy pattern encapsulates a set of business rules or logic into separate classes, allowing for greater flexibility and maintainability. It defines a family of algorithms (policies) and makes them interchangeable, enabling the selection of the appropriate algorithm at runtime based on context.  Rather than hardcoding the logic within a single class or method, the Policy pattern promotes loose coupling and easier modification of behavior without altering the core client code.

## Usage

The Policy pattern is commonly used in scenarios where business rules are complex and subject to change, or when different users or contexts require different behavior. Specific usage examples include:

*   **Access Control:** Determining whether a user has permission to perform a certain action based on their role and other factors.
*   **Pricing Rules:** Applying different pricing calculations depending on customer type, location, or purchase volume.
*   **Validation Logic:** Implementing varied validation rules based on input data source or user preferences.
*   **Workflow Management:** Executing different steps in a workflow based on the current state of the process.
*   **Gaming AI:** Modifying AI behavior (e.g., aggression level) based on game difficulty or player actions.

## Examples

1.  **Spring Security (Java):**  Spring Security utilizes policies to define access control rules.  `AccessDecisionManager` interfaces and `VoteBased` or `AffirmativeBased` access control strategies allow developers to define multiple `AccessDecisionVoter` implementations, each representing a specific policy (e.g., role-based, IP address-based).  These voters are then dynamically combined to determine access.

2.  **GraphQL Authorization (JavaScript/Node.js):**  Many GraphQL server libraries offer mechanisms for implementing authorization policies.  For instance, Apollo Server allows you to define resolver functions with rules that dictate which users can access specific fields or data. These rules can be implemented as separate policy classes or functions, promoting modularity and reusability.  A policy might check user roles, ownership of data, or other contextual information before granting access.

3.  **Kubernetes Admission Controllers:** Kubernetes uses admission controllers which can be implemented as policies to enforce specific constraints on resources before they are persisted. These policies can cover security, resource limits, and compliance requirements, ensuring that the cluster operates according to defined rules.