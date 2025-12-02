---
title: "Master-Slave"
date: 2024-02-29T16:53:21-08:00
draft: false
pattern_types: ["behavioral", "concurrency"]
wikipedia: "https://en.wikipedia.org/wiki/Master-slave_(computing)"
diagramtype: "sequence"
diagram: "sequenceDiagram\n    participant Master\n    participant Slave1\n    participant Slave2\n    Master->>Slave1: Request Task\n    activate Slave1\n    Slave1-->>Master: Task Result\n    deactivate Slave1\n    Master->>Slave2: Request Task\n    activate Slave2\n    Slave2-->>Master: Task Result\n    deactivate Slave2"
code: true
---

The Master-Slave pattern is a concurrency model where one thread (the master) distributes work to multiple other threads (slaves). The master thread typically manages the tasks, assigns them to available slaves, and aggregates the results. Slaves operate independently, processing their assigned tasks without direct communication with each other, and reporting back to the master upon completion. This pattern is useful for parallelizing computationally intensive tasks and improving performance.

This pattern enhances scalability and responsiveness. By offloading tasks to slaves, the master thread remains free to handle other requests or manage the overall system. The slaves can run on separate cores or even separate machines, further increasing the processing capacity. However, the master becomes a single point of failure, and efficient task distribution is crucial to avoid resource contention and ensure optimal utilization of the slave threads.

## Usage

The Master-Slave pattern is widely used in scenarios that involve parallel processing and data distribution, including:

*   **Database Replication:** A primary database server (master) replicates its data to one or more read-only replica servers (slaves). Reads are often directed to the slaves to reduce load on the master.
*   **Distributed Computing:** Frameworks like Hadoop and Spark utilize a master-slave architecture to distribute data and computation across a cluster of machines.
*   **Image and Video Processing:** Dividing a large image or video into smaller chunks and processing them concurrently on multiple worker threads.
*   **Game Development:** Utilizing multiple threads to handle different aspects of the game world, such as AI, physics, and rendering.

## Examples

1.  **Apache Hadoop:** Hadoop utilizes a Master-Slave architecture. The `NameNode` is the master, managing the file system metadata and coordinating data processing. `DataNodes` are the slaves, storing the actual data blocks and performing computations as instructed by the `NameNode`.  Hadoop's MapReduce framework further leverages this pattern to distribute processing tasks.

2.  **Redis (Master-Replica Replication):**  Redis, a popular in-memory data store, supports master-slave (now more commonly referred to as master-replica) replication. The master node receives all write operations, and the replica nodes asynchronously replicate the data.  Reads can be distributed to the replicas to improve performance and availability.  If the master fails, one of the replicas can be promoted to become the new master.