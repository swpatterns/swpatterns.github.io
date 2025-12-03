
---
title: Parallel Change
date: 2024-02-29T14:35:00Z
draft: false
pattern_types: ["behavioral", "concurrency"]
wikipedia: ""
diagramtype: "sequence"
diagram: "sequenceDiagram
    participant Client
    participant SystemA
    participant SystemB
    participant ChangeRequest
    
    Client ->> SystemA: Initiates change
    Client ->> SystemB: Initiates change
    
    SystemA ->> ChangeRequest: Apply change locally
    SystemB ->> ChangeRequest: Apply change locally
    
    ChangeRequest --> SystemA: Local change applied
    ChangeRequest --> SystemB: Local change applied
    
    SystemA ->> SystemB: Communicate changes
    SystemB ->> SystemA: Confirm changes & resolve conflicts
    alt Conflicts Detected
        SystemA <-> SystemB: Conflict Resolution
    end
    
    SystemA ->> SystemA: Update internal state
    SystemB ->> SystemB: Update internal state
    
    SystemA --> Client: Change acknowledged
    SystemB --> Client: Change acknowledged
    "
code: true
---

The Parallel Change pattern addresses the challenge of maintaining data consistency across multiple, independent systems when changes need to be applied to all of them simultaneously.  Instead of a centralized orchestration, each system applies the change independently and then communicates with the others to reconcile differences and ensure overall consistency. This is particularly useful when systems are geographically distributed, have different update schedules, or are owned by different parties.

## Usage

This pattern is frequently used in distributed database systems, microservices architectures, and any scenario where independent components need to reflect the same data modifications.  Common applications involve updating user profiles across different services – for example, updating a user’s email address in both an authentication service, a marketing service, and a billing system. Another use case is propagating configuration changes to multiple servers or application instances without a single point of failure for the update process. It handles situations where complex transactions spanning multiple systems are impractical or undesirable.

## Examples

1. **DNS Propagation:** When a DNS record is updated, the change doesn’t immediately reflect for all users. Instead, DNS servers around the world update their caches independently, and changes propagate through a process of queries and TTL (Time To Live) expirations.  This is a form of parallel change management – each server converging to the same data independently. Conflicts, while rare, can occur when updates are rushed and necessitate more frequent refresh intervals.

2. **Git Version Control:**  Distributed version control systems like Git exemplify parallel change.  Each developer has a complete copy of the repository and can make changes locally. When these changes are shared (pushed/pulled), Git attempts to merge them. If conflicts arise (due to simultaneous modifications to the same lines of code), the developer must resolve them manually before the change is fully integrated. Git provides tools for conflict detection and resolution, mirroring the communication and reconciliation steps in the pattern.