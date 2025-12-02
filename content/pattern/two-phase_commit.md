
---
title: Two-Phase Commit
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["distributed system", "concurrency", "reliability"]
wikipedia: https://en.wikipedia.org/wiki/Two-phase_commit
diagramtype: "sequence"
diagram: sequenceDiagram
    participant Coordinator
    participant Resource Manager 1
    participant Resource Manager 2
    participant Client
    Client->>Coordinator: Make request
    Coordinator->>Resource Manager 1: Prepare
    Coordinator->>Resource Manager 2: Prepare
    Resource Manager 1->>Coordinator: Vote Commit/Abort
    Resource Manager 2->>Coordinator: Vote Commit/Abort
    alt All vote Commit
        Coordinator->>Resource Manager 1: Commit
        Coordinator->>Resource Manager 2: Commit
        Resource Manager 1->>Coordinator: Acknowledge
        Resource Manager 2->>Coordinator: Acknowledge
        Coordinator->>Client: Success
    else Any votes Abort
        Coordinator->>Resource Manager 1: Rollback
        Coordinator->>Resource Manager 2: Rollback
        Resource Manager 1->>Coordinator: Acknowledge
        Resource Manager 2->>Coordinator: Acknowledge
        Coordinator->>Client: Failure
---

The Two-Phase Commit (2PC) protocol is a distributed algorithm used to ensure atomic commits across multiple transaction participants.  In essence, it guarantees that either *all* participants commit changes to the database or *none* do, maintaining data consistency in a distributed environment. This is crucially important when a single logical operation necessitates updates to multiple independent systems.

The process involves a coordinator and multiple resource managers.  The coordinator initiates the commit attempt, and the resource managers execute the tentative changes. The first phase (prepare) checks if all participants *can* commit. The second phase (commit or rollback) applies the changes if all voted to commit, or reverts them if any voted to abort.  While reliable, 2PC can introduce blocking and performance issues, making it less suitable for high-throughput or loosely-coupled systems.

## Usage

Two-Phase Commit is frequently employed in scenarios where transactional integrity is paramount across multiple data sources. Common use cases include:

*   **Distributed Databases:** Maintaining consistency when a transaction modifies data in several databases across a network.
*   **Microservices with Eventual Consistency Requirements:**  Though often avoided in favor of Sagas due to its blocking nature, 2PC can be used where strict consistency is needed between two interacting microservices.
*   **Message Queues and Transactions:** Ensuring that a message is both sent to a queue and a corresponding database update is completed atomically.
*   **XA Transactions:** A standard for distributed transaction processing, relying heavily on 2PC.

## Examples

*   **IBM CICS:** IBM’s Customer Information Control System (CICS) resource manager often utilizes 2PC to coordinate transactions that span multiple CICS regions and database systems. When a CICS transaction requires updates to both a local database and a remote CICS region’s database, 2PC ensures atomicity. CICS acts as both a coordinator and a participant.

*   **JTA (Java Transaction API):** This Java API provides a standardized way to manage transactions across multiple resources, like databases and message queues.  It frequently uses 2PC behind the scenes (through XA support) ensuring that all involved resources either commit or rollback the transaction together. Application servers like GlassFish or WildFly use JTA for transaction management using 2PC.

*   **Database Sharding:** When data is sharded across multiple database instances, 2PC can be applied to ensure that updates related to a single logical entity become visible consistently across all shards.  This is often implemented in custom sharding solutions.
