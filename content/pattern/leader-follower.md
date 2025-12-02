---
title: Leader-Follower
date: 2024-02-29T15:30:00Z
draft: false
pattern_types: ["behavioral", "concurrency"]
wikipedia: ""
diagramtype: "sequence"
diagram: mermaid
sequenceDiagram
    participant Leader
    participant Follower
    Leader->>Follower: Request State
    Follower-->>Leader: Current State
    alt State Change Needed
        Leader->>Follower: Command/Update
        Follower->>Follower: Apply Command
        Follower-->>Leader: Acknowledgment
    end
    
code: true
---

The Leader-Follower pattern is a concurrency pattern used to maintain data consistency across multiple nodes in a distributed system. One node is designated as the "leader" and is responsible for handling all write operations. Other nodes are "followers" that replicate the leader's data and handle read operations.  Followers synchronize their state with the leader to ensure they have the most up-to-date information. This minimizes conflicts and ensures a single source of truth for write operations.

## Usage

The Leader-Follower pattern is commonly used in scenarios where high availability and scalability are required, without the complexity of full distributed consensus. Key use cases include:

*   **Database Replication:** A primary database server (leader) handles writes, and read replicas (followers) serve read requests, distributing load and providing redundancy.
*   **Configuration Management:** A central configuration server (leader) manages application configurations, replicating them to other servers (followers) to ensure consistent behavior.
*   **Queue Systems:** A leader manages the order of messages in a queue, distributing them to followers for processing.
*   **Caching:**  Invalidating cache entries on the leader and propagating those invalidations to follower caches.



## Examples

1.  **etcd (Distributed Key-Value Store):** etcd employs a Raft-based consensus algorithm, which fundamentally relies on a leader-follower architecture. A leader is elected to handle write requests, which are then replicated to the followers. Clients typically interact with the leader, but can also read from followers for increased performance, though at a potential slight staleness.

2.  **Redis (with Replication):** Redis supports master-slave replication, a direct implementation of the leader-follower pattern. The master (leader) handles writes, and slaves (followers) replicate the data. Clients can read from slaves to offload the master and improve read performance.  The slaves will attempt to reconnect if the leader goes down - though failover isn't automatic without additional tooling (like Redis Sentinel).

3.  **DNS (Domain Name System):** In DNS, a primary name server acts as the leader, holding the master copy of the zone data. Secondary name servers are followers that periodically transfer zone data from the leader, providing redundancy and distributing the load of resolving DNS queries.