
---
title: Read Model
date: 2024-02-29T14:32:00Z
draft: false
pattern_types: ["CQRS", "behavioral", "data"]
wikipedia: ""
diagramtype: "class"
diagram: "[Client] -- Reads --> [Read Model]
[Read Model] -- Built From --> [Events]
[Events] -- Produced By --> [Write Model]
[Write Model] -- Updates --> [Database]"
code: true
---

The Read Model pattern addresses the performance challenges of querying complex domains by maintaining one or more specialized data stores optimized for specific read operations. Instead of directly querying the primary data store (often an event store or normalized database used by the write side), the read model denormalizes and reshapes data based on anticipated query needs.  These read models are updated asynchronously by subscribing to events emitted by the write side, ensuring eventual consistency.

## Usage

The Read Model pattern is particularly useful in systems employing Command Query Responsibility Segregation (CQRS). It's applied when read performance is a critical concern, and the complexity of querying the write database hinders responsiveness. Common scenarios include:

* **Reporting and Analytics:** Building specialized data stores optimized for generating reports and analyzing historical data without impacting the operational database.
* **User Interface Optimization:** Creating read models tailored to the data requirements of specific UI components, reducing the amount of data transferred and processed.
* **High-Volume Read Scenarios:**  When a system experiences significantly more read requests than write requests, a read model can dramatically improve scalability and responsiveness.
* **Evolving Read Requirements:**  Allows changes to read models without impacting the core write domain logic.

## Examples

* **Event Sourcing with Axon Framework:** Axon Framework uses event stores as its primary data source. To provide efficient querying, Axon promotes the use of read models that are projections of the event stream.  Event handlers subscribe to events and update the read model, which is typically a relational database or a NoSQL document store. This means reads are not querying the event store directly, but an optimized read-only view.

* **MediatR and CQRS in .NET:**  Many .NET applications leveraging MediatR for command/query handling employ CQRS principles. The Read Model pattern is implemented by creating separate query handlers that fetch data from dedicated read databases (e.g., a document database optimized for searching) rather than relying solely on the transactional database used for commands.  This is often coupled with event handlers updating these read databases as state changes occur.

