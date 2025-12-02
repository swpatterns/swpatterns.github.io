---
title: Sharding
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["scalability", "architecture", "database"]
wikipedia: https://en.wikipedia.org/wiki/Database_sharding
diagramtype: "sequence"
diagram: mermaid
sequenceDiagram
    Client->>Load Balancer: Request data
    Load Balancer->>Shard 1: Route request based on shard key
    Shard 1-->>Load Balancer: Return data
    Load Balancer->>Client: Return data

    Client->>Load Balancer: Request data
    Load Balancer->>Shard 2: Route request based on shard key
    Shard 2-->>Load Balancer: Return data
    Load Balancer->>Client: Return data

code: true
---

Sharding is a database architecture pattern used to horizontally partition a dataset across multiple machines (shards). This is typically done when a single database instance can no longer handle the growing volume of data or the increasing number of read/write operations.  Each shard contains a subset of the total data and operates as an independent database. A sharding key is used to determine which shard a particular piece of data belongs to.

This pattern aims to improve performance, scalability, and availability of database systems. By distributing the load across multiple servers, sharding reduces the single point of contention and allows for parallel processing. It also enables easier scaling by adding more shards as needed.  However, sharding introduces complexity in data management, querying, and transaction handling.

## Usage

Sharding is commonly used in the following scenarios:

*   **Large Datasets:** When the data volume exceeds the capacity of a single database server.
*   **High Traffic:** When the number of concurrent users or requests overwhelms a single database instance.
*   **Geographical Distribution:** When data needs to be stored closer to users in different regions to reduce latency.
*   **Performance Bottlenecks:** When a specific database operation (e.g., reporting, analytics) is causing performance issues.
*   **Microservices Architectures:**  Each microservice can have its own sharded database.

## Examples

*   **MongoDB:** MongoDB offers built-in sharding capabilities. It uses a shard key to distribute data across multiple shards, and a config server to maintain metadata about the sharded cluster.  This allows MongoDB to scale horizontally to handle massive datasets and high throughput.
*   **CockroachDB:** CockroachDB is a distributed SQL database designed for scalability and resilience. It automatically shards data across multiple nodes, providing high availability and performance. Data is partitioned based on a range of keys, and the system handles data rebalancing and replication.
*   **Redis Cluster:** Redis Cluster provides a way to automatically shard Redis datasets. The cluster distributes data across multiple Redis nodes, and uses a hash slot to determine which node holds a particular key. This allows Redis to scale beyond the memory limits of a single machine.
*   **Apache Cassandra:** Cassandra is a NoSQL database that uses a distributed architecture with sharding as a core principle. Data is partitioned across nodes using a consistent hashing algorithm, ensuring even distribution and fault tolerance.