
---
title: Domain Event
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["DDD", "behavioral"]
wikipedia: "https://en.wikipedia.org/wiki/Domain_event"
diagramtype: "class"
diagram: "[DomainEvent] --|> [Event]
[DomainEvent] {
  eventId : UUID
  occurredAt : DateTime
  data : Object
}
[Event] {
  +publish()
}
[DomainService] -- Calls --> [DomainEvent] : Raises
[AggregateRoot] -- Raises --> [DomainEvent] : When state changes"
code: true
---

The Domain Event pattern is a powerful technique in Domain-Driven Design (DDD) used to represent things that *have happened* within the domain.  Instead of objects directly calling methods on other objects, a Domain Event is raised when a significant state change occurs.  Interested parties (handlers) then subscribe to these events and react accordingly, promoting loose coupling and maintainability. This approach ensures that the core domain logic remains clean and focused on its responsibilities, avoiding direct dependencies on infrastructure or other domain parts.

This pattern excels in systems requiring audit trails, integration with external systems, or triggering side effects within the application. It decouples the "what happened" (the event) from the "how to react" (the handlers), which allows for flexibility and extensibility.  The pattern aids in building more observable and reactive systems, making it easier to understand the flow of operations and respond to key domain changes.

## Usage

*   **Auditing:** Tracking all meaningful state changes in a domain for regulatory compliance or debugging.
*   **Integration:** Notifying other services or applications about domain changes without tight coupling. For instance, notifying a notification service when an order is placed.
*   **Business Rules Enforcement:**  Implementing complex, cross-cutting business rules that span multiple aggregates.
*   **Read Model Updates:** Keeping denormalized read models synchronized with the domain's state.
*   **Workflow Automation:** Triggering automated processes based on specific events within the domain.

## Examples

1.  **Event Sourcing with Axon Framework (Java):** Axon Framework heavily relies on Domain Events.  Every change to an aggregate is represented as an Event, which is then stored in an Event Store.  Axon provides mechanisms to subscribe to these events and update read models or trigger other actions.  This is a core aspect of how Axon implements CQRS and Event Sourcing.

2.  **MassTransit (C#):** MassTransit is a .NET message bus that can be used to publish and subscribe to Domain Events. It’s a popular choice for implementing event-driven architectures within a .NET ecosystem.  When a domain event occurs, it’s published to the message bus, and any consumers interested in that event type handle it, allowing for asynchronous communication and decoupled services.

3. **Rails ActiveJob (Ruby):** Though not strictly “Domain Events” in DDD terminology, Rails' ActiveJob allows developers to defer work until later by queueing jobs. By creating jobs that correspond to key domain changes (e.g., `OrderCreatedJob`, `UserRegisteredJob`), you effectively implement a similar pattern of reacting to state changes without direct coupling.
