---
title: Fallback
date: 2024-01-29T16:52:13-00:00
draft: false
pattern_types: ["behavioral", "resilience"]
wikipedia: ""
diagramtype: "sequence"
diagram: mermaid
sequenceDiagram
    participant Client
    participant PrimaryService
    participant SecondaryService
    Client->>PrimaryService: Request Service
    alt PrimaryService Fails
        PrimaryService--xSecondaryService: Request Service
        SecondaryService-->>PrimaryService: Service Response
        PrimaryService-->>Client: Service Response (from fallback)
    else PrimaryService Succeeds
        PrimaryService-->>Client: Service Response
    end

code: true
---

The Fallback pattern provides a secondary mechanism to fulfill a request when the primary attempt fails. It's a key component in building resilient systems, ensuring continued operation even in the face of partial failures. This pattern doesn't actively *prevent* failure, but gracefully handles it by switching to an alternative, potentially less feature-rich, but still functional solution.

## Usage

The Fallback pattern is frequently used in microservice architectures to handle service outages.  If one service is unavailable, a fallback mechanism can route requests to a different service capable of providing a similar, albeit potentially limited, response. It also appears in network programming, where alternate routes or data sources are used when a connection fails, and in user interface development, to show default content when dynamic content fails to load.  Caching strategies often employ fallbacks to provide stale but accessible data during cache misses or failures.

## Examples

1. **Hystrix (Netflix):** Netflix's Hystrix library heavily utilizes the Fallback pattern (via Command pattern integration). When a service call wrapped in a Hystrix command times out or throws an exception, Hystrix automatically invokes a pre-defined fallback method. This method could return cached data, a default response, or simply log the error while preventing cascading failures.

2. **GraphQL with DataLoader:** DataLoader (used with GraphQL) fetches potentially resource-intensive data. If a cache lookup fails, DataLoader can have a fallback strategy, such as querying a database directly.  If the database is also unavailable, DataLoader can be configured to return default values or throw a more graceful error than an unhandled database exception.