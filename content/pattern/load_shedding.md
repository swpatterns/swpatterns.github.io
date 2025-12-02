---
title: "Load Shedding"
date: 2024-02-29T18:35:12-00:00
draft: false
pattern_types: ["reliability", "resilience", "behavioral"]
wikipedia: ""
diagramtype: "sequence"
diagram: "participant User\nparticipant System\nparticipant CriticalService\nparticipant NonCriticalService\n\nUser->>System: Request\nactivate System\nSystem->>CriticalService: Check Capacity\nCriticalService-->>System: Capacity Available\nSystem->>CriticalService: Process Request\nactivate CriticalService\nCriticalService-->>System: Response\nSystem-->>User: Response\n\nUser->>System: Request\nactivate System\nSystem->>CriticalService: Check Capacity\nCriticalService-->>System: Capacity Exhausted\nSystem->>NonCriticalService: Attempt Process\nNonCriticalService-->>System: Rejected (Shedding Load)\nSystem-->>User: Service Unavailable / Delayed"
code: true
---

Load shedding is a mechanism for gracefully handling overload situations in a system. When demand exceeds available resources (CPU, memory, network, database connections, etc.), a load shedding strategy is employed to selectively reject or delay requests, preventing the system from complete failure. It prioritizes critical functionality over non-essential features, ensuring core services remain operational even under stress. Rather than crashing or becoming unresponsive, the system actively manages the load by temporarily sacrificing less important operations.

This pattern is crucial for building resilient systems that can withstand unexpected traffic spikes or resource constraints. Effective load shedding involves identifying critical and non-critical services, implementing thresholds for resource usage, and defining a clear policy for dropping or delaying requests. The goal is to maintain a reasonable level of service for the most important functions, even if it means temporarily degrading or denying access to others.

## Usage

Load shedding is used in a variety of scenarios, including:

*   **Sudden Traffic Spikes:** E-commerce websites during flash sales, online gaming platforms during popular events, or news sites during breaking news.
*   **Downstream Service Outages:** When a dependency becomes unavailable, preventing a cascading failure.
*   **Resource Exhaustion:** When CPU, memory, or database connections are at their limit.
*   **Preventing Denial-of-Service (DoS) Attacks:** Briefly rejecting requests to mitigate the impact of malicious traffic.
*   **Maintaining User Experience:** Prioritizing requests that impact user-facing responsiveness.

## Examples

1.  **Netflix:** Netflix employs sophisticated load shedding techniques to handle massive user traffic. When their systems are under heavy load, they might temporarily reduce the quality of video streams for some users, delay non-critical updates to their recommendation engine, or return a "try again later" message for less important features. This ensures that the core streaming functionality remains available to the majority of users.

2.  **AWS Auto Scaling Groups with Termination Policies:** AWS Auto Scaling Groups allow you to automatically adjust the number of EC2 instances based on demand. However, when scaling down (reducing instances) due to cost or reduced load, a *termination policy* determines which instances are removed. Common policies include `OldestLaunchTemplate`, `OldestInstance`, or `Default`.  These policies act as a form of load shedding; the service sheds load by removing less "important" (e.g., older) instances to maintain capacity for the most critical requests. The selection of which instance to terminate directly affects which load gets shed.

3.  **Redis Maxmemory Policy**: Redis allows you to configure a maximum memory usage (`maxmemory`). When Redis reaches this limit, it applies a configured *eviction policy* (e.g., `volatile-lru`, `allkeys-lru`, `random-approx-srcmapcount`). These policies determine which keys are removed to free up memory and prevent Redis from crashing. Removing keys is a form of load shedding, forfeiting access to invalidated data to maintain server availability.