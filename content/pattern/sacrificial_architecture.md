
---
title: Sacrificial Architecture
date: 2024-02-29T14:37:52-00:00
draft: false
pattern_types: ["resilience", "scalability", "operations"]
wikipedia: ""
diagramtype: "sequence"
diagram: "sequenceDiagram
    participant User
    participant LoadBalancer
    participant CriticalService
    participant SacrificialService

    User->>LoadBalancer: Request
    LoadBalancer->>CriticalService: Request (Normal)
    alt Sacrificial Service overloaded
        LoadBalancer->>SacrificialService: Request
        SacrificialService->>LoadBalancer: 503 Service Unavailable
        LoadBalancer->>CriticalService: Request (Retried)
    else 
        LoadBalancer->>SacrificialService: Request
        SacrificialService->>LoadBalancer: 200 OK
    end
    CriticalService->>LoadBalancer: Response
    LoadBalancer->>User: Response
    "
code: true
---

Sacrificial Architecture is a resilience pattern where non-critical components are intentionally designed as single points of failure, allowing them to be quickly replaced or rebuilt in the event of an outage. The goal isn't to make these components *reliable*, but to make their *failure* cheap and fast, protecting the critical core systems. This approach prioritizes the availability of essential services by absorbing potentially damaging traffic or operations into expendable parts of the system.

This pattern is particularly useful in scenarios involving unpredictable or malicious traffic, such as denial-of-service (DoS) attacks or rapid feature deployments with uncertain load characteristics. By designating certain components as sacrificial, the system can isolate impact, shed load, and ensure the continued operation of other vital functions. Instead of scaling everything, scale the sacrificial components *just enough* to buy time and gather learning.

## Usage

* **DoS/DDoS Mitigation:**  Sacrificial layers can absorb large volumes of malicious traffic, preventing it from reaching core services. These layers are designed to be easily scaled up (and down) or replaced as needed.
* **Initial Feature Rollouts:** When launching a new feature, a sacrificial component can handle the initial surge of traffic, allowing observation and automated scaling/rollback of the feature's underlying services without impacting existing users.
* **Data Import/Processing:** A sacrificial worker process can be used to handle potentially problematic data imports. If the process fails due to the data, it's quickly restarted, ideally with data validation improvements, without bringing down the main application.
* **Spike Arrest:** A deliberately thin sacrificial service can be placed in front of resources to throttle sudden spikes in requests, giving backend systems time to respond.

## Examples

* **Cloudflare's DDoS Protection:** Cloudflare utilizes a tiered, sacrificial architecture for DDoS mitigation. Initial attack traffic is absorbed by their highly scalable edge network (the "sacrificial layer").  This network isn't designed to be inherently *resistant* to massive attacks, but is designed to be cheaply and rapidly scaled to absorb them, giving Cloudflare time to analyze the attack and implement more sophisticated mitigation strategies for their customers' core infrastructure.
* **AWS Shield Standard & Advanced:** AWS Shield provides DDoS protection.  Standard is a "best effort" defense. Advanced, which blends traffic scrubbing and sacrificial capacity, is designed to absorb and mitigate even large-scale attacks. The sacrificial component here is AWS’s capacity to redirect and handle the attack traffic away from the origin server.
* **Kafka Connect with Fault Tolerance:**  Kafka Connect workers can be seen as sacrificial in a highly available architecture. If a worker fails while processing data, the connector task is automatically reassigned to another worker. The first worker is "sacrificed" to maintain the data pipeline's overall continuity, whilst offering an opportunity to diagnose the root cause of the failure.
