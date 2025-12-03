---
title: Strangler Fig
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "refactoring", "legacy"]
wikipedia: https://en.wikipedia.org/wiki/Strangler_fig_application
diagramtype: "sequence"
diagram: "sequenceDiagram
    participant LegacyApplication
    participant NewApplication
    participant User

    User->>LegacyApplication: Request
    LegacyApplication-->>User: Response
    
    loop Strangling
        User->>NewApplication: Request
        NewApplication->>LegacyApplication: Delegate Request
        LegacyApplication-->>NewApplication: Response
        NewApplication-->>User: Response
    end
    
    User->>NewApplication: Request
    NewApplication->>NewApplication: Handle Request
    NewApplication-->>User: Response
    "
code: true
---

The Strangler Fig pattern is a refactoring technique used to incrementally migrate a legacy system to a new architecture. Instead of a risky “big bang” rewrite, the pattern advocates for gradually replacing functionality by building a new system around the old one. As the new system gains more responsibility, the old system is “strangled” – its functionality replaced and eventually removed – much like a strangler fig plant grows around and eventually replaces a host tree.

This pattern is particularly useful when dealing with large, complex legacy applications where a complete rewrite is impractical or too dangerous. It allows teams to deliver value iteratively, reducing risk and providing opportunities to learn and adapt throughout the migration process. The strangler fig ensures continuous operation and minimizes disruption to users, resulting in reduced downtime and business impact.

## Usage

The Strangler Fig pattern is commonly employed in these scenarios:

*   **Modernizing Monoliths:** Breaking down a large, monolithic application into microservices.
*   **Technology Stack Upgrades:** Migrating from an outdated technology stack to a more modern one, piece by piece.
*   **Replacing Legacy APIs:** Gradually replacing an old API with a new, improved one.
*   **Introducing New Features without Disruption:** Rolling out new features alongside the existing system, then eventually replacing the older implementation.
*   **Dealing with Code Ownership Issues**: When hesitant to change large parts of legacy code due to unknown effects or lack of clear ownership.

## Examples

*   **Netflix:** Netflix famously used the Strangler Fig pattern to migrate from a monolithic Ruby on Rails application to a microservices architecture built with Java and other technologies. They built new features as microservices, routing traffic through a proxy that gradually shifted requests from the monolith to the new services.

*   **Spotify:** Spotify adopted the Strangler Fig pattern for migrating its backend systems to a more scalable and resilient infrastructure. They identified core functionalities and progressively rebuilt them as independent services, eventually deprecating the corresponding code in the legacy system.  They used a "feature flagging" approach to control the routing of requests to either the old or new implementations.
