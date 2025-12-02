
---
title: Aggregator
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "integration"]
wikipedia: "https://en.wikipedia.org/wiki/Aggregator_pattern"
diagramtype: "class"
diagram: "[Client] -- \"uses\" --> [Aggregator]
[Aggregator] -- \"delegates to\" --> [Subsystem 1]
[Aggregator] -- \"delegates to\" --> [Subsystem 2]
[Aggregator] -- \"delegates to\" --> [Subsystem N]
[Subsystem 1] ..> [Data Source 1]
[Subsystem 2] ..> [Data Source 2]
[Subsystem N] ..> [Data Source N]"
code: true
---

The Aggregator pattern provides a unified interface to a number of disparate subsystems. Instead of a client having to interact with each subsystem directly, it interacts with the aggregator, which then dispatches requests to the appropriate subsystems. The aggregator then combines the results from these subsystems into a single, coherent response for the client.

This pattern is particularly useful when integrating multiple services with differing APIs or when a client requires a consolidated view of data from various sources. It simplifies client code and promotes loose coupling between the client and the underlying subsystems, allowing for independent evolution of each. It's a core principle in microservice architectures for presenting a single facade.

## Usage

The Aggregator pattern is used in situations where:

*   **Multiple Data Sources:** The application needs to gather data from different sources and present it as a single result.
*   **API Simplification:** Different services provide different APIs, and a simplified, unified view is needed.
*   **Microservices Integration:**  A single endpoint needs to orchestrate calls to multiple microservices.
*   **Performance Optimization:** Aggregating data can reduce the number of network calls required to fulfill a client request.
*   **Reporting and Analytics:** Consolidating data from various systems to generate reports or perform analytics.

## Examples

*   **News Aggregators (Google News, Apple News):** These applications collect articles from numerous news websites and present them in a single feed. The aggregator component handles fetching, parsing, and displaying content from diverse sources, shielding the user from the complexity of interacting with each site individually.
*   **Financial Dashboards (Yahoo Finance, Bloomberg):** These dashboards pull stock prices, news, and financial data from multiple exchanges, news providers, and data vendors. The aggregator combines these disparate data streams, providing a single, cohesive view of a user's portfolio and market information.
*   **Shopify's Order API:** While Shopify's backend is complex, their Order API serves as an aggregator. It retrieves data relating to an order across multiple microservices (payment, shipping, inventory) and presents a unified order resource, simplifying the integration for partner apps.
*   **Netflix's Recommendation Engine:** The recommendations you see on Netflix aren’t sourced from a single algorithm. Different recommendation algorithms (based on viewing history, genre preferences, etc.) operate as individual subsystems. An aggregator combines their results, ranks them, and presents the final list to you.
