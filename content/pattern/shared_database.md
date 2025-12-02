
---
title: Shared Database
date: 2024-01-27T14:56:42-00:00
draft: false
pattern_types: ["behavioral", "architectural"]
wikipedia: ""
diagramtype: "class"
diagram: "[Client1] -- Database\n[Client2] -- Database\n[Client3] -- Database\n[Database] [note: Single Instance {bg:lightblue}]"
code: true
---

The Shared Database pattern describes a situation where multiple clients or applications access the same underlying database. This allows for data consistency and simplifies data sharing between different parts of a system. The primary benefit is avoiding data duplication and potential synchronization issues when many components need to work with identical data. However, it introduces tight coupling and can create contention issues if not properly managed.

This pattern is common in microservice architectures where a need for strong consistency exists for certain core data elements. It’s also frequently found in monolithic applications where various modules interact with a central data store, and in legacy systems where data was never intentionally partitioned.  It's useful when scaling reads is cheaper than duplicating data and maintaining consistency, but must be carefully considered due to the potential for performance bottlenecks and database schema conflicts.

## Usage

*   **Microservices with Shared Domain Data:** When multiple microservices need to operate on the same core entities (e.g., customer profiles, product catalogs), a shared database can provide a consistent view of the data without the complexity of distributed transactions.
*   **Reporting and Analytics:** Applications often share a database with reporting tools to allow for real-time data analysis and generation of key performance indicators (KPIs).
*   **Legacy System Integration:** Integrating new applications with existing, monolithic systems frequently involves accessing the legacy database directly.
*   **Multi-Tier Applications:** Classic multi-tier architectures, where presentation, business logic, and data access layers all share the same database.

## Examples

*   **Content Management Systems (CMS):** Many CMS platforms like WordPress or Drupal utilize a shared database.  The web application front-end, plugins, and themes all directly query and modify the same database tables for content, users, and settings.  Conflicts regarding plugin access or database schema additions are common challenges when using this pattern in CMSS.
*   **E-commerce Platforms:** In an e-commerce environment, various services – order management, payment processing, inventory, and customer accounts – may all access a centralized product database. This ensures consistent product information across the entire platform.  While efficient for information consistency, high transaction volumes need to be carefully managed to avoid lock contention on shared records.
*   **Monitoring Systems:** A monitoring system may have multiple agents collecting data, all writing to the same time-series database for centralized storage and visualization.  InfluxDB and Prometheus are commonly used in this way.
*   **Financial Transaction Systems:** Core banking systems and similar financial platforms often rely on a shared database for accurate account balances and transaction history. Ensuring ACID properties is paramount in this case.
