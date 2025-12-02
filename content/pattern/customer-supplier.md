
---
title: Customer-Supplier
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "collaboration"]
wikipedia: "https://en.wikipedia.org/wiki/Customer-Supplier_(pattern)"
diagramtype: "collaboration"
diagram: "[Customer] -- 'requests' --> [Supplier]\n[Supplier] -- 'provides' --> [Customer]\n[Customer] [note: Defines requirements]\n[Supplier] [note: Fulfills requirements]"
code: true
---

The Customer-Supplier pattern describes a relationship between two components where one component (the Customer) requests service from another component (the Supplier). The Supplier then fulfills those requests. This pattern focuses on collaboration and is often used to decouple components while maintaining a clear line of dependency and responsibility.  It's a simple, yet powerful, way to define interactions and improve modularity.

## Usage

This pattern is most effectively utilized when dividing a system into distinct parts with specific responsibilities. It helps avoid tight coupling and promotes reusability of the Supplier component.  Common use cases include:

*   **Microservices Architectures:** One service acting as a Customer, calling upon another service (the Supplier) to perform a specific task.
*   **Event-Driven Systems:** A component publishing an event (being the Customer requesting processing) consumed by another component (the Supplier processing the event).
*   **Plugin Systems:**  A core application (Customer) requesting functionality from plugins (Suppliers).
*   **GUI Frameworks:** A user interface (Customer) requesting data or actions from a data model or business logic layer (Supplier).

## Examples

1.  **REST APIs:** A web application (Customer) uses HTTP requests to obtain data or trigger actions from a RESTful API (Supplier). The application *requests* resources, and the API *supplies* those resources in a structured format like JSON.  For example, a mobile app asking a backend server "Give me the user's profile", the app is the customer, and the server is the supplier.
2.  **Database Access:** A business logic layer in an application (Customer) requests data from a database (Supplier) through a Data Access Object (DAO) or repository pattern. The business layer doesn’t directly interact with the database; instead, it relies on the DAO/Repository to *supply* the requested data. SQLAlchemy in Python exemplifies this, where a model acts as a customer requesting data through session objects (suppliers).