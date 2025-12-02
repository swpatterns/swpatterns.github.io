
---
title: Clean Architecture
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["architectural", "design principles", "DDD"]
wikipedia: https://en.wikipedia.org/wiki/Clean_Architecture
diagramtype: "component"
diagram: "[Entities] -- Uses --> [Use Cases]\n[Use Cases] -- Uses --> [Interface Adapters]\n[Interface Adapters] -- Uses --> [Frameworks & Drivers]\n[Frameworks & Drivers] -- Calls --> [UI, DB, Web Server, etc.]\n\n[note: Entities: Core business rules {bg:lightgreen}]\n[note: Use Cases: Application-specific business rules {bg:lightgreen}]\n[note: Interface Adapters: Adapts data for use cases and entities {bg:lightgreen}]\n[note: Frameworks & Drivers: Details like UI, DB, etc. {bg:lightgreen}]"
code: true
---

Clean Architecture is a software design philosophy that emphasizes separation of concerns to achieve high modularity, testability, and maintainability. It proposes structuring an application into concentric layers, with core business logic residing in the innermost layers and external concerns like databases, UI frameworks, and external APIs residing in the outermost layers. Dependencies point inwards, meaning inner layers have no knowledge of outer layers, promoting independence from technology changes and simplifying testing.

The primary goal of Clean Architecture is to create systems that are independent of frameworks, databases, UI, and any external agency. This independence allows for easier adaptation to changing requirements, improved testability (as business logic can be tested in isolation), and increased flexibility in choosing and swapping out technologies without impacting the core application. It achieves this through a strict dependency rule: source code dependencies can only point inwards.

## Usage

Clean Architecture is commonly used in:

*   **Large, complex applications:** Where maintainability and adaptability are crucial over the long term.
*   **Applications with evolving requirements:**  The decoupled nature allows for changes in one area without cascading effects.
*   **Systems requiring high testability:**  Inner layers can be tested easily without reliance on external dependencies.
*   **Microservices architecture:**  Each microservice can be built on Clean Architecture principles for better isolation and independence.
*   **Mobile Applications:** When needing to support multiple platforms (iOS, Android) with shared core logic.

## Examples

*   **Hexagonal Architecture (Ports and Adapters):** Often considered a specific implementation of Clean Architecture, Hexagonal Architecture, used in many Java and .NET projects, explicitly defines ports (interfaces) that core logic interacts with, and adapters that connect those ports to external systems. Spring Framework often encourages this pattern through its dependency injection capabilities.
*   **Onion Architecture:** Similar to Clean Architecture, Onion Architecture focuses on placing the core domain logic at the center and building layers of infrastructure around it.  ASP.NET Core projects frequently adopt this structure, separating concerns into domain models, application services, and infrastructure layers.
*   **SwiftUI and Combine (Apple Ecosystem):** Apple's SwiftUI and Combine frameworks, while not explicitly enforcing Clean Architecture, lend themselves well to it.  The MVVM (Model-View-ViewModel) pattern, often used with these frameworks, can be implemented within the Clean Architecture layers, with the ViewModel residing in the Use Cases layer and the Model representing Entities.
*   **Flask/Django with Core Logic Separation (Python Web Frameworks):** Python web frameworks like Flask and Django can be structured to follow Clean Architecture principles. The core business logic is placed in separate modules, independent of the web framework's specifics, allowing for easier testing and potential migration to other frameworks.
