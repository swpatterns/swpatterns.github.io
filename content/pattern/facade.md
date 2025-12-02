
---
title: Facade
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["creational", "structural"]
wikipedia: https://en.wikipedia.org/wiki/Facade_pattern
diagramtype: "class"
diagram: "[Client]--[Facade] \n[Facade]--[Subsystem1] \n[Facade]--[Subsystem2] \n[Facade]--[Subsystem3] \n [note: Subsystems may contain complex logic]"
code: true
---

The Facade pattern provides a simplified interface to a complex system of classes, objects, and subsystems. It abstracts away the intricacies of the underlying components, offering clients a higher-level, easier-to-use entry point.  Essentially, it’s an "entry point" object that encapsulates the interaction with multiple system parts.

This pattern is useful when you want to reduce complexity for clients, promote loose coupling, and offer a more intuitive way to interact with a system. It's commonly used in scenarios where a system has multiple dependencies or where the client only needs a limited set of features from a larger system.  It’s also valuable when migrating to a new subsystem, as the facade can provide compatibility with legacy code while the internal workings change.

## Usage

The Facade pattern is commonly found in:

*   **Complex Libraries/Frameworks:** Providing a simple API to interact with a large and intricate codebase.
*   **System Integration:**  Abstracting the interaction with different, potentially incompatible systems.
*   **Layered Architectures:** Acting as a gateway to a lower layer from a higher layer, shielding the higher layer from implementation details.
*   **Build Systems:** Managing complex compilation and linking processes with a simplified command.

## Examples

1.  **Apache Camel:** Camel uses facades extensively to provide simplified integration patterns for connecting different systems (e.g., databases, message queues, web services). Instead of directly interacting with the underlying transport mechanisms, you define routes using Camel’s DSL, and the facade handles the complexities of the underlying integrations. The `ProducerTemplate` and `ConsumerTemplate` classes provide facades for sending and receiving messages.

2.  **Java Database Connectivity (JDBC):** JDBC provides a facade over various database APIs. Developers interact with the database through the `Connection`, `Statement`, and `ResultSet` interfaces, without needing to know the specific details of how each database vendor implements these functionalities internally. The `DriverManager` class serves as a facade, simplifying the process of obtaining a database connection.

3. **Docker SDKs:**  Docker SDKs for languages like Python and Java offer a facade over the Docker Engine API. You don't need to learn the intricacies of the Docker Engine's CLI or REST API; instead, you use high-level functions provided by the SDK to manage containers, images, and networks.
