
---
title: Event Sourcing
date: 2023-10-27T10:30:00Z
draft: false
pattern_types: ["behavioral", "DDD", "persistence"]
wikipedia: https://en.wikipedia.org/wiki/Event_sourcing
diagramtype: "sequence"
diagram: "sequenceDiagram
    participant Client
    participant Command Handler
    participant Event Store
    participant Aggregate

    Client->>Command Handler: Send Command
    Command Handler->>Aggregate: Apply Command
    alt Command Valid
        Aggregate->>Aggregate: Create Event
        Aggregate-->>Command Handler: Return Event(s)
        Command Handler->>Event Store: Persist Event(s)
        Event Store-->>Command Handler: Event(s) persisted
    else Command Invalid
        Aggregate-->>Command Handler: Return Validation Error
    end
    Command Handler-->>Client: Command Result
    Client->>Event Store: Request State
    Event Store->>Event Store: Replay Events
    Event Store-->>Client: Aggregate State
    "
code: true
---

Event Sourcing is a pattern where the state of an application is determined not by directly storing the current state, but by storing a sequence of all the changes (events) that have occurred.  Instead of asking "what is the data *now*?" you ask "what happened *then*?" and rebuild the state from the events.  This provides a complete audit trail, facilitates debugging, allows for temporal queries, and enables replaying events to reconstruct past states or project new read models.

## Usage

Event Sourcing is commonly used in systems requiring a full audit history, such as financial applications, order management systems, and any domain where understanding *how* a state was reached is critical. It’s highly applicable in Domain-Driven Design (DDD) environments, especially for Bounded Contexts representing core business processes.  It’s also beneficial in scenarios needing eventual consistency and independence between read and write operations (CQRS).  Applications requiring point-in-time consistency or complex state reconstruction find it extremely valuable.

## Examples

*   **EventStoreDB:** A specialized database designed specifically for event sourcing. It efficiently stores, manages, and provides access to event streams. It’s optimized for append-only operations and provides mechanisms for event replay and projection.
*   **Kafka:** Often used as an event store, although not specifically built for event sourcing, Kafka’s durable, ordered log of events makes it a viable (and scalable) option. Applications can subscribe to these event streams to rebuild state or trigger downstream processes.
*   **Axon Framework:** A Java-based framework that provides tools and features for building event-driven applications using event sourcing and CQRS. It offers abstractions for event handling, state management, and event store integration.
*   **Rails Event Store:** A Ruby gem that provides a simple Event Store implementation for Rails applications, useful for adding event sourcing to existing or new projects.
