---
title: "Conformist"
date: 2024-02-29T14:28:37-00:00
draft: false
pattern_types: ["behavioral", "integration"]
wikipedia: ""
diagramtype: "class"
diagram: "[Client] --|> [Conformist] : uses\n[Conformist] --|> [Interface] : implements\n[Interface] <|-- [Service A]\n[Interface] <|-- [Service B]\n[Interface] <|-- [Service C]"
code: true
---

The Conformist pattern focuses on integrating with a pre-existing system or interface, even if that interface is poorly designed or doesn't fully meet the needs of the integrating component. It prioritizes compatibility and “fitting in” over ideal design principles, often acting as a wrapper or translator to enable interaction with legacy or external services. The core idea is to minimize friction during integration, sometimes at the cost of code clarity or extensibility.

This pattern is particularly useful when dealing with third-party APIs that cannot be changed, integrating with older systems where refactoring is impractical, or adopting a "least surprise" approach in environments with strong conventions. It allows a new component to function within an existing ecosystem without demanding changes to that ecosystem.  Essentially, the conformist yields to the existing structure.

## Usage

The Conformist is commonly used in:

*   **Third-party API Integrations:** When interacting with external services with fixed APIs that don’t align with internal standards. The Conformist adapts to the API, rather than trying to force the API to adapt.
*   **Legacy System Wrappers:**  Bridging new code with older, often poorly documented, systems that are too risky or expensive to replace.
*   **Plugin Architectures:** Allowing external plugins to conform to a defined interface for a host application, even if the plugin's internal structure is different.
*   **Event-Driven Systems:** Adapting event formats coming from various sources into a common format that internal components can understand.

## Examples

1.  **Twitter API Client Libraries:** Many Twitter API client libraries for different languages employ the Conformist pattern. The Twitter API has its own specific data formats, authentication schemes, and rate limits.  Libraries like `Tweepy` (Python) or `twitter4j` (Java) conform to these requirements, handling the conversions and intricacies of the Twitter API so that developers can work with more familiar object models and interactions. They "conform" to the API's peculiarities.

2.  **Passport.js (Node.js Authentication Middleware):** Passport.js is a popular authentication middleware for Node.js. It supports numerous authentication strategies (Facebook, Google, Twitter, local username/password, etc.). Each authentication strategy must conform to a specific Passport interface. Different providers have wildly different authentication flows and data formats.  Passport.js uses "strategies" that act as Conformists, adapting each provider’s unique authentication process to fit the Passport framework.  The strategy conforms to Passport's requirements, rather than the other way around.