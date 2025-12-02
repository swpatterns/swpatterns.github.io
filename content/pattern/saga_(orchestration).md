
---
title: Saga (Orchestration)
date: 2023-11-21T11:30:00Z
draft: false
pattern_types: ["distributed system", "behavioral", "integration"]
wikipedia: https://en.wikipedia.org/wiki/Saga_(pattern)
diagramtype: "class"
diagram: "[SagaOrchestrator] --o[Transaction1] : orchestrates\n[SagaOrchestrator] --o[Transaction2] : orchestrates\n[Transaction1] --x[Transaction2] : potentially compensates\n[Transaction2] --x[Transaction1] : potentially compensates\n[SagaOrchestrator] ..> [CompensatingTransaction1] : compensation\n[SagaOrchestrator] ..> [CompensatingTransaction2] : compensation\n[note: Orchestration-based Saga; orchestrator drives process]"
code: true
---

The Saga pattern manages a sequence of local transactions in a distributed system. It's used to ensure data consistency across multiple services, especially when traditional ACID transactions aren't feasible due to the nature of distributed environments.  Instead of a single, atomic transaction, the Saga breaks down the overall process into smaller, independent steps, each updating data within a single service.

The orchestration-based Saga relies on a central orchestrator service to coordinate the participating transactions. This orchestrator explicitly tells each service what to do and when, handling both successful completion and potential failures. If a transaction fails, the orchestrator triggers compensating transactions to undo the changes made by previous transactions, ultimately rolling back the entire Saga.

## Usage

The Saga pattern is commonly used in microservices architectures for managing complex, business-level processes that span multiple services. Specific scenarios include:

*   **E-commerce Order Management:** Handling order creation, payment processing, inventory updates, and shipping notifications.
*   **Travel Booking:** Coordinating flight, hotel, and car rental reservations.
*   **Financial Transactions:** Processing multi-step financial operations like loan applications or fund transfers.
*   **Distributed Data Modification:** Ensuring eventual consistency when updating data across a set of independently managed databases.

## Examples

1.  **Netflix:** Netflix uses the Saga pattern extensively for their video streaming operations.  When a user cancels a subscription, multiple actions need to occur—stopping billing, revoking access, and potentially handling refunds.  These are orchestrated as a Saga to ensure consistency. A failure in one step (e.g., the billing system being down) triggers compensating actions to revert any changes already made.

2.  **Apache Kafka Streams/Spring Cloud Stream (with state stores):**  Kafka Streams and Spring Cloud Stream can be used to implement Saga orchestration. Each microservice consumes from a Kafka topic representing a Saga event (like "OrderCreated", "PaymentFailed").  They react to events, perform their local transaction, and then emit another event indicating completion or failure. The Saga orchestrator (potentially another Kafka Streams application) monitors these events and drives the overall process, initiating compensation when needed. The state stores help track where each saga is in its execution.
