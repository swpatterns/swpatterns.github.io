
---
title: Partnership
date: 2024-02-29T17:30:00Z
draft: false
pattern_types: ["behavioral", "DDD"]
wikipedia: ""
diagramtype: "class"
diagram: "[Partner] --|> [PartnerInterface]\n[Partner] ..> [SharedState]\n[PartnerInterface]: +executeAction(input: Data)\n[SharedState]: -data: Data\n[SharedState]: +setData(data: Data)\n[SharedState]: +getData(): Data"
code: true
---

The Partnership pattern defines a relationship between two or more independent entities (Partners) who collaborate to achieve a common goal through a shared state.  Each Partner maintains its own autonomy but relies on the SharedState for synchronization and data exchange, effectively creating a bounded collaboration. This differs from simple composition or aggregation where one entity inherently “owns” or “has” the other.

## Usage

The Partnership pattern is useful in scenarios requiring distributed decision-making, resource management, or complex workflows where individual components need to react to changes originating from others, managed through a centralized, but openly accessible state. Common usages include collaborative editing applications, distributed task processing, and systems managing shared resources such as inventory or funds. It is crucial when maintaining loose coupling while ensuring coordinated behavior.

## Examples

1. **Git Branching and Merging:**  In Git, branches represent parallel lines of development (Partners). When a developer commits changes to a branch, the Git repository acts as the `SharedState`, holding the history. Merging brings these partners back together, resolving conflicts based on the current `SharedState` and creating a new state. Each branch operates independently until the merge process.

2. **Microservices with Event Sourcing:**  Multiple microservices (Partners) can operate independently, but need to react to events happening in other services.  A shared event store (e.g., Kafka, Redis Pub/Sub) acts as the `SharedState`, publishing events when the state changes. Each microservice subscribes to relevant events and updates its own internal state accordingly.  This allows for loose coupling and asynchronous communication between partners.

