
---
title: Branch by Abstraction
date: 2024-02-29T16:32:00Z
draft: false
pattern_types: ["behavioral", "object-oriented"]
wikipedia: ""
diagramtype: "class"
diagram: "[Client] --|> [Abstraction]\n[Abstraction] <|-- [ConcreteA]\n[Abstraction] <|-- [ConcreteB]\n[ConcreteA] ..> [ServiceA]\n[ConcreteB] ..> [ServiceB]"
code: true
---

Branch by Abstraction decouples the logic that chooses which implementation to use from the implementations themselves. Instead of using conditional statements (if/else or switch) to select behavior based on type or configuration, it introduces an abstraction (interface or abstract class) and provides different concrete implementations. The client interacts with the abstraction, and the system uses the abstraction to determine which concrete implementation to instantiate and execute, often driven by configuration or environment variables. This allows you to change the behavior of the system at runtime without modifying the client code.

This pattern is particularly useful when you need to switch between different versions of an algorithm or service without causing disruptive changes to the codebase. It is favored in scenarios involving A/B testing, feature toggles, or compatibility with different systems that expect varying interfaces. By isolating the branching logic behind an abstraction, it becomes easier to add new behaviors and manage complexity as the system evolves.

## Usage

Branch by Abstraction is used frequently in:

* **Database Migrations:** Switching between different database schemas or accessing data through different ORM layers.
* **A/B Testing:** Rolling out new features to a subset of users based on configuration, presenting different UI elements.
* **API Versioning:**  Providing different API implementations based on the requested version,  while maintaining a single client-facing interface.
* **Platform Support:**  Adapting behavior to different operating systems or hardware platforms.

## Examples

1. **Retrofit (Android Networking Library):** Retrofit uses Branch by Abstraction with its `Converter` system.  You define an abstraction for converting JSON responses into data objects.  Different `Converter` implementations (e.g., GsonConverter, MoshiConverter) handle the actual conversion logic. The client specifies which converter to use through configuration, and Retrofit selects the appropriate implementation without the client needing to know about the different conversion mechanisms.

2. **Java's JDBC API:** The Java Database Connectivity (JDBC) API exemplifies Branch by Abstraction.  The `java.sql.Connection` interface represents the abstraction for connecting to a database.  Different database vendors (MySQL, PostgreSQL, Oracle) provide their specific `Driver` implementations. The application uses `DriverManager.getConnection()` with a database URL, and the JDBC driver responsible for that URL is loaded and utilized, effectively branching based on the provided connection details. The core application code doesn’t need to be aware of the intricacies of each database backend.
