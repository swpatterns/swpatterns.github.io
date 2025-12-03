---
title: Service Locator
date: 2024-02-29T16:23:00-00:00
draft: false
pattern_types: ["behavioral", "loosely coupled"]
wikipedia: https://en.wikipedia.org/wiki/Service_locator
diagramtype: "class"
diagram: "[Client] -- 'requests service' --> [ServiceLocator]
    [ServiceLocator] -- 'holds/provides' --> [Service1]
    [ServiceLocator] -- 'holds/provides' --> [Service2]
    [Service] <|-- [Service1] : implements
    [Service] <|-- [Service2] : implements
    [note: The Client doesn't know about concrete services, only the Locator.] {bg:lightyellow}
    "
code: true
---

The Service Locator pattern provides a centralized registry for obtaining services. Instead of a component directly creating or finding its dependencies, it asks the Service Locator for them. This enhances decoupling by hiding the implementation details of the services from the clients that use them. The Locator is responsible for knowing where and how to get or create the services.

This pattern is useful in scenarios where you need to abstract the dependency resolution process, facilitate testing with mock services, or dynamically configure which services are available. It’s often employed in applications with a complex dependency graph and allows for easier maintenance and extension. However, overuse can lead to hidden dependencies and make understanding the flow of control more challenging.

## Usage

The Service Locator pattern is frequently used in:

*   **Large applications with many dependencies:** Simplifying module interactions and maintaining a clean architecture.
*   **Testing environments:**  Replacing real services with mock implementations to isolate units of code.
*   **Plug-in architectures:** Dynamically registering and retrieving service providers at runtime.
*   **Frameworks:** Providing a standardized way to access shared resources.

## Examples

1.  **Spring Framework (Java):** Spring’s `ApplicationContext` acts as a Service Locator. Components declare their dependencies as constructor parameters or setter methods, and Spring automatically resolves and injects those dependencies from its registry.  Developers can configure this registry via XML, annotations or Java code.

2.  **Angular Dependency Injection (TypeScript):** While Angular's DI is more sophisticated than a simple Service Locator, it shares core concepts. Components register their dependencies with the `Injector`, and Angular resolves and provides instances of those dependencies when the component needs them.  `@Injectable()` decorator marks a class as a provider and makes it available to the Injector.

3.  **Unity (C#):** A dependency injection container for .NET that can function as a Service Locator. You register types and their implementations with the Unity container, and then resolve instances using the `Resolve()` method. This allows components to request dependencies without knowing their concrete types or how they are created.